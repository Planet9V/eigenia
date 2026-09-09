// Parse a candidate mermaid diagram with the real library before it lands in a
// document. Globals set up exactly as audit-mermaid.mjs does.
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><body></body>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of ["window", "document", "Element", "SVGElement", "Node",
                 "HTMLElement", "DocumentFragment", "getComputedStyle", "MutationObserver"]) {
  try { globalThis[k] = k === "window" ? w : w[k]; } catch { /* getter-only */ }
}
try { Object.defineProperty(globalThis, "navigator", { value: w.navigator, configurable: true }); } catch {}
const mermaid = (await import("mermaid")).default;
mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
for (const f of process.argv.slice(2)) {
  try { await mermaid.parse(readFileSync(f, "utf8")); console.log(`PARSE OK   ${f}`); }
  catch (e) { console.error(`PARSE FAIL ${f}: ${e.message.split("\n")[0]}`); process.exitCode = 1; }
}
