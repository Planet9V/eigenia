/**
 * Wiki CONTENT resolution. Importing this module pulls in the full treatise corpus
 * (~3.3 MB) via ./generatedReferencesContent. Import ./wikiRegistry instead if you
 * only need metadata such as counts, titles or navigation.
 */
import { GENERATED_DOC_CONTENT } from "./generatedReferencesContent";
import { getAllWikiDocuments, getAllWorkingGroups } from "./wikiRegistry";

export type {
  WikiDocumentMeta,
  WikiDocumentData,
  WorkingGroupCategory,
} from "./wikiRegistry";
export {
  RAW_DOC_CONTENT,
  RAW_DOC_CONTENT_NL,
  WORKING_GROUPS,
  getAllWorkingGroups,
  getWorkingGroupById,
  getAllWikiDocuments,
} from "./wikiRegistry";

import type { WikiDocumentData, WikiDocumentMeta } from "./wikiRegistry";

export function getWikiDocumentById(docId: string, lang: "en" | "nl" = "en"): WikiDocumentData | null {
  const allDocs = getAllWikiDocuments(lang);
  let docMeta = allDocs.find(
    (d) => d.id.toLowerCase() === docId.toLowerCase() || d.slug.toLowerCase() === docId.toLowerCase()
  );

  if (!docMeta) {
    docMeta = allDocs.find(
      (d) => d.workingGroupId.toLowerCase() === docId.toLowerCase()
    );
  }

  if (!docMeta) return null;

  // Authoritative content is ALWAYS resolved directly from GENERATED_DOC_CONTENT (compiled from eigenia/references/)
  // Treatises are published in whole; never clipped, never replaced with incomplete stubs.
  const authoritativeContent =
    GENERATED_DOC_CONTENT[docMeta.relativePath] ||
    GENERATED_DOC_CONTENT[docMeta.id] ||
    GENERATED_DOC_CONTENT[docMeta.slug] ||
    GENERATED_DOC_CONTENT[docMeta.workingGroupId] ||
    GENERATED_DOC_CONTENT[docId] ||
    "";

  if (!authoritativeContent) {
    console.error(`Wiki document content not found for ${docMeta.id}`);
    return null;
  }

  const lines = authoritativeContent.split(/\r?\n/);
  const words = authoritativeContent.split(/\s+/).filter(Boolean);

  return {
    ...docMeta,
    content: authoritativeContent,
    contentNl: authoritativeContent, // Always serve 100% complete content; NEVER truncate or clip!
    charCount: authoritativeContent.length,
    lineCount: lines.length,
    wordCount: words.length,
    filePath: docMeta.relativePath,
  };
}

export interface WikiSearchResult {
  doc: WikiDocumentMeta;
  snippet: string;
  matchScore: number;
}

export function searchWikiDocuments(query: string, lang: "en" | "nl" = "en"): WikiSearchResult[] {
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase().trim();
  const results: WikiSearchResult[] = [];

  for (const wg of getAllWorkingGroups(lang)) {
    for (const docMeta of wg.documents) {
      const docData = getWikiDocumentById(docMeta.id, lang);
      if (!docData) continue;

      let score = 0;
      let matchSnippet = "";

      if (docMeta.title.toLowerCase().includes(q)) score += 10;
      if (docMeta.subtitle?.toLowerCase().includes(q)) score += 5;
      if (docMeta.workingGroupName.toLowerCase().includes(q)) score += 3;

      const contentLower = docData.content.toLowerCase();
      const contentIndex = contentLower.indexOf(q);

      if (contentIndex !== -1) {
        score += 2;
        const start = Math.max(0, contentIndex - 40);
        const end = Math.min(docData.content.length, contentIndex + q.length + 60);
        matchSnippet = "..." + docData.content.slice(start, end).replace(/\n/g, " ") + "...";
      }

      if (score > 0) {
        results.push({
          doc: docMeta,
          snippet: matchSnippet || docMeta.subtitle || docMeta.title,
          matchScore: score,
        });
      }
    }
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
