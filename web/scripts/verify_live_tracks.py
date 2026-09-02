import json
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/tracks_audit"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    # 1. Audit Live /tracks
    print("Visiting live https://eigenia.nl/tracks ...")
    page.goto("https://eigenia.nl/tracks", wait_until="networkidle")
    page.wait_for_timeout(500)
    
    hero_p = page.locator("section p").first.inner_text()
    print("Live Tracks Hero Copy:", hero_p)
    
    # Bento screenshot on live site
    sc_live_bento = f"{OUTPUT_DIR}/live_tracks_fixed_bento.png"
    page.screenshot(path=sc_live_bento, full_page=True)
    print(f"Saved live Bento screenshot: {sc_live_bento}")
    
    # Lines screenshot on live site
    page.locator("button[title='Lines / List View']").click()
    page.wait_for_timeout(300)
    sc_live_lines = f"{OUTPUT_DIR}/live_tracks_fixed_lines.png"
    page.screenshot(path=sc_live_lines, full_page=True)
    print(f"Saved live Lines screenshot: {sc_live_lines}")
    
    # 2. Test Live Gateway Navigation across all 9 Working Groups
    test_wgs = [
        ("WG-01-UI", "Actuarial & Underwriting Foundations", "Actuarial"),
        ("WG-02-DT", "Fooled by", "Digital Twin & Taleb"),
        ("WG-03-ML", "Lacanian", "Psychometrics"),
        ("WG-04-CF", "Cascading Failure", "Cascading Failures"),
        ("WG-05-CAD", "DEXPI", "CAD & DEXPI"),
        ("WG-07-TM", "TACAM", "Threat Modeling"),
        ("WG-08-MO", "Monte Carlo", "Monte Carlo"),
        ("MP-MATH", "Mathematical Models", "Math & Physics"),
        ("GOV-RES", "External research", "Governance")
    ]
    
    print("\n--- AUDITING LIVE GATEWAY ROUTING ON https://eigenia.nl/wiki ---")
    results = []
    all_passed = True
    for wg_id, expected_keyword, label in test_wgs:
        url = f"https://eigenia.nl/wiki?wg={wg_id}"
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(400)
        
        h1_text = page.inner_text("article h1") if page.locator("article h1").count() > 0 else ""
        passed = expected_keyword.lower() in h1_text.lower()
        if not passed:
            all_passed = False
            status = "❌ FAIL"
        else:
            status = "✅ PASS"
            
        print(f"[{status}] {label:<22} (?wg={wg_id:<10}) -> Rendered: '{h1_text[:50]}...'")
        results.append({
            "wg_id": wg_id,
            "label": label,
            "h1": h1_text,
            "passed": passed
        })
        
    browser.close()
    
    with open(f"{OUTPUT_DIR}/live_verification_report.json", "w") as f:
        json.dump({"hero_copy": hero_p, "all_passed": all_passed, "results": results}, f, indent=2)
        
    if all_passed:
        print("\nALL 9 TRACKS ON LIVE SITE ROUTE TO THEIR RESPECTIVE FIRST TREATISES PERFECTLY!")
    else:
        print("\nSOME LIVE ROUTES FAILED!")
