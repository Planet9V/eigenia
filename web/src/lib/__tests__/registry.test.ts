/**
 * Registry integrity.
 *
 * These target the defect classes that actually reached production on this
 * site rather than hypothetical ones:
 *
 *  - a paper written, audited and committed but registered nowhere, so
 *    unreachable while every gate stayed green
 *  - a relativePath that does not resolve, which fails the Railway build and
 *    not the local one
 *  - counts drifting from reality: the navbar advertised 25 treatises while
 *    the real figure was 59
 */
import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  getAllWikiDocuments,
  getAllWorkingGroups,
  getWorkingGroupById,
} from "../wikiRegistry";
import { getAllPaperSlugs } from "../papers";

const REPO_ROOT = join(process.cwd(), "..");

describe("wiki registry", () => {
  it("registers at least one document", () => {
    expect(getAllWikiDocuments().length).toBeGreaterThan(0);
  });

  it("resolves every relativePath on disk", () => {
    const missing = getAllWikiDocuments()
      .filter((d) => !existsSync(join(REPO_ROOT, d.relativePath)))
      .map((d) => `${d.slug} -> ${d.relativePath}`);
    expect(missing).toEqual([]);
  });

  it("has no duplicate slugs", () => {
    const slugs = getAllWikiDocuments().map((d) => d.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect([...new Set(dupes)]).toEqual([]);
  });

  it("has no duplicate ids", () => {
    const ids = getAllWikiDocuments().map((d) => d.id);
    const dupes = ids.filter((s, i) => ids.indexOf(s) !== i);
    expect([...new Set(dupes)]).toEqual([]);
  });

  it("gives every document a non-empty title and workingGroupId", () => {
    const bad = getAllWikiDocuments()
      .filter((d) => !d.title?.trim() || !d.workingGroupId?.trim())
      .map((d) => d.slug);
    expect(bad).toEqual([]);
  });

  it("points every document at a working group that exists", () => {
    const known = new Set(getAllWorkingGroups().map((g) => g.id));
    const orphans = getAllWikiDocuments()
      .filter((d) => !known.has(d.workingGroupId))
      .map((d) => `${d.slug} -> ${d.workingGroupId}`);
    expect(orphans).toEqual([]);
  });
});

describe("derived counts", () => {
  it("makes the total equal the sum of its working groups", () => {
    const summed = getAllWorkingGroups().reduce(
      (n, g) => n + g.documents.length,
      0
    );
    expect(getAllWikiDocuments().length).toBe(summed);
  });

  it("resolves every working group by its own id", () => {
    for (const g of getAllWorkingGroups()) {
      expect(getWorkingGroupById(g.id)?.id).toBe(g.id);
    }
  });
});

describe("papers and wiki agree", () => {
  it("registers the same number of documents in both registries", () => {
    expect(getAllPaperSlugs().length).toBe(getAllWikiDocuments().length);
  });

  it("gives every wiki document a matching paper slug", () => {
    const paperSlugs = new Set(getAllPaperSlugs());
    const unreachable = getAllWikiDocuments()
      .map((d) => d.slug)
      .filter((s) => !paperSlugs.has(s));
    expect(unreachable).toEqual([]);
  });
});
