import json
import os
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/audit_screenshots_fixed"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    with open("src/lib/generatedReferencesContent.json") as f:
        data = json.load(f)
        meta = data["metadata"]
        
    doc_ids = [
        "WG-01-UI-1-Overview",
        "WG-01-UI-1-COPE_summary",
        "WG-01-UI-1-COPE_detail",
        "WG-01-UI-1-Cyber_Risk_Underwriting",
        "WG-01-UI-Cyber_Observations",
        "WG-01-UI-1-Cyber_Method",
        "WG-01-UI-1-7-Industry-Value-Prop",
        "WG-01-UI-1-Competitive_Analysis",
        "WG-01-UI-1-Req-Improvements",
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
        "WG-07-TM-TACAM",
        "WG-07-TM-ATQ",
        "WG-08-MO-Monte-Carlo-Engine",
        "MP_Mathematical_Models",
        "MP_Kramers_Escape_Model",
        "README"
    ]
    
    print(f"Auditing {len(doc_ids)} documents on http://localhost:4500/wiki ...")
    
    results = []
    failures = 0
    
    for doc_id in doc_ids:
        page.goto(f"http://localhost:4500/wiki?doc={doc_id}", wait_until="networkidle")
        page.wait_for_timeout(200)
        
        raw_text = page.inner_text("article") or ""
        words = len(raw_text.split())
        
        # Check for truncated placeholders (like the old \n-\n\n- bug)
        has_hyphen_placeholders = "\n-\n\n-" in raw_text
        has_todo = "TODO" in raw_text or "[TBD]" in raw_text
        
        # Check KaTeX errors
        katex_errs = page.locator(".katex-error").count()
        
        # Check headings
        headings = page.locator("article h1, article h2, article h3, article h4").count()
        
        # Always capture screenshot
        sc_path = f"{OUTPUT_DIR}/{doc_id}.png"
        page.screenshot(path=sc_path, full_page=True)
            
        status = "PASS"
        if has_hyphen_placeholders or has_todo:
            status = "FAIL_PLACEHOLDERS"
            failures += 1
        elif katex_errs > 0:
            status = "FAIL_KATEX"
            failures += 1
        elif words < 50 and doc_id != "README":
            status = "FAIL_TRUNCATED"
            failures += 1
            
        print(f"[{status:<17}] {doc_id:<38} | Words: {words:>5} | Headings: {headings:>2} | KaTeX Errors: {katex_errs}")
        
        results.append({
            "doc_id": doc_id,
            "status": status,
            "words": words,
            "headings": headings,
            "katex_errors": katex_errs,
            "screenshot": sc_path
        })
        
    # Also test NL language switch on COPE_summary
    page.goto("http://localhost:4500/wiki?doc=WG-01-UI-1-COPE_summary", wait_until="networkidle")
    page.evaluate("() => localStorage.setItem('eigenia_lang', 'nl')")
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(300)
    
    nl_text = page.inner_text("article") or ""
    nl_words = len(nl_text.split())
    print(f"\n[NL MODE TEST] WG-01-UI-1-COPE_summary in Dutch mode: {nl_words} words (Expected ~307 words, NOT 43!)")
    
    sc_nl = f"{OUTPUT_DIR}/COPE_summary_dutch_mode.png"
    page.screenshot(path=sc_nl, full_page=True)
    
    browser.close()
    
    with open(f"{OUTPUT_DIR}/verification_report.json", "w") as f:
        json.dump({"results": results, "failures": failures, "nl_mode_cope_words": nl_words}, f, indent=2)
        
    print(f"\nAUDIT COMPLETE: {len(doc_ids) - failures}/{len(doc_ids)} PASSED. Failures: {failures}")
