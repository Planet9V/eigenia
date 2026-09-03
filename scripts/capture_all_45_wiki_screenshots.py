#!/usr/bin/env python3
"""
Comprehensive Screenshot & Confirmation Agent for All 45 Wiki Documents
Eigenia Research Wiki & Academic Publication Standard

Navigates to each of the 45 documents on http://localhost:3030/wiki?doc={slug},
captures a high-resolution screenshot of each page, verifies the clean front-matter
in the document body (.prose container), and outputs an auditable verification register.
"""

import os
import glob
import json
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/wiki_all_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def main():
    files = sorted(glob.glob("references/**/*.md", recursive=True))
    total = len(files)
    print(f"================================================================================")
    print(f"CAPTURING SCREENSHOTS & CONFIRMING ALL {total} WIKI DOCUMENTS")
    print(f"Target Server: http://localhost:3030/wiki")
    print(f"Destination: {OUTPUT_DIR}")
    print(f"================================================================================\n")

    confirmation_records = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 1000})
        page = context.new_page()

        SLUG_MAP = {
            "WG-04-CF-Cascading Failure Hypothesis": "WG-04-CF-Cascading-Failure-Hypothesis",
            "WG-04-CF-Death Wobble-The Grids Precarious Pulse Frequency Instability - jmckenney": "WG-04-CF-Death-Wobble",
            "WG-08-MO-Monte Carlo Engine": "WG-08-MO-Monte-Carlo-Engine"
        }

        for idx, file_path in enumerate(files, start=1):
            base_name = os.path.basename(file_path).replace(".md", "")
            doc_id = SLUG_MAP.get(base_name, base_name)
            target_url = f"http://localhost:3030/wiki?doc={doc_id}"

            try:
                page.goto(target_url, wait_until="networkidle", timeout=20000)
                # Wait for hero card and prose body to be visible
                page.wait_for_selector(".border-hairline", state="visible", timeout=10000)
                page.wait_for_selector(".prose", state="visible", timeout=10000)
                page.wait_for_timeout(300)

                # Extract audit details
                audit_info = page.evaluate("""() => {
                    const hero = document.querySelector('h1');
                    const heroTitle = hero ? hero.innerText.trim() : '';
                    
                    const sub = document.querySelector('p.text-secondary');
                    const heroSubtitle = sub ? sub.innerText.trim() : '';

                    const prose = document.querySelector('.prose');
                    const proseText = prose ? prose.innerText : '';

                    const hasTable = !!prose.querySelector('table');
                    const hasRawBoldMeta = proseText.includes('**Document Identifier:**') || proseText.includes('Document Identifier: EIGENIA');
                    const hasLooseSponsor = /Lab Sponsor\\s*(Resident)?/i.test(proseText);

                    return {
                        heroTitle,
                        heroSubtitle,
                        hasTable,
                        hasRawBoldMeta,
                        hasLooseSponsor,
                        proseCharCount: proseText.length
                    };
                }""")

                screenshot_path = os.path.join(OUTPUT_DIR, f"{base_name}.png")
                page.screenshot(path=screenshot_path)

                is_ok = (
                    bool(audit_info["heroTitle"]) and
                    not audit_info["hasRawBoldMeta"] and
                    not audit_info["hasLooseSponsor"] and
                    audit_info["proseCharCount"] > 50
                )

                status = "✅ CONFIRMED" if is_ok else "❌ DEFECT"
                layout_type = "Spec Table" if audit_info["hasTable"] else "Clean Prose"
                print(f"[{idx:02d}/{total}] {base_name[:38]:<38} -> {status} [{layout_type}] ('{audit_info['heroTitle'][:24]}...')")

                confirmation_records.append({
                    "index": idx,
                    "document": base_name,
                    "url": target_url,
                    "screenshot": screenshot_path,
                    "hero_title": audit_info["heroTitle"],
                    "layout_type": layout_type,
                    "status": status,
                    "confirmed": is_ok
                })

            except Exception as e:
                print(f"[{idx:02d}/{total}] {base_name[:38]:<38} -> ❌ ERROR: {e}")
                confirmation_records.append({
                    "index": idx,
                    "document": base_name,
                    "url": target_url,
                    "error": str(e),
                    "confirmed": False
                })

        browser.close()

    summary_json = os.path.join(OUTPUT_DIR, "all_pages_confirmation_summary.json")
    with open(summary_json, "w", encoding="utf-8") as f:
        json.dump(confirmation_records, f, indent=2)

    confirmed_count = sum(1 for c in confirmation_records if c.get("confirmed"))
    print(f"\n================================================================================")
    print(f"CONFIRMATION AUDIT COMPLETE: {confirmed_count}/{total} PAGES VERIFIED & CONFIRMED")
    print(f"Screenshots recorded in: {OUTPUT_DIR}")
    print(f"================================================================================\n")

if __name__ == "__main__":
    main()
