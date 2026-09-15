import { describe, it, expect, beforeEach } from "vitest";
import {
  validateListeningIntake,
  inspectPackReturn,
  stripQuoteMarkers,
  rateLimit,
  LISTENING_LIMITS,
} from "../listeningIntakeValidation";
import { __resetRateLimit } from "../contactValidation";

/**
 * A return in the shape the pack writes: the header block, then sections in
 * square brackets, then `key = value` lines with six-space continuations for
 * multi-line free text, then the trailer.
 *
 * The values here are deliberately meaningless. Nothing in this file knows what
 * any answer should be, and nothing in this file should ever have to.
 */
const RETURN = [
  "MPN LISTENING PACK, VERSION 2",
  "respondent R04217",
  "pack build a0a920124a8a",
  "stimulus set 650e233c77db",
  "completed 2026-09-14 11:02 UTC",
  "",
  "[who]",
  "  who.path = composer",
  "  who.whorole = repertory, eleven years",
  "",
  "[A]",
  "  A1.order = C, A, F, B, D, E",
  "  A2.1.pick = D",
  "  A2.1.why = it sat still under the line, which is what the",
  "      situation seemed to want",
  "",
  "[B]",
  "  B1.B3 = cannot tell",
  "",
  "---",
  "Answers are letters as shown on the page. The presentation order is a",
  "fixed permutation and the key that decodes it is held with the study.",
].join("\n");

const quoted = (text: string, depth = 1) =>
  text
    .split("\n")
    .map((line) => `${"> ".repeat(depth)}${line}`.trimEnd())
    .join("\n");

const good = { returnText: RETURN, role: "composer", credit: "named" };

describe("stripQuoteMarkers", () => {
  it("removes one level, several levels, and spaced markers", () => {
    expect(stripQuoteMarkers("> [A]")).toBe("[A]");
    expect(stripQuoteMarkers(">>> [A]")).toBe("[A]");
    expect(stripQuoteMarkers("> > >   [A]")).toBe("  [A]");
    expect(stripQuoteMarkers("[A]")).toBe("[A]");
  });
});

describe("inspectPackReturn", () => {
  it("sees the header, the sections and the answer lines", () => {
    const shape = inspectPackReturn(RETURN);
    expect(shape.headerSeen).toBe(true);
    expect(shape.sectionCount).toBe(3);
    expect(shape.answerLines).toBeGreaterThan(0);
  });

  it("sees the same thing through email quoting, at any depth", () => {
    for (const depth of [1, 2, 4]) {
      const shape = inspectPackReturn(quoted(RETURN, depth));
      expect(shape.headerSeen).toBe(true);
      expect(shape.sectionCount).toBe(3);
    }
  });

  it("survives a byte order mark and Windows line endings", () => {
    const shape = inspectPackReturn("﻿" + RETURN.replace(/\n/g, "\r\n"));
    expect(shape.headerSeen).toBe(true);
    expect(shape.sectionCount).toBe(3);
  });
});

describe("validateListeningIntake", () => {
  it("accepts a normal return and forwards the text byte for byte", () => {
    const r = validateListeningIntake(good);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.looksLikePackReturn).toBe(true);
      expect(r.value.shapeNote).toBe("");
      // never trimmed, never re-wrapped: the parser depends on the line breaks
      // and on the six-space continuation indent
      expect(r.value.returnText).toBe(RETURN);
      expect(r.value.returnText).toContain("\n      situation seemed to want");
      expect(r.value.email).toBe("");
    }
  });

  it("accepts a paste that carries email quoting, unchanged", () => {
    const pasted = quoted(RETURN, 2);
    const r = validateListeningIntake({ ...good, returnText: pasted });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.looksLikePackReturn).toBe(true);
      // the quote markers are read past, not stripped out of what is filed
      expect(r.value.returnText).toBe(pasted);
    }
  });

  it("rejects an empty or whitespace-only return with a message that says what to do", () => {
    for (const returnText of ["", "   ", "\n\n\t\n"]) {
      const r = validateListeningIntake({ ...good, returnText });
      expect(r.ok).toBe(false);
      if (!r.ok) {
        expect(r.reason).toContain("empty");
        expect(r.reason).toContain("Paste");
      }
    }
  });

  it("rejects a body that is not an object", () => {
    for (const bad of ["string", 42, null, [], true]) {
      expect(validateListeningIntake(bad).ok).toBe(false);
    }
  });

  it("rejects a non-string field rather than coercing it", () => {
    const r = validateListeningIntake({ ...good, returnText: { toString: () => "x" } });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toContain("returnText");
  });

  it("requires a path and a credit choice, and names the options when one is wrong", () => {
    expect(validateListeningIntake({ ...good, role: "" }).ok).toBe(false);
    expect(validateListeningIntake({ ...good, credit: "" }).ok).toBe(false);
    const r = validateListeningIntake({ ...good, role: "conductor" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toContain("composer");
  });

  it("takes a return address or none, and rejects one that is not an address", () => {
    expect(validateListeningIntake({ ...good, email: "" }).ok).toBe(true);
    expect(validateListeningIntake({ ...good, email: "a@b.co" }).ok).toBe(true);
    for (const email of ["nope", "a@b", "a b@c.co", "@b.co"]) {
      expect(validateListeningIntake({ ...good, email }).ok).toBe(false);
    }
  });

  it("caps every field at its documented limit", () => {
    for (const [field, max] of Object.entries(LISTENING_LIMITS)) {
      const over = validateListeningIntake({ ...good, [field]: "x".repeat(max + 1) });
      expect(over.ok).toBe(false);
      if (!over.ok) expect(over.reason).toContain(field);
    }
  });

  it("flags a body that is not a pack return rather than dropping it", () => {
    const notAReturn =
      "Hi Jim, I finished the pack last night but I cannot find the file. Here are my answers from memory: the third one was the odd one out.";
    const r = validateListeningIntake({ ...good, returnText: notAReturn });
    // accepted, because it is still the only copy of something somebody wrote
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.looksLikePackReturn).toBe(false);
      expect(r.value.shapeNote).toContain("MPN LISTENING PACK");
      expect(r.value.shapeNote).toContain("square brackets");
      expect(r.value.returnText).toBe(notAReturn);
    }
  });

  it("flags a return that has the header but lost its sections", () => {
    const headerOnly = RETURN.split("\n").filter((l) => !/^\[/.test(l.trim())).join("\n");
    const r = validateListeningIntake({ ...good, returnText: headerOnly });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.looksLikePackReturn).toBe(false);
      expect(r.value.shapeNote).toContain("square brackets");
      expect(r.value.shapeNote).not.toContain("MPN LISTENING PACK");
    }
  });

  it("flags a return whose header was eaten but keeps its sections", () => {
    const noHeader = RETURN.split("\n").slice(5).join("\n");
    const r = validateListeningIntake({ ...good, returnText: noHeader });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.looksLikePackReturn).toBe(false);
      expect(r.value.shapeNote).toContain("MPN LISTENING PACK");
      expect(r.value.shapeNote).not.toContain("square brackets");
    }
  });
});

describe("rateLimit on the listening intake", () => {
  beforeEach(() => __resetRateLimit());

  it("is the same courtesy control the contact route uses", () => {
    for (let i = 0; i < 5; i++) expect(rateLimit("9.9.9.9").allowed).toBe(true);
    expect(rateLimit("9.9.9.9").allowed).toBe(false);
  });
});
