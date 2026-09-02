import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    # 1. Check tracks hero copy
    page.goto("http://localhost:4500/tracks", wait_until="networkidle")
    hero_p = page.locator("section p").first.inner_text()
    print("Tracks Hero Copy:", hero_p)
    assert "9 Eigenia Lab Working Groups" in hero_p, f"Expected 9 Working Groups in copy, got: {hero_p}"
    
    # Screenshot of enhanced tracks page
    page.screenshot(path="/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/tracks_audit/tracks_enhanced_bento.png", full_page=True)
    
    # 2. Test navigation to each of the 9 Working Groups with only ?wg=...
    test_wgs = [
        ("WG-01-UI", "Actuarial & Underwriting Foundations"),
        ("WG-02-DT", "Fooled by"),
        ("WG-03-ML", "Lacanian"),
        ("WG-04-CF", "Cascading Failure"),
        ("WG-05-CAD", "DEXPI"),
        ("WG-07-TM", "TACAM"),
        ("WG-08-MO", "Monte Carlo"),
        ("MP-MATH", "Mathematical Models"),
        ("GOV-RES", "External research")
    ]
    
    print("\n--- TESTING WIKI GATEWAY ROUTING FOR ALL 9 TRACKS ---")
    all_passed = True
    for wg_id, expected_keyword in test_wgs:
        url = f"http://localhost:4500/wiki?wg={wg_id}"
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(200)
        
        h1_text = page.inner_text("article h1") if page.locator("article h1").count() > 0 else ""
        passed = expected_keyword.lower() in h1_text.lower()
        if not passed:
            all_passed = False
            status = "❌ FAIL"
        else:
            status = "✅ PASS"
            
        print(f"[{status}] ?wg={wg_id:<10} -> Rendered H1: '{h1_text[:60]}...'")
        
    browser.close()
    
    if all_passed:
        print("\nALL 9 WORKING GROUPS SUCCESSFULLY ROUTED FROM GATEWAY!")
    else:
        print("\nROUTING TESTS FAILED!")
        exit(1)
