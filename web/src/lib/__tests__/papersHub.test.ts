import { describe, it, expect } from "vitest";
import {
  TREATISE_WORD_COUNTS,
  getTreatiseWordCount,
  getReadingMinutes,
  formatReadingTime,
} from "../wordCounts";
import { getAllWikiDocuments } from "../wikiRegistry";

describe("Papers Hub Kaizen Enhancements & Word Count Model", () => {
  const allDocs = getAllWikiDocuments("en");

  it("indexes word counts for all 128 canonical treatises", () => {
    expect(allDocs.length).toBe(128);
    expect(Object.keys(TREATISE_WORD_COUNTS).length).toBe(128);

    for (const doc of allDocs) {
      expect(TREATISE_WORD_COUNTS[doc.slug]).toBeDefined();
      expect(typeof TREATISE_WORD_COUNTS[doc.slug]).toBe("number");
      expect(TREATISE_WORD_COUNTS[doc.slug]).toBeGreaterThan(0);
    }
  });

  it("contains valid word counts for newly published Batch 15 monographs", () => {
    const batch15Slugs = [
      "differential-form-sheaves-homological-invariants",
      "extreme-value-copulas-catastrophic-solvency",
      "asynchronous-consensus-kalman-byzantine",
    ];

    for (const slug of batch15Slugs) {
      const words = getTreatiseWordCount(slug);
      expect(words).toBeGreaterThan(500);
      const readingTime = getReadingMinutes(words);
      expect(readingTime).toBeGreaterThanOrEqual(1);
    }
  });

  it("calculates reading minutes based on standard 225 wpm with 1-min floor", () => {
    expect(getReadingMinutes(0)).toBe(1);
    expect(getReadingMinutes(100)).toBe(1);
    expect(getReadingMinutes(225)).toBe(1);
    expect(getReadingMinutes(450)).toBe(2);
    expect(getReadingMinutes(3375)).toBe(15);
    expect(getReadingMinutes(11250)).toBe(50);
  });

  it("formats localized reading time strings in English and Dutch", () => {
    expect(formatReadingTime(450, "en")).toBe("2 min read");
    expect(formatReadingTime(450, "nl")).toBe("2 min leestijd");
    expect(formatReadingTime(100, "en")).toBe("1 min read");
    expect(formatReadingTime(100, "nl")).toBe("1 min leestijd");
  });

  it("handles fallback gracefully for unknown slugs", () => {
    expect(getTreatiseWordCount("unknown-nonexistent-paper")).toBe(2500);
  });
});
