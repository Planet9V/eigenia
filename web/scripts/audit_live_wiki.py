import os
import sys
import json
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/audit_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

DOC_IDS = [
    "WG-01-UI-1-Overview",
    "WG-01-UI-1-Competitive_Analysis",
    "WG-01-UI-1-COPE_summary",
    "WG-01-UI-1-COPE_detail",
    "WG-01-UI-1-Cyber_Method",
    "WG-01-UI-1-Cyber_Risk_Underwriting",
    "WG-01-UI-1-Req-Improvements",
    "WG-01-UI-1-7-Industry-Value-Prop",
    "WG-01-UI-Cyber_Observations",
    "WG-02-DT-1",
    "WG-02-DT-2",
    "WG-02-DT-3",
    "WG-02-DT-4",
    "WG-02-DT-5",
    "WG-02-DT-Applied-Physics",
    "WG-02-DT-Paradigm-Library",
    "WG-03-ML-Mckenney-Lacanian",
    "WG-04-CF-Cascading-Failure-Hypothesis",
    "WG-04-CF-Death-Wobble",
    "WG-05-CAD-DEXPI-Introduction",
    "WG-07-TM-ATQ",
    "WG-07-TM-TACAM",
    "WG-08-MO-Monte-Carlo-Engine",
    "MP_Kramers_Escape_Model",
    "MP_Mathematical_Models",
    "README"
]

def main():
    print(f"Auditing {len(DOC_IDS)} documents on live site https://eigenia.nl/wiki ...")
    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        for idx, doc_id in enumerate(DOC_IDS):
            url = f"https://eigenia.nl/wiki?doc={doc_id}"
            try:
                page.goto(url, wait_until="networkidle", timeout=15000)
                page.wait_for_timeout(500)

                title = page.inner_text("h1") if page.locator("h1").count() > 0 else "N/A"
                article = page.locator("article")
                article_text = article.inner_text() if article.count() > 0 else ""
                char_count = len(article_text)
                word_count = len(article_text.split())

                # Check for KaTeX errors
                katex_errors = page.locator(".katex-error").count()

                # Check for untranslated or placeholder markers
                has_placeholders = "- -" in article_text or "\n-\n\n-" in article_text or "TODO" in article_text

                screenshot_file = None
                if idx < 6 or has_placeholders or katex_errors > 0 or word_count < 100:
                    screenshot_name = f"doc_{idx+1:02d}_{doc_id[:20]}.png"
                    screenshot_path = os.path.join(OUTPUT_DIR, screenshot_name)
                    page.screenshot(path=screenshot_path)
                    screenshot_file = screenshot_path

                status = "PASS"
                notes = []
                if word_count < 100:
                    status = "TRUNCATED"
                    notes.append("Very low word count")
                if has_placeholders:
                    status = "PLACEHOLDERS"
                    notes.append("Contains placeholder hyphens or TODO")
                if katex_errors > 0:
                    notes.append(f"{katex_errors} KaTeX errors")

                res = {
                    "doc_id": doc_id,
                    "title": title,
                    "words": word_count,
                    "chars": char_count,
                    "katex_errors": katex_errors,
                    "status": status,
                    "notes": "; ".join(notes) if notes else "OK",
                    "screenshot": screenshot_file
                }
                results.append(res)
                print(f"[{idx+1:02d}/{len(DOC_IDS)}] {doc_id:<35} | Words: {word_count:>5} | Chars: {char_count:>6} | Status: {status}")

            except Exception as e:
                print(f"[{idx+1:02d}/{len(DOC_IDS)}] {doc_id:<35} | ERROR: {e}")
                results.append({
                    "doc_id": doc_id,
                    "error": str(e),
                    "status": "ERROR"
                })

        browser.close()

    summary_file = os.path.join(OUTPUT_DIR, "audit_summary.json")
    with open(summary_file, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nAudit complete. Summary written to {summary_file}")

if __name__ == "__main__":
    main()
