#!/usr/bin/env python3
"""
Rebuild the clean source-text corpus from Project Gutenberg.

Twenty-five plays, one file each, correctly identified, with all Gutenberg front
matter, licence text, translator prefaces, editorial notes, footnote sections,
transcriber notes and publisher catalogues removed. What remains in each file is
the play: its cast list, its stage directions and its dialogue. Ten are extracted
from collected volumes because Gutenberg does not publish them separately.

The corpus is in three groups.

  lacan    the plays Lacan treated at length in the Seminars and the Autres
           ecrits, so far as they exist in public-domain English
  library  works already scored by the MPN application, retained so the new
           material can be compared against the existing frame library
  chosen   eight plays added for this programme, each tied to something the
           calculus has to be able to represent

This file exists because the corpus could not previously be trusted. Three of the
seven source texts originally in it were not the play they were named after, all
seven retained the complete Gutenberg licence, which the batch scoring script
then read as dramatic dialogue, and on a later pass Electra was silently carrying
the whole of The Trachinian Maidens appended to it. Every boundary below is
therefore stated as an explicit marker rather than inferred, and verify() checks
the result. See MANIFEST.md.

Reproduce: python3 fetch_clean_texts.py
"""
import hashlib
import json
import os
import re
import sys
import urllib.request

_HERE = os.path.dirname(os.path.abspath(__file__))
# The corpus lives in a directory called clean/. This script is kept both beside
# it and inside it, so resolve either way rather than building clean/clean.
OUT = _HERE if os.path.basename(_HERE) == "clean" else os.path.join(_HERE, "clean")
MIRRORS = (
    "https://www.gutenberg.org/files/{0}/{0}-0.txt",
    "https://www.gutenberg.org/ebooks/{0}.txt.utf-8",
    "https://www.gutenberg.org/cache/epub/{0}/pg{0}.txt",
)

# Gutenberg's own .txt.utf-8 for 35242 is mis-encoded at source: every curly
# quote arrives as the ASCII string "aEurooe". The -0.txt of the same book is
# clean, which is why the mirror order above is what it is. MOJIBAKE below is
# the check that keeps a bad copy out of the corpus.
MOJIBAKE = re.compile(r"aEuro|A1/4|A\(C\)")

# name -> dict(pg, start, end, group, note)
#
# start and end are (regex, occurrence). Occurrence indexes the matches of that
# regex over the lines of the stripped text, so 0 is the first, 1 the second,
# -1 the last. A heading appears in the table of contents as well as over the
# text it names, so the occurrence has to be stated rather than guessed. start
# is inclusive, end exclusive. None means the natural edge of the file.
WORKS = {
    # ---- the Lacan set -------------------------------------------------
    "hamlet": dict(
        pg=1524, start=None, end=None, group="lacan",
        note="Whole work. Seminar VI, Desire and its Interpretation, 1958-59"),
    "antigone": dict(
        pg=31, start=(r"^\s*DRAMATIS PERSONAE\s*$", 2), end=None, group="lacan",
        note="Extracted from The Oedipus Trilogy, F. Storr translation. "
             "Seminar VII, The Ethics of Psychoanalysis, 1959-60"),
    "oedipus_rex": dict(
        pg=31, start=(r"^\s*DRAMATIS PERSONAE\s*$", 0),
        end=(r"^\s*FOOTNOTES\s*$", 0), group="lacan",
        note="Extracted from The Oedipus Trilogy, F. Storr translation. "
             "Referred to throughout the Seminars"),
    "oedipus_at_colonus": dict(
        pg=31, start=(r"^\s*DRAMATIS PERSONAE\s*$", 1),
        end=(r"^\s*FOOTNOTES\s*$", 1), group="lacan",
        note="Extracted from The Oedipus Trilogy, F. Storr translation. "
             "Seminar VII, on the boundary between life and death"),
    "electra": dict(
        pg=14484, start=(r"^\s*ELECTRA\s*$", 2),
        end=(r"^\s*THE TRACHINIAN MAIDENS\s*$", 1), group="lacan",
        note="Extracted from The Seven Plays in English Verse, Lewis Campbell "
             "translation. Quoted in Seminar VII on Ate"),
    "awakening_of_spring": dict(
        pg=35242, start=(r"^\s*ACT I\s*$", 0),
        end=(r"^\s*FROM A LENGTHY ESSAY", 0), group="lacan",
        note="Whole play, Francis J. Ziegler translation. Preface a L'Eveil du "
             "printemps, 1 September 1974, in Autres ecrits p. 561"),
    # Claudel's Coufontaine trilogy, the subject of Seminar VIII, has no
    # public-domain English translation on Gutenberg. It is absent rather than
    # substituted.

    # ---- already in the frame library ----------------------------------
    "king_lear": dict(
        pg=1532, start=None, end=None, group="library",
        note="Whole work. Modernised spelling, matching the other three "
             "Shakespeare plays. PG 1128, the First Folio old-spelling text "
             "used previously, is not comparable with them"),
    "macbeth": dict(pg=1533, start=None, end=None, group="library",
                    note="Whole work"),
    "othello": dict(pg=1531, start=None, end=None, group="library",
                    note="Whole work"),
    "a_dolls_house": dict(pg=2542, start=None, end=None, group="library",
                          note="Whole work"),
    "hedda_gabler": dict(pg=4093, start=(r"^\s*HEDDA GABLER\.\s*$", 0),
        end=(r"^\s*FOOTNOTES\.\s*$", -1), group="library",
                         note="Whole work"),
    "the_seagull": dict(pg=1754, start=None, end=None, group="library",
                        note="Whole work"),
    "uncle_vanya": dict(pg=1756, start=None, end=None, group="library",
                        note="Whole work"),
    "medea": dict(
        pg=35451, start=None, end=(r"^\s*NOTES TO MEDEA\s*$", 0),
        group="library", note="Whole play, Gilbert Murray verse translation"),
    "importance_of_being_earnest": dict(
        pg=844, start=None, end=None, group="library", note="Whole work"),
    "the_cherry_orchard": dict(
        pg=7986, start=(r"^\s*THE CHERRY ORCHARD\s*$", 1),
        end=(r"^\s*Curtain\.\s*$", -1), group="library",
        note="Extracted from Plays by Chekhov, Second Series, Constance "
             "Garnett translation"),
    "miss_julie": dict(
        pg=14347, start=(r"^\s*MISS JULIA\s*$", 3),
        end=(r"^\s*THE STRONGER\s*$", 2), group="library",
        note="Extracted from Plays by August Strindberg, Second Series, Edwin "
             "Bjorkman translation. Titled Miss Julia in this translation"),

    # ---- chosen for this programme -------------------------------------
    "prometheus_bound": dict(
        pg=27458, start=(r"^\s*PERSONS REPRESENTED\.\s*$", 0),
        end=(r"^\s*THE SEVEN AGAINST THEBES\.\s*$", 0), group="chosen",
        note="Extracted from Prometheus Bound and The Seven Against Thebes, "
             "Theodore Alois Buckley translation. Chosen as the Real at its "
             "limit: a subject fixed in place, addressing what cannot answer"),
    "agamemnon": dict(
        pg=14417, start=(r"^\s*CHARACTERS IN THE PLAY\s*$", 0),
        end=(r"^\s*NOTES TO THE AGAMEMNON\s*$", 0), group="chosen",
        note="Whole play, Gilbert Murray translation, the same translator as "
             "Medea and The Bacchae. Chosen as the Symbolic at its limit: "
             "every character positioned by house, oath, rank and debt"),
    "the_bacchae": dict(
        pg=35173, start=(r"^\s*CHARACTERS IN THE PLAY\s*$", 0),
        end=(r"^\s*NOTES ON THE BACCHAE\s*$", 0), group="chosen",
        note="Whole play, Gilbert Murray translation. Chosen for entropy: a "
             "play whose action is the dissolution of a coherent subject"),
    "ghosts": dict(
        pg=2467, start=None, end=None, group="chosen",
        note="Whole work, R. Farquharson Sharp translation. Chosen for the "
             "trauma ratchet: inherited damage that never discharges"),
    "the_wild_duck": dict(
        pg=73631, start=(r"^\s*PERSONS OF THE PLAY\.\s*$", 0),
        end=(r"^\s*Transcriber.s Note\s*$", -1), group="chosen",
        note="Whole play, Eleanor Marx Aveling translation. Chosen for the "
             "Imaginary, and as a same-author control against Ghosts"),
    "the_stronger": dict(
        pg=14347, start=(r"^\s*THE STRONGER\s*$", 3),
        end=(r"^\s*CREDITORS\s*$", 2), group="chosen",
        note="Extracted from Plays by August Strindberg, Second Series, Edwin "
             "Bjorkman translation. Chosen as the dyadic test for B3: two "
             "characters, one of whom never speaks"),
    "philoctetes": dict(
        pg=14484, start=(r"^\s*PHILOCTETES\s*$", 2),
        end=(r"^\s*OEDIPUS AT COLONOS\s*$", 1), group="chosen",
        note="Extracted from The Seven Plays in English Verse, Lewis Campbell "
             "translation, the same volume and translator as Electra. Chosen "
             "for sustained physical pain as a state the calculus must carry, "
             "and as a translation control against Electra"),
    "everyman": dict(
        pg=19481, start=(r"^\s*EVERYMAN\s*$", -1),
        end=(r"^\s*THUS ENDETH THIS MORALL PLAY OF EVERYMAN\.\s*$", 0),
        group="chosen", inclusive_end=True,
        note="Extracted from Everyman, with Other Interludes. Chosen as the "
             "negative control: allegorical figures are not subjects, and a "
             "calculus of subjectivity should register that or be wrong"),
}

GROUP_ORDER = ("lacan", "library", "chosen")
GROUP_TITLE = {
    "lacan": "The Lacan set",
    "library": "Already in the frame library",
    "chosen": "Chosen for this programme",
}


CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".gutenberg-cache")


def fetch(pg_id):
    os.makedirs(CACHE, exist_ok=True)
    cached = os.path.join(CACHE, "{}.txt".format(pg_id))
    if os.path.exists(cached):
        return open(cached, encoding="utf-8").read()
    last = None
    for pattern in MIRRORS:
        url = pattern.format(pg_id)
        try:
            with urllib.request.urlopen(url, timeout=120) as r:
                if r.status != 200:
                    continue
                text = r.read().decode("utf-8-sig", errors="replace")
        except Exception as exc:  # network, 404, anything
            last = exc
            continue
        if MOJIBAKE.search(text):
            last = RuntimeError("mis-encoded at source: " + url)
            continue
        text = text.replace("\r\n", "\n")
        with open(cached, "w", encoding="utf-8") as f:
            f.write(text)
        return text
    raise RuntimeError("could not fetch a clean copy of PG {}: {}".format(pg_id, last))


def strip_boilerplate(t):
    s = re.search(r"\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*?\*\*\*", t, re.I | re.S)
    e = re.search(r"\*\*\*\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK.*?\*\*\*", t, re.I | re.S)
    t = t[(s.end() if s else 0):(e.start() if e else len(t))]
    t = re.sub(r"\n\s*End of (?:the )?(?:Project Gutenberg|The Project Gutenberg).*\Z", "\\n", t, flags=re.S | re.I)
    t = re.sub(r"</?pre[^>]*>", "", t)
    t = re.sub(r"^\s*(Produced by|Transcribed by|E-text prepared by|Credits:).*?(?=\n\s*\n)",
               "", t, flags=re.S | re.I | re.M)
    return t.strip() + "\n"


def locate(lines, spec, default, name, which):
    if spec is None:
        return default
    pattern, occurrence = spec
    hits = [i for i, l in enumerate(lines) if re.match(pattern, l)]
    if not hits:
        raise RuntimeError("{}: {} marker {!r} not found".format(name, which, pattern))
    try:
        return hits[occurrence]
    except IndexError:
        raise RuntimeError(
            "{}: {} marker {!r} matched {} times, occurrence {} requested".format(
                name, which, pattern, len(hits), occurrence))


def extract(name, spec, lines):
    a = locate(lines, spec.get("start"), 0, name, "start")
    b = locate(lines, spec.get("end"), len(lines), name, "end")
    if spec.get("inclusive_end"):
        b += 1
    if b <= a:
        raise RuntimeError("{}: end at line {} precedes start at line {}".format(name, b, a))
    body = lines[a:b]
    # Trailing printer's furniture: an asterisk rule, an illustration hook, a
    # stray rule of dashes. Not dialogue, and the scorer would read it as such.
    while body and re.match(r"^\s*(\[Illustration\]|[*\-_\s]*)$", body[-1]):
        body.pop()
    return "\n".join(body).strip() + "\n"


APPARATUS = re.compile(
    r"^[^a-z\n]{0,10}(NOTES? (?:TO|ON)\b|APPENDIX\b|BIBLIOGRAPH|GLOSSARY\b|"
    r"INTRODUCTION\b|PREFACE\b|TRANSCRIBER|FOOTNOTES\b|SOME PROPER NAMES\b|"
    r"Printed by |BOOKS BY )", re.M)
GUTENBERG = re.compile(r"project gutenberg|www\.gutenberg|pglaf|1\.E\.", re.I)


def verify(name, text):
    """Every check here failed on some earlier build of this corpus."""
    problems = []
    if GUTENBERG.search(text):
        problems.append("retains Project Gutenberg apparatus")
    m = APPARATUS.search(text)
    if m:
        line = text[:m.start()].count("\n") + 1
        problems.append("editorial apparatus at line {}: {!r}".format(line, m.group(0).strip()))
    if MOJIBAKE.search(text):
        problems.append("mis-encoded characters")
    if len(text) < 10000:
        problems.append("only {} characters, too short for a play".format(len(text)))
    return problems


def record(name, text, spec):
    path = os.path.join(OUT, name + ".txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    return {
        "file": name + ".txt",
        "gutenberg_id": spec["pg"],
        "group": spec["group"],
        "chars": len(text),
        "lines": text.count("\n"),
        "sha256_16": hashlib.sha256(text.encode("utf-8")).hexdigest()[:16],
        "note": spec["note"],
    }


MANIFEST_PREAMBLE = """Each file holds one play and nothing else: the cast list, the stage directions
and the dialogue. Gutenberg front matter, the licence, translator prefaces,
editorial introductions, footnote sections, transcriber notes and publisher
catalogues have all been cut, because the batch scoring script reads whatever it
is given as dramatic speech and cannot tell a licence clause from a line.

Three groups. The Lacan set is the drama Lacan treated at length, so far as it
exists in public-domain English. The frame library is what the MPN application
has already scored, kept so that new material can be compared against it. The
chosen eight were each added for a reason stated in the table, and the reason is
in every case something the calculus has to be able to represent.

Claudel's Coufontaine trilogy, the subject of Seminar VIII and the longest
sustained reading of a single dramatic work in the Seminars, is not here. No
public-domain English translation exists on Gutenberg. It is recorded as absent
rather than replaced by something else of Claudel's."""

MANIFEST_CLOSING = """## Reproducing this

    python3 fetch_clean_texts.py

Every boundary is an explicit marker in `WORKS`, not an inference, and every
output is checked before it is written: no Gutenberg apparatus, no editorial
headings, no mis-encoded characters, and a plausible length. The checks are there
because each of them caught a real defect. Three of the seven files originally in
this corpus were the wrong work. All seven carried the full licence text. Two
were truncated by a transcriber note near the top of the file. Electra was
silently carrying the whole of The Trachinian Maidens appended to it. Gutenberg's
own UTF-8 copy of The Awakening of Spring is mis-encoded at source, so the
fetcher takes the `-0.txt` of that book and rejects any copy that arrives with
the damage in it.

The sha256 prefix in `MANIFEST.json` pins each file. If a rebuild changes one,
Gutenberg has revised the edition, and any scored output derived from the old
file is a different stimulus."""


def write_manifest(manifest):
    with open(os.path.join(OUT, "MANIFEST.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)
        f.write("\n")
    total = sum(v["chars"] for v in manifest.values())
    rows = [
        "| Field | Value |",
        "|:---|:---|",
        "| Designation | MPN-CORPUS-01 |",
        "| Title | Clean source texts, twenty-five plays |",
        "| Built by | `fetch_clean_texts.py`, which reproduces every file below |",
        "| Source | Project Gutenberg |",
        "| Works | {} |".format(len(manifest)),
        "| Characters | {:,} |".format(total),
    ]
    body = ["\n".join(rows), "", MANIFEST_PREAMBLE, ""]
    for group in GROUP_ORDER:
        members = [(k, v) for k, v in manifest.items() if v["group"] == group]
        body.append("## {}".format(GROUP_TITLE[group]))
        body.append("")
        body.append("| Work | PG | Characters | Edition, and why it is here |")
        body.append("|:---|---:|---:|:---|")
        for k, v in members:
            body.append("| `{}` | {} | {:,} | {} |".format(
                v["file"], v["gutenberg_id"], v["chars"], v["note"]))
        body.append("")
    body.append(MANIFEST_CLOSING)
    with open(os.path.join(OUT, "MANIFEST.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(body).rstrip() + "\n")


def main():
    os.makedirs(OUT, exist_ok=True)
    volumes, manifest, failures = {}, {}, []
    for name, spec in WORKS.items():
        pg = spec["pg"]
        if pg not in volumes:
            sys.stderr.write("fetching PG {}\n".format(pg))
            volumes[pg] = strip_boilerplate(fetch(pg)).splitlines()
        text = extract(name, spec, volumes[pg])
        problems = verify(name, text)
        if problems:
            failures.append((name, problems))
        manifest[name] = record(name, text, spec)
    write_manifest(manifest)
    for name, problems in failures:
        for p in problems:
            sys.stderr.write("FAIL {}: {}\n".format(name, p))
    sys.stderr.write("{} works, {:,} characters, {} failing\n".format(
        len(manifest), sum(v["chars"] for v in manifest.values()), len(failures)))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
