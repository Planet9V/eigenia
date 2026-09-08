/**
 * Resolves the references/ directory across the two layouts this repo runs in.
 *
 * Locally the repo is  <repo>/web/scripts/  with content at <repo>/references.
 * In the Docker image the Dockerfile does `COPY web ./` and
 * `COPY references ./references`, so scripts sit at /app/scripts and content at
 * /app/references. Resolving "../.." from the script directory gives <repo> on
 * a laptop and "/" inside the image, which is why three audits died with
 * `ENOENT: scandir '/references'` on Railway and passed everywhere else.
 *
 * audit-publications.js already probed candidates and therefore survived. This
 * is that logic, extracted, so every audit resolves content the same way.
 */

import { existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * @param {string} scriptDir - the calling script's own directory, i.e. import.meta.dirname
 * @returns {string} absolute path to the references directory
 * @throws if no candidate exists, because silently auditing nothing reads as a pass
 */
export function resolveReferencesDir(scriptDir) {
  const candidates = [
    process.env.REFERENCES_DIR,
    resolve(scriptDir, "../../references"), // local: <repo>/references
    resolve(scriptDir, "../references"), // docker: /app/references
    resolve(process.cwd(), "../references"),
    resolve(process.cwd(), "references"),
  ].filter(Boolean);

  for (const c of candidates) {
    if (existsSync(c)) return c;
  }

  throw new Error(
    `Could not find a references directory. Tried:\n  ${candidates.join(
      "\n  "
    )}\nSet REFERENCES_DIR to override.`
  );
}
