# Intake protocol: what happens to a returned file

| Field | Value |
|:---|:---|
| Designation | MPN-PACK-02-INTAKE |
| Applies to | Listening pack version 2, all three paths, any number of returns on each, all waves |
| Scope | Theory and internal research on synthetic material. Nothing here is a recording of anybody and no person is measured |

A response arrives as one plain text file, or as the same text pasted into the
body of a message. There is nothing else to collect. This is the whole of what
happens to it.

The three paths are three professions and not three seats. Any number of people
can answer on any path, the split between the three is whatever it turns out to
be, and a profession with no returns is a fact about the panel rather than a
gap to be filled. Returns arrive over weeks rather than in one batch, so every
rule below is written for an open-ended number of files arriving over time.

## 1. Where it is filed

```
05_DATA/04_responses/listening-v2/
    REGISTER.tsv            one line per response, appended, never rewritten
    wave-1/                 the returned files, verbatim
    wave-2/
    results/                everything s8_intake.py writes
```

In this working tree the same three live at `/home/claude/gen7/responses/wave-1`,
`/home/claude/gen7/responses/wave-2` and `/home/claude/gen7/results`.

If the response came as pasted text, save the message body to a file with the
same name and the same rules. A pasted response and a downloaded one are worth
the same.

**The returned file is never edited.** Not to fix a typo, not to tidy a label,
not to close a quote. If a returned file needs a human repair before it will
parse, the repair goes in a sibling file with the suffix `.fix.txt` and the
reason goes in the register. The original stays as it arrived.

## 2. What it is called

```
lp2-<wave>-<path>-<code>.txt

lp2-w1-composer-R03.txt
lp2-w1-therapist-R04.txt
lp2-w2-researcher-R11.txt
lp2-w2-therapist-R107.txt
```

- `wave` is `w1` or `w2`.
- `path` is `composer`, `therapist` or `researcher`, taken from the `who.path`
  line inside the file rather than from what was expected. It is a profession
  and not a seat, so any number of files carry the same one.
- `code` is `R` and a number, assigned in the order responses are received,
  never reused, and never reassigned. It is padded to two digits, `R01` to
  `R99`, and widens to three at `R100` and to four at `R1000`. Nothing already
  assigned is re-padded when the width changes, so `R07` and `R107` are both
  codes in the same series and neither is renumbered. Sort the register by the
  number rather than by the string.

The code is the only identifier that goes into the corpus. The join from a code
to a person exists in `TRACKING.md` and nowhere else. A respondent who asked to
be named is named in the write-up from the tracking sheet, not from the filename.

If a respondent sends a second file, it does not overwrite the first. It is
filed as `lp2-w1-composer-R03-2.txt`, the later one is the one scored, and the
earlier one is marked superseded in the register.

## 3. What is recorded about it

One tab-separated line appended to `REGISTER.tsv`:

| Column | What goes in it |
|:---|:---|
| `code` | R03 |
| `wave` | w1 |
| `path` | as declared in the file |
| `received` | date the file arrived, ISO |
| `filename` | as filed |
| `sha256` | of the file as it arrived, before anything else is done to it |
| `build` | sha256 of `MANIFEST.json` as it stood when the link was sent |
| `wording` | sha256 of `listening-pack.html` as it stood when the link was sent |
| `status` | `complete`, `partial`, `superseded` or `unusable` |
| `credit` | the respondent's own answer to the credit question |
| `results_wanted` | yes or no, from whether they left a return address |
| `note` | free text, including the reason for any `.fix.txt` |

`build` and `wording` are taken from the tracking sheet row for that respondent,
because the returned file does not carry them. Record them at the moment the
link is sent, with:

```
sha256sum 05_DATA/03_generators/stimuli/MANIFEST.json
sha256sum <the published pack html>
```

`MANIFEST.json` holds a SHA-256 for every stimulus file, so a change to any
audio file changes the manifest hash. That is what makes the pooling rule in
section 6 mechanical rather than a matter of memory.

## 4. How it is checked for completeness

```
python3 /home/claude/gen7/s8_intake.py \
    --responses /home/claude/gen7/responses/wave-1 \
    --out /home/claude/gen7/results/wave-1
```

The script reads every response in the directory, joins each answer to
`ANSWER-KEY-v2.json`, writes one summary per respondent, and writes
`PANEL-SUMMARY.md` over the whole directory. Read the per-respondent summary
before filing the register line. It reports:

- which parts were attempted, and whether they match the declared path
- how many questions were answered and which were left unanswered
- internal contradictions, listed one per line
- the objective scores for parts B, C and D
- tallies, not scores, for part A and every free-text box
- the count of returns from each of the three professions in that run, stamped
  on every summary it writes

The panel summary reports every part per profession, with that profession's
count of returns beside it, because a result from two composers and a result
from twelve are different objects. Part A is the only part built to pool across
the professions, so it is reported pooled and per profession, which is what
lets the pooling be checked rather than assumed. Parts B, C and D are reported
per profession only, and the summary says why. A profession with no returns is
reported as having none rather than left out.

The counts are the counts in the directory the script was pointed at, so point
it at the directory you mean to report on. Running it over one wave reports
that wave; running it over both reports both, and whether both may be read
together is section 6.

A response is **complete** when every part on its declared path has at least one
answer and the close box has been reached. A response is **partial** when a part
on the path has no answers at all. A partial response is filed, registered and
scored exactly like a complete one. Every part it did answer counts. Most of the
value of the pack survives an abandoned part, and none of it survives a response
that was never filed.

Two boxes in part B and one in part D ask for pairs in free text. The script
takes the labels in the order they appear and groups them two at a time, and it
says so in the summary when a box does not resolve into clean pairs. When it
says that, read the box yourself and put what it says in the register note. Do
not edit the returned file.

An unanswered question is not a defect. The pack gives every question an honest
way to say it cannot be answered, and a respondent who used it told you
something. `cannot tell` is data. A blank is an absence.

## 5. What makes a response unusable

Unusable means not scored. It does not mean deleted. Every returned file is
filed and registered whatever its status, and the register says why.

A response is unusable if any of the following holds.

1. **The path cannot be established.** No `who.path` line and no way to tell from
   which parts are present which path was shown.
2. **Nothing was answered.** The file parses but carries no answer to any
   question in any part.
3. **The labels cannot be trusted.** The answers were transcribed by hand, or
   reordered, or arrived with the item labels renamed, so that an answer cannot
   be matched with certainty to the item it was about.
4. **The respondent was told what the items were before answering.** If it
   emerges that the scale names, the predictions, or an earlier panel's answers
   reached them first, the response is unusable for every part that knowledge
   touches, and the register says which.
5. **Earlier parts were revised after later ones were heard**, and the respondent
   says so. The revised part is unusable. The rest of the response stands.
6. **The response was made against a different stimulus build.** See section 6.
   This does not make it unusable in itself, but it does bar it from pooling, and
   if the change touched the items in a part then that part is unusable against
   the older wave.

Not unusable: an abandoned part, an unranked ranking, blank free text, a refused
question, a respondent who answered `cannot tell` throughout a part, or a
response that contradicts the theory. None of those are failures and none of them
are a reason to go back and ask again.

## 6. Pooling wave 1 and wave 2

**Wave 1 and wave 2 pool only if the wording changed between them. They do not
pool if any stimulus changed.**

Mechanically, compare the `build` and `wording` hashes recorded in the register.

| Between the two waves | Then |
|:---|:---|
| `build` identical, `wording` identical | Pool. The waves are one panel. |
| `build` identical, `wording` differs | Pool. Record the wording change in the write-up, including which parts it touched. |
| `build` differs | Do not pool. Report the two waves separately, with the reason. |

A wave is a build, not a batch and not a date. Wave 2 stays open for as long as
returns keep arriving against that build, so it has no size and no closing
moment, and it can end up many times the size of wave 1 or smaller than it. A
file joins the wave whose build and wording it was answered against, whatever
day it arrives. Nothing about the wave rule depends on how many files are in a
wave or on the two waves being comparable in size.

A `build` difference means any of: an audio file changed, an audio file was
added or removed, a scale or profile or distance in the manifest changed, or the
generator was re-run and produced a different byte for any file. The generator
draws no random numbers, so a build difference is always a deliberate change and
there is always a record of what it was.

A change to `DISPLAY.json`, which carries the presentation order, is a build
change even if every audio file is byte-identical, because the labels no longer
mean what they meant. See section 7.

## 7. The fixed order, and why it is not negotiable

The presentation order is one permutation drawn once from seed 20260914 and it
is the same for every respondent. It is what makes two respondents comparable.
Respondent R03's `D5` and respondent R09's `D5` are the same item, so their
answers can be put side by side without any further assumption. That is the
whole of the comparability argument and there is nothing else holding it up.

It follows that:

- **Nobody gets a re-shuffled pack.** Not to control for order, not to test a
  hunch, not for one respondent who has seen it before.
- **If the order is ever changed, that is a new wave and it does not pool with
  anything before it.** Item-level answers from before the change and after it
  are not answers about the same items, and no amount of re-labelling afterwards
  recovers the comparison, because a respondent's answer to `D5` depends on what
  they heard before `D5`.
- **The key is what decodes the labels and it is never sent to a respondent.**
  `ANSWER-KEY-v2.json` stays in the corpus. A returned file is meaningless
  without it, which is why the file itself is safe to send back by ordinary
  email.
- **Part A's wording differs for therapists and nothing else does.** No stimulus
  differs between paths, so a therapist's part A answers and a composer's part A
  answers are directly comparable and are pooled. The pooled tally is never
  reported on its own. The per-profession tallies are printed beside it, because
  whether the two professions converge separately on different items is exactly
  what a pooled tally hides, and the pooling is an assumption about listeners
  rather than a fact about the stimuli.

## 8. The order of operations, start to finish

1. Save the returned file under its name in the wave directory. Do not open it in
   anything that rewrites line endings.
2. `sha256sum` it and keep the value.
3. Run `s8_intake.py` over the wave directory.
4. Read the per-respondent summary. Decide `complete`, `partial` or `unusable`.
5. Append the register line.
6. If the respondent left a return address, add them to the list that gets the
   results.
7. Re-run the script over the whole wave directory, not over the new file
   alone, so that the panel summary and the counts per profession are the
   counts as they now stand. See section 9.
8. Nothing else. There is no follow-up, no reminder and no second request.

## 9. A return that arrives after an analysis has been run

The panel is open, so this is the normal case rather than the awkward one. A
file can arrive after a summary has been written, after a number from it has
gone into a draft, and after a profession has been reported as having no
returns.

**Nothing already written is edited in place.** The returned file is filed and
registered exactly as section 1 to section 3 say, and then the script is run
again over the whole wave directory. The new output replaces the old one. What
the script writes is disposable and can be regenerated from the files and the
key at any time; the returned files and `REGISTER.tsv` are the things that are
kept.

**Every summary carries the counts it was written over.** That stamp is what
makes an old output readable months later: it says what the numbers were
counted over, and two runs with different counts are two different objects. A
number from one run and a number from another do not belong in the same
sentence unless both runs are named.

**A number in a draft belongs to a run.** Write down which run a quoted number
came from, and re-run before the draft goes anywhere. If the count for a
profession has changed, the number has changed with it.

**A profession reported as having no returns.** That was true of the run that
said it and stays true of that run. A later return does not make the earlier
output wrong; it makes it old. Redo the run and the new count stands.

A late return never changes an earlier respondent's answers, never licenses
going back to anybody, and is never a reason to re-open a part. If it was
answered against a different build it joins its own wave, which is section 6.

## 10. What a count of returns will carry

Counts are per profession, and every number is read against the count of the
profession it came from.

| Returns from one profession | What it will carry |
|:---|:---|
| none | nothing. Report the absence rather than a zero |
| one | an anecdote |
| three | a spread, not a rate |
| around ten | enough to settle a design parameter for that profession |

None of it is a citable perceptual claim at any size reached this way. The
panel is not sampled, not pre-registered and not powered, and a larger pile of
returns does not become one. The script prints this on every summary it writes
so that it does not have to be remembered.
