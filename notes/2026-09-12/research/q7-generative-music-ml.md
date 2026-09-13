# q7 — Conditioning a music generator on a structured numeric vector: citable foundations and realistic requirements

Research date: 2026-09-11. Method: 8 web searches, 6 page fetches (arXiv abstract + HTML pages, ISMIR PDF, GitHub README). Every number below was read on a fetched page unless explicitly flagged. "VERIFIED" = page fetched and content read; "VERIFIED-LISTING" = existence, title, venue and URL confirmed from a search-result listing but the content itself was not fetched; "UNVERIFIED" = cited from prior knowledge, not checked in this session.

Context for the treatise: the system under discussion currently drives MusicGen-small with text prompts and proposes LoRA + DPO + CLAP-reward training on a 57-dimensional psychometric vector projected to a 768-D conditioning embedding.

---

## Findings

### 1. MusicGen — Copet et al. 2023 (arXiv 2306.05284, NeurIPS 2023) — VERIFIED

Fetched: arXiv abstract page and the full HTML of v3 (v1 8 June 2023; v3 30 Jan 2024; abstract page states "Published at NeurIPS 2023").

**Architecture (as read on the v3 HTML):**
- Audio tokenizer: EnCodec at 32 kHz mono, stride 640 giving a 50 Hz frame rate, residual vector quantization with 4 codebooks of 2048 entries each.
- Generator: a single-stage autoregressive transformer decoder (causal self-attention, cross-attention to the conditioning, feed-forward blocks). No cascade of models, no separate semantic-token stage.
- Codebook interleaving: the "delay" pattern offsets the four codebook streams by one step each so all four can be predicted from one transformer pass; the paper compares this against "parallel" and "exact flattened" patterns.
- Text conditioning: three encoders were compared — T5, FLAN-T5, and CLAP (joint text-audio embeddings). The conditioning enters via cross-attention.
- Melody conditioning: "unsupervised" — a chromagram (window 2^14, hop 2^12) quantized by keeping only the dominant time-frequency bin per step, deliberately creating an information bottleneck ("prevents the model from recovering fine temporal details"). Conditions are dropped with probability 0.2 during training; classifier-free guidance scale 3.0 at inference.

**Model sizes:** 300M, 1.5B, 3.3B parameters (VERIFIED). The "MusicGen-small" used by the treatise's current system is the 300M model.

**Training data:** 20,000 hours of licensed music: an internal set of 10K tracks plus ShutterStock (25K tracks) and Pond5 (365K tracks), all with textual descriptions and metadata (genre, BPM, instrument tags) (VERIFIED).

**Evaluation protocol (VERIFIED):**
- Objective: Fréchet Audio Distance (FAD), KL divergence over an audio classifier's label distributions, and CLAP score (text-audio cosine alignment).
- Subjective: overall quality (OVL) and text relevance (REL) rated on a 1-100 scale by "at least 5 raters" per sample, filtered with the CrowdMOS package (raters who did not listen fully or who rated reference clips below 85 were removed); all samples loudness-normalised to -14 dB LUFS.
- Headline numbers for the 3.3B model on MusicCaps (no melody): FAD 3.8, KL 1.22, CLAP 0.31, OVL 84.81 ± 0.95, REL 82.47 ± 1.25.

**Relevance to numeric-vector conditioning:** MusicGen's conditioning path is an arbitrary sequence of embeddings passed through cross-attention. The chroma pathway is the paper's own demonstration that a *non-text, structured* signal can be injected — but note it was trained jointly with the 20k-hour corpus and deliberately bottlenecked. Nothing in the paper trains or evaluates a continuous low-dimensional control vector; a 57-D→768-D projection is therefore an extension, not a replication.

### 2. EnCodec, AudioLDM, AudioLDM 2

- **EnCodec** — Défossez, Copet, Synnaeve, Adi (2022), "High Fidelity Neural Audio Compression", arXiv 2210.13438 — UNVERIFIED (not fetched this session). The codec parameters that matter here (32 kHz, 50 Hz, 4×2048 RVQ) are VERIFIED from the MusicGen paper.
- **AudioLDM** — Liu et al. (2023), "AudioLDM: Text-to-Audio Generation with Latent Diffusion Models", ICML 2023, arXiv 2301.12503 — UNVERIFIED. Latent diffusion in a VAE/mel latent space with CLAP embeddings as the conditioning signal; a relevant alternative to token-LM generators because CLAP-space conditioning is by construction a continuous vector.
- **AudioLDM 2** — Liu et al. (2023), arXiv 2308.05734 — UNVERIFIED. Introduces a "language of audio" (AudioMAE-based) intermediate representation; Tango 2 (below) reports beating AudioLDM 2 (VERIFIED, see §4).

### 3. LoRA and evidence of LoRA fine-tuning of MusicGen

- **LoRA** — Hu et al. (2021), "LoRA: Low-Rank Adaptation of Large Language Models", arXiv 2106.09685, ICLR 2022 — UNVERIFIED (canonical; not fetched).
- **musicgen-dreamboothing** (ylacombe, GitHub) — VERIFIED. README: LoRA adapters on all five checkpoints (small 300M, medium 1.5B, large 3.3B, melody 1.5B, melody-large 3.3B); worked example fine-tunes on "ylacombe/tiny-punk", a **27-minute** dataset derived from the royalty-free PogChamp Music Classification Competition data; "under 15 minutes on an A100" at ~10 GB GPU memory (16 GB for melody-large); trained LoRA weights "~100MBs"; uses half-precision, gradient accumulation and gradient checkpointing. Caveats stated: clips must be <30 s and instrumental (lyrics degrade results); some checkpoints hit NaNs and guidance_scale should be set to 1.0; stereo untested. **No quantitative metrics (FAD/CLAP/MOS) are reported in the README** — it is a demonstration of feasibility, not an evaluated result.
- **Instruct-MusicGen** — arXiv 2405.18386 (VERIFIED-LISTING only). Instruction-tuning MusicGen for editing (add/remove/separate stems); shows MusicGen is adaptable with parameter-efficient methods, but details not read.
- **"Few-shot LoRA tuning for genre-specific music generation with semantic prompt matching"** — Complex & Intelligent Systems (Springer), DOI 10.1007/s40747-026-02285-5 (VERIFIED-LISTING only; content not read).
- **"Enhancing Diffusion-Based Music Generation Performance with LoRA"** — Applied Sciences 15(15):8646, MDPI 2025 (VERIFIED-LISTING only).
- **"Persian MusicGen"** — arXiv 2605.14765 (VERIFIED-LISTING only): a large-scale dataset and culturally adapted MusicGen; suggests full or partial fine-tuning of MusicGen on new corpora is an active practice.

Take-away: LoRA on MusicGen is well-established as *practice* (repos, several 2025-26 papers), with fine-tunes on tens of minutes to a few hours of audio. What the fetched sources do **not** provide is a controlled result showing that a LoRA fine-tune on tens of minutes of audio yields a *reliable, measurable* new conditioning axis. Any such claim in the treatise must be backed by its own evaluation.

### 4. DPO and its use in audio/music generation

- **DPO** — Rafailov et al. (2023), "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", arXiv 2305.18290, NeurIPS 2023 — UNVERIFIED (canonical; not fetched).
- **Diffusion-DPO** — Wallace et al. (2023/2024), "Diffusion Model Alignment Using Direct Preference Optimization", arXiv 2311.12908, CVPR 2024 — UNVERIFIED; referenced by name ("diffusion-DPO loss") on the fetched Tango 2 abstract page (VERIFIED that Tango 2 uses it).
- **MusicRL** — Cideron et al. (2024), "MusicRL: Aligning Music Generation to Human Preferences", arXiv 2402.04229, 6 Feb 2024 — VERIFIED. Base model: MusicLM (discrete audio tokens, autoregressive). Two reward models (text adherence, audio quality) built with selected raters; a **300,000-pairwise-preference** dataset collected from deployed users; sequence-level RLHF. Variants MusicRL-R (reward-model), MusicRL-U (user-preference RLHF), MusicRL-RU (both); MusicRL-RU best in human preference. Key finding quoted on the abstract page: text adherence and quality "only account for a part of" human musical preference — i.e. even 300k pairs leave much of preference unexplained. Venue not stated on the abstract page.
- **Tango 2** — Majumder et al. (2024), arXiv 2404.09956 — VERIFIED (abstract page; the fetch did not return authors/title fields, but the arXiv ID is the Tango 2 paper). Fine-tunes Tango with a diffusion-DPO loss on a synthetically constructed preference dataset (winner/loser audio for the same prompt, exploiting temporal ordering of concepts in prompts) and reports improvements over Tango and AudioLDM 2 on both automatic and manual metrics. The dataset name "Audio-alpaca" and its size were **not visible on the fetched page** — do not cite a pair count from this session.
- Practical implication: every published preference-optimisation result for audio uses either large human-preference sets (MusicRL: 300k pairs) or synthetic preference construction (Tango 2). A CLAP-scored synthetic preference pair is the cheapest analogue for the treatise's system, but see §5 for why CLAP-as-reward is weak on music quality.

### 5. CLAP as reward / evaluation signal and its limits

- **LAION-CLAP** — Wu et al. (2023), "Large-Scale Contrastive Language-Audio Pretraining with Feature Fusion and Keyword-to-Caption Augmentation", ICASSP 2023, arXiv 2211.06687 — UNVERIFIED (not fetched).
- **Microsoft CLAP** — Elizalde et al. (2022), "CLAP: Learning Audio Concepts from Natural Language Supervision", arXiv 2206.04769 — UNVERIFIED.
- CLAP score is the standard text-adherence metric in MusicGen (VERIFIED, §1); MusicGen also tested CLAP as a *conditioner* alongside T5/FLAN-T5 (VERIFIED).
- **Limits (VERIFIED-LISTING only; content not read):**
  - "Benchmarking Music Generation Models and Metrics via Human Preference Studies", ICASSP 2025 (ETH; OpenReview id 105yqGIpVW) — a study of how well automatic metrics including CLAP/FAD track human preference.
  - "Factual and Musical Evaluation Metrics for Music Language Models", arXiv 2511.05550 — proposes metrics beyond CLAP.
  - "SongBench: A Fine-Grained Multi-Aspect Benchmark for Song Quality Assessment", arXiv 2604.25937.
  - MusicRL's own conclusion (VERIFIED) that text adherence + quality explain only part of preference is the strongest fetched evidence against using a text-adherence score as a sole reward.
- Structural caveat for the treatise: CLAP measures alignment with a *text* prompt. A psychometric vector has no text; to use CLAP as reward one must verbalise the vector (losing the continuous structure) or train a new audio-vector alignment head — which is the very thing that needs data.

### 6. Symbolic (MIDI) generation and emotion conditioning

- **Music Transformer** — Huang et al. (2018), arXiv 1809.04281, ICLR 2019 — UNVERIFIED.
- **MuseNet** — OpenAI (2019), blog release, no peer-reviewed paper — UNVERIFIED.
- **Pop Music Transformer / REMI** — Huang & Yang (2020), ACM Multimedia 2020; official repo github.com/YatingMusic/remi — VERIFIED-LISTING (repo title confirms venue).
- **Multitrack Music Transformer** — Dong, Chen, Dubnov, McAuley, ICASSP 2023, arXiv 2207.06983 — VERIFIED-LISTING (arXiv page and project site salu133445.github.io/mmt listed).
- **EMOPIA** — Hung, Ching, Doh, Kim, Nam, Yang (2021), ISMIR 2021 — VERIFIED (ISMIR PDF fetched). 1,087 clips from 387 pop-piano songs, ~11 hours, avg 2.78 clips/song; labels in Russell's four valence-arousal quadrants (HVHA, HVLA, LVHA, LVLA); four annotators (the first four authors), each song handled by one annotator, 2.5-month campaign with cross-checks. Emotion-conditioned generation baseline: Compound Word Transformer with emotion tokens. Listening test: online survey, **25 participants**, each rating 12 random samples on humanness, richness and overall quality with 5-point Likert scales. Zenodo record 5624519 (VERIFIED-LISTING).
- **VGMIDI** — Ferreira & Whitehead (2019), ISMIR — the EMOPIA paper describes the prior emotion-conditioned work as using "a small dataset of video game MIDI tracks" of **95 samples** with manual valence annotations (VERIFIED via EMOPIA PDF; the VGMIDI paper itself UNVERIFIED).
- **PMEmo** — Zhang et al. (2018), ICMR — UNVERIFIED (audio + physiological (EDA) + continuous VA annotations; not a MIDI dataset).
- Summary: the entire emotion-conditioned symbolic literature works with hundreds to ~1,000 labelled clips and 4-quadrant (2-bit) emotion labels, evaluated by ~25-person Likert surveys. Nobody in the fetched literature conditions on a 57-D continuous psychometric vector; the highest-dimensional conditioning signals in this line are 2-D (valence, arousal) or 4 discrete classes.

### 7. Dataset sizes and evaluation protocols the literature treats as minimum

Evidence from fetched pages:
- Foundation scale: 20,000 h with text metadata (MusicGen, VERIFIED).
- Preference alignment scale: 300,000 human pairwise preferences (MusicRL, VERIFIED); Tango 2 uses a synthetic preference set (size not seen).
- Emotion-conditioned symbolic generation: ~11 h / 1,087 clips / 4 classes (EMOPIA, VERIFIED); earlier work 95 samples (VGMIDI, per EMOPIA).
- Feasibility-only LoRA: 27 min of audio, no metrics (musicgen-dreamboothing, VERIFIED).
- Human evaluation as practised: MusicGen — ≥5 raters/sample, 1-100 OVL and REL, CrowdMOS outlier filtering, loudness normalisation; EMOPIA — 25 participants × 12 samples, 5-point Likert; MusicRL — reward models trained with "selected raters" plus large-scale deployed preference collection.
- MUSHRA (ITU-R BS.1534) is the codec/quality standard; a 2025 Interspeech paper "Crowdsourcing MUSHRA Tests in the Age of Generative Speech Technologies" (VERIFIED-LISTING) treats crowdsourced MUSHRA for generative audio as a live methodological question. Note that MUSHRA presupposes a hidden reference, which a generative-from-vector system does not have; MOS/OVL-style absolute rating or pairwise preference is the appropriate form (this is an inference, not a fetched claim).
- What the fetched literature implies as a floor for a *credible conditioned-generation claim*: (i) an objective metric that is independent of the training signal (FAD or KL against a held-out reference set, not only CLAP if CLAP was the reward), (ii) a human study with tens of listeners and a fixed protocol (Likert/MOS or pairwise, with attention checks), (iii) a held-out condition set so that the model is shown to *generalise* the conditioning axis rather than memorise training clips, and (iv) a baseline (e.g. the unmodified MusicGen-small with a text prompt) run under the same protocol.

### 8. Sonification with generative models / physiology-driven and affective generative music

- **Williams, Kirke, Miranda, Roesch, Daly, Nasuto (2015), "Investigating affect in algorithmic composition systems"** — SAGE DOI 10.1177/0305735614543282 (VERIFIED-LISTING). **Correction for the treatise:** the SAGE DOI prefix 0305735… is *Psychology of Music*, not *Music Perception*; cite as Psychology of Music 43(6), 2015 (volume/issue UNVERIFIED). Repositories at Essex, Reading (CentAUR) and Plymouth host the accepted manuscript.
- **Williams et al. (2017), "Affective Calibration of Musical Feature Sets in an Emotionally Intelligent Music Composition System"**, ACM Transactions on Applied Perception, DOI 10.1145/3059005 — VERIFIED-LISTING. The direct precedent for calibrating musical features against a 2-D affect target.
- **Dash & Agres (2024), "AI-Based Affective Music Generation Systems: A Review of Methods and Challenges"**, ACM Computing Surveys, DOI 10.1145/3672554; arXiv 2301.06890 (v1 2023) — VERIFIED-LISTING. Note the ACM version is 2024, arXiv preprint is 2023; cite the DOI.
- **"Cyborg synchrony: integrating human physiology into affective generative music AI"**, Frontiers in Computer Science 2025, DOI 10.3389/fcomp.2025.1593905 — VERIFIED-LISTING. Closest fetched title to "adaptive generative music from physiological signals".
- **"Digital music interventions for stress with bio-sensing: a survey"**, Frontiers in Computer Science 2023, DOI 10.3389/fcomp.2023.1165355 — VERIFIED-LISTING.
- **"Development of a biofeedback system using harmonic musical intervals to control heart rate variability with a generative adversarial network"**, Biomedical Signal Processing and Control (Elsevier, S1746809421006923) — VERIFIED-LISTING.
- **"On the use of AI for Generation of Functional Music to Improve Mental Health"**, Frontiers in AI 2020, DOI 10.3389/frai.2020.497864 — VERIFIED-LISTING.
- **"Music generation based on emotional EEG"**, ACM DOI 10.1145/3529466.3529492 — VERIFIED-LISTING.
- **"Neural Musical Instruments through Brain-Computer Interface and Biofeedback"**, UMAP 2025 Adjunct, DOI 10.1145/3708319.3733644 — VERIFIED-LISTING.
- None of these was fetched; their methods and results cannot be quoted. They establish that "affect/physiology → generative music" is a named research area with a survey-level literature (Williams 2015; Dash & Agres 2024), which is what the treatise needs for positioning. No fetched source addresses conditioning on a high-dimensional *psychometric* (questionnaire-derived) vector as opposed to physiological or 2-D affect signals.

---

## What an engineering treatise can legitimately say

- MusicGen is a single-stage transformer over 4-codebook 50 Hz EnCodec tokens whose conditioning enters by cross-attention; the chroma pathway is published proof that a non-text structured signal can be injected, but it was trained jointly on 20k hours and deliberately bottlenecked. A 57-D→768-D projected vector is a *new* conditioning pathway that the base model has never seen; until trained, the treatise should describe it as a design proposal, not as a capability.
- LoRA fine-tuning of MusicGen (all sizes) on consumer GPUs with tens of minutes of audio is documented practice (musicgen-dreamboothing: 27 min, <15 min on an A100). What can be claimed from that: *feasibility of adaptation*. What cannot: that any specific fine-tune has learned a controllable axis — the README reports no metrics.
- Preference optimisation for audio has two published templates: RLHF/reward models with ~300k human pairwise preferences (MusicRL) or DPO on synthetically constructed pairs (Tango 2). A DPO plan for the psychometric system must say which template it follows and where the pairs come from; if the reward is CLAP, it must acknowledge that CLAP is a text-adherence score (MusicRL: text adherence + quality explain only part of preference) and that the psychometric vector has no native text.
- The emotion-conditioned generation literature's own scale — EMOPIA: 1,087 clips / ~11 h / 4 valence-arousal classes / 25-listener survey; VGMIDI: 95 clips — is the reference point for what "conditioned generation" has meant. Conditioning on 57 continuous dimensions is an order of magnitude beyond anything published; the treatise should state that the first credible milestone is 2-D (valence/arousal) or a handful of factor scores, evaluated as in EMOPIA.
- Minimum bar before writing "a trained psychometric→music model": (a) a labelled corpus at least at EMOPIA scale (order 10^3 clips / ~10 h) with vector labels obtained from a documented protocol; (b) a held-out set of *vectors*, not just clips; (c) an objective metric independent of the training signal (FAD/KL vs. reference, or a separately trained probe that recovers the vector from audio); (d) a listening study with at least ~25 listeners (EMOPIA) and ideally MusicGen-style ≥5 ratings per sample with CrowdMOS-style attention filtering, loudness-normalised stimuli, and a same-protocol baseline (unmodified MusicGen-small + text prompt); (e) confidence intervals reported as MusicGen does (e.g. 84.81 ± 0.95).
- Affective and physiology-driven generative music is an established field with surveys (Williams et al. 2015, *Psychology of Music* — not *Music Perception*; Dash & Agres 2024, ACM CSUR) and recent physiological-coupling work (Frontiers 2025). The treatise can position itself within it, but must distinguish questionnaire-derived psychometric state from the EEG/HRV/EDA signals that dominate that literature.
- Until the above data exist, the defensible description of the current system is "a rule-based mapping from a psychometric vector to a text prompt consumed by a pretrained MusicGen-small", and the LoRA/DPO/CLAP stack is a proposed training programme with an explicit data budget.

## Gaps

- MusicGen details are verified, but EnCodec, AudioLDM/2, LoRA, DPO, Diffusion-DPO, LAION-CLAP, MS-CLAP, Music Transformer, MuseNet, VGMIDI and PMEmo were **not fetched**; arXiv IDs given from memory need a one-click check before publication.
- Tango 2: the fetched abstract page did not expose the preference-dataset name or size; do not quote a pair count.
- No fetched paper reports LoRA fine-tuning of MusicGen *with metrics and dataset size*; the Springer "Few-shot LoRA tuning for genre-specific music generation" and MDPI "Enhancing Diffusion-Based Music Generation with LoRA" papers exist (listing-verified) and should be read for numbers.
- CLAP-limitation evidence is listing-level only (ICASSP 2025 benchmarking study; arXiv 2511.05550; SongBench); their quantitative findings on metric-human correlation were not read.
- No source found that conditions any generator on a vector of more than ~2-4 emotion dimensions; the 57-D claim has no literature precedent to lean on.
- MUSHRA vs MOS vs pairwise guidance for reference-free generative music: only a listing (Interspeech 2025 crowdsourced-MUSHRA paper); the inference that MUSHRA is inappropriate without a hidden reference is mine, not a fetched statement.
- Williams et al. 2015 venue: the question said *Music Perception*; the SAGE DOI indicates *Psychology of Music*. Volume/issue/pages not verified.

## Sources

- Copet, J., Kreuk, F., Gat, I., Remez, T., Kant, D., Synnaeve, G., Adi, Y., Défossez, A. (2023). Simple and Controllable Music Generation. NeurIPS 2023. arXiv:2306.05284 (v3, 30 Jan 2024). https://arxiv.org/abs/2306.05284 ; https://arxiv.org/html/2306.05284v3 — VERIFIED
- Cideron, G., Girgin, S., Verzetti, M., Vincent, D., Kastelic, M., Borsos, Z., McWilliams, B., Ungureanu, V., Bachem, O., Pietquin, O., Geist, M., Hussenot, L., Zeghidour, N., Agostinelli, A. (2024). MusicRL: Aligning Music Generation to Human Preferences. arXiv:2402.04229. https://arxiv.org/abs/2402.04229 — VERIFIED
- Majumder, N. et al. (2024). Tango 2: Aligning Diffusion-based Text-to-Audio Generations through Direct Preference Optimization. arXiv:2404.09956. https://arxiv.org/abs/2404.09956 — VERIFIED (abstract content; author list not displayed by the fetch)
- Hung, H.-T., Ching, J., Doh, S., Kim, N., Nam, J., Yang, Y.-H. (2021). EMOPIA: A Multi-Modal Pop Piano Dataset for Emotion Recognition and Emotion-based Music Generation. ISMIR 2021. https://archives.ismir.net/ismir2021/paper/000039.pdf ; Zenodo record 5624519 — VERIFIED
- ylacombe. musicgen-dreamboothing: Fine-tune your own MusicGen with LoRA. GitHub README. https://github.com/ylacombe/musicgen-dreamboothing — VERIFIED
- Dash, A., Agres, K. (2024). AI-Based Affective Music Generation Systems: A Review of Methods and Challenges. ACM Computing Surveys. DOI 10.1145/3672554; arXiv:2301.06890. https://dl.acm.org/doi/10.1145/3672554 — VERIFIED-LISTING
- Williams, D., Kirke, A., Miranda, E. R., Roesch, E., Daly, I., Nasuto, S. (2015). Investigating affect in algorithmic composition systems. Psychology of Music (SAGE). DOI 10.1177/0305735614543282. https://journals.sagepub.com/doi/10.1177/0305735614543282 — VERIFIED-LISTING (venue per DOI; the question's "Music Perception" appears incorrect)
- Williams, D. et al. (2017). Affective Calibration of Musical Feature Sets in an Emotionally Intelligent Music Composition System. ACM Transactions on Applied Perception. DOI 10.1145/3059005 — VERIFIED-LISTING
- Dong, H.-W., Chen, K., Dubnov, S., McAuley, J. (2023). Multitrack Music Transformer. ICASSP 2023. arXiv:2207.06983. https://arxiv.org/abs/2207.06983 ; https://salu133445.github.io/mmt/ — VERIFIED-LISTING
- Huang, Y.-S., Yang, Y.-H. (2020). Pop Music Transformer: Beat-based Modeling and Generation of Expressive Pop Piano Compositions. ACM Multimedia 2020. https://github.com/YatingMusic/remi — VERIFIED-LISTING
- Instruct-MusicGen: Unlocking Text-to-Music Editing for Music Language Models via Instruction Tuning. arXiv:2405.18386. https://arxiv.org/html/2405.18386v2 — VERIFIED-LISTING
- Few-shot LoRA tuning for genre-specific music generation with semantic prompt matching. Complex & Intelligent Systems. DOI 10.1007/s40747-026-02285-5 — VERIFIED-LISTING
- Enhancing Diffusion-Based Music Generation Performance with LoRA. Applied Sciences 15(15):8646 (MDPI, 2025). https://www.mdpi.com/2076-3417/15/15/8646 — VERIFIED-LISTING
- Persian MusicGen: A Large-Scale Dataset and Culturally-Aware Generative Model for Persian Music. arXiv:2605.14765 — VERIFIED-LISTING
- Benchmarking Music Generation Models and Metrics via Human Preference Studies. ICASSP 2025 (ETH Zürich). https://openreview.net/pdf?id=105yqGIpVW — VERIFIED-LISTING
- Factual and Musical Evaluation Metrics for Music Language Models. arXiv:2511.05550 — VERIFIED-LISTING
- SongBench: A Fine-Grained Multi-Aspect Benchmark for Song Quality Assessment. arXiv:2604.25937 — VERIFIED-LISTING
- Cyborg synchrony: integrating human physiology into affective generative music AI. Frontiers in Computer Science (2025). DOI 10.3389/fcomp.2025.1593905 — VERIFIED-LISTING
- Digital music interventions for stress with bio-sensing: a survey. Frontiers in Computer Science (2023). DOI 10.3389/fcomp.2023.1165355 — VERIFIED-LISTING
- On the use of AI for Generation of Functional Music to Improve Mental Health. Frontiers in Artificial Intelligence (2020). DOI 10.3389/frai.2020.497864 — VERIFIED-LISTING
- Development of a biofeedback system using harmonic musical intervals to control heart rate variability with a generative adversarial network. Biomedical Signal Processing and Control (Elsevier). https://www.sciencedirect.com/science/article/abs/pii/S1746809421006923 — VERIFIED-LISTING
- Music generation based on emotional EEG. ACM. DOI 10.1145/3529466.3529492 — VERIFIED-LISTING
- Neural Musical Instruments through Brain-Computer Interface and Biofeedback. UMAP 2025 Adjunct. DOI 10.1145/3708319.3733644 — VERIFIED-LISTING
- Lechler et al. (2025). Crowdsourcing MUSHRA Tests in the Age of Generative Speech Technologies. Interspeech 2025. https://www.isca-archive.org/interspeech_2025/lechler25_interspeech.pdf — VERIFIED-LISTING
- Défossez, A., Copet, J., Synnaeve, G., Adi, Y. (2022). High Fidelity Neural Audio Compression (EnCodec). arXiv:2210.13438 — UNVERIFIED
- Liu, H. et al. (2023). AudioLDM: Text-to-Audio Generation with Latent Diffusion Models. ICML 2023. arXiv:2301.12503 — UNVERIFIED
- Liu, H. et al. (2023). AudioLDM 2: Learning Holistic Audio Generation with Self-supervised Pretraining. arXiv:2308.05734 — UNVERIFIED
- Hu, E. J. et al. (2021). LoRA: Low-Rank Adaptation of Large Language Models. ICLR 2022. arXiv:2106.09685 — UNVERIFIED
- Rafailov, R. et al. (2023). Direct Preference Optimization: Your Language Model is Secretly a Reward Model. NeurIPS 2023. arXiv:2305.18290 — UNVERIFIED
- Wallace, B. et al. (2023). Diffusion Model Alignment Using Direct Preference Optimization. CVPR 2024. arXiv:2311.12908 — UNVERIFIED
- Wu, Y. et al. (2023). Large-Scale Contrastive Language-Audio Pretraining with Feature Fusion and Keyword-to-Caption Augmentation (LAION-CLAP). ICASSP 2023. arXiv:2211.06687 — UNVERIFIED
- Elizalde, B. et al. (2022). CLAP: Learning Audio Concepts from Natural Language Supervision. arXiv:2206.04769 — UNVERIFIED
- Huang, C.-Z. A. et al. (2018). Music Transformer. ICLR 2019. arXiv:1809.04281 — UNVERIFIED
- OpenAI (2019). MuseNet (blog release, no peer-reviewed paper) — UNVERIFIED
- Ferreira, L., Whitehead, J. (2019). Learning to Generate Music with Sentiment (VGMIDI). ISMIR 2019 — UNVERIFIED (its 95-sample size is VERIFIED via the EMOPIA paper's description)
- Zhang, K. et al. (2018). The PMEmo Dataset for Music Emotion Recognition. ICMR 2018 — UNVERIFIED
