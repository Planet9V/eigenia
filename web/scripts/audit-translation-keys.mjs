#!/usr/bin/env node
/**
 * TRANSLATION KEY AUDIT
 *
 * Every key passed to t() must exist in both the English and the Dutch block.
 *
 * Why this exists: `t` is typed `(key: string) => string`, so the compiler
 * accepts any string and a missing key renders as the raw key on the page.
 * Six components carried 20 keys that existed in neither language; tsc was
 * clean the whole time. Those components were never imported, so nothing broke,
 * but only by luck: wiring one up would have shipped "join_tag" as visible text.
 *
 * Several of the calls were written as t("key" as any). The cast does nothing,
 * because the parameter is already string. It reads like a suppressed error,
 * which is worse than no cast at all, so this audit reports it.
 *
 * Usage: node scripts/audit-translation-keys.mjs
 * Exit:  0 clean, 1 a key is missing or a pointless cast remains, 2 could not run.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const HERE = import.meta.dirname;
const SRC = resolve(HERE, "../src");
const ROOT = resolve(HERE, "..");
const TRANSLATIONS = join(SRC, "locales/translations.ts");

/** Only a real t(...) call: not the tail of split( or parseInt(. */
const CALL = /(?<![A-Za-z0-9_$.])t\(\s*"([^"]+)"/g;
/** The cast is a no-op because t already takes a string. */
const POINTLESS_CAST = /(?<![A-Za-z0-9_$.])t\(\s*"[^"]+"\s+as\s+any\s*\)/g;

if (!existsSync(TRANSLATIONS)) {
  console.error("TRANSLATION KEY AUDIT COULD NOT RUN: translations.ts not found");
  process.exit(2);
}

/** en and nl are two object literals in one file; split on the nl block. */
const raw = readFileSync(TRANSLATIONS, "utf-8");
const nlAt = raw.search(/^\s{2}nl:\s*\{/m);
if (nlAt < 0) {
  console.error("TRANSLATION KEY AUDIT COULD NOT RUN: could not locate the nl block");
  process.exit(2);
}
const keysIn = (s) => new Set([...s.matchAll(/^\s+([a-zA-Z0-9_]+):/gm)].map((m) => m[1]));
const en = keysIn(raw.slice(0, nlAt));
const nl = keysIn(raw.slice(nlAt));

// Prove the gate can fail before trusting a pass.
const canary = 'const x = t("definitely_not_a_real_key");';
if ([...canary.matchAll(CALL)].length !== 1) {
  console.error("TRANSLATION KEY AUDIT COULD NOT RUN: self-test failed, a real t() call was not seen.");
  process.exit(2);
}
if ([...'const y = "a".split("x"); parseInt("3");'.matchAll(CALL)].length !== 0) {
  console.error("TRANSLATION KEY AUDIT COULD NOT RUN: self-test failed, split( or parseInt( matched as t().");
  process.exit(2);
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".next") continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e)) out.push(p);
  }
  return out;
}

const BAR = "=".repeat(72);
console.log(BAR);
console.log("TRANSLATION KEY AUDIT");
console.log(BAR);
console.log(`Defined: ${en.size} English, ${nl.size} Dutch`);
console.log("");

let missing = 0, casts = 0;
for (const file of walk(SRC)) {
  if (file === TRANSLATIONS) continue;
  const src = readFileSync(file, "utf-8");
  const rel = relative(ROOT, file);
  for (const m of src.matchAll(CALL)) {
    const k = m[1];
    const gaps = [!en.has(k) && "English", !nl.has(k) && "Dutch"].filter(Boolean);
    if (gaps.length) {
      missing++;
      const line = src.slice(0, m.index).split("\n").length;
      console.log(`FAIL  ${rel}:${line}`);
      console.log(`        t("${k}") is missing from ${gaps.join(" and ")}`);
    }
  }
  for (const m of src.matchAll(POINTLESS_CAST)) {
    casts++;
    const line = src.slice(0, m.index).split("\n").length;
    console.log(`FAIL  ${rel}:${line}`);
    console.log(`        ${m[0].trim()} — the cast is a no-op; t already takes a string`);
  }
}

console.log("");
console.log(BAR);
if (missing || casts) {
  console.error(
    `TRANSLATION KEY AUDIT FAILED: ${missing} missing key(s), ${casts} pointless cast(s).`
  );
  console.error("A missing key renders as the raw key on the page.");
  console.log(BAR);
  process.exit(1);
}
console.log("TRANSLATION KEY AUDIT PASSED: every t() key exists in both languages.");
console.log(BAR);
