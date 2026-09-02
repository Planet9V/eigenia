import json
import os
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/tracks_audit"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    console_logs = []
    page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda err: console_logs.append(f"[ERROR] {err}"))
    
    print("Navigating to https://eigenia.nl/tracks ...")
    response = page.goto("https://eigenia.nl/tracks", wait_until="networkidle")
    page.wait_for_timeout(500)
    
    status_code = response.status if response else 0
    print(f"Page response status: {status_code}")
    
    # Hero text analysis
    hero_title = page.inner_text("h1") if page.locator("h1").count() > 0 else ""
    hero_desc = page.locator("section p").first.inner_text() if page.locator("section p").count() > 0 else ""
    badge_text = page.locator("section span").first.inner_text() if page.locator("section span").count() > 0 else ""
    
    print("\n--- HERO SECTION ---")
    print("Title:", hero_title)
    print("Badge:", badge_text)
    print("Description:", hero_desc)
    
    # Screenshot Bento View
    sc_bento = f"{OUTPUT_DIR}/tracks_bento_view.png"
    page.screenshot(path=sc_bento, full_page=True)
    print(f"Saved Bento screenshot to {sc_bento}")
    
    # Working groups analysis in Bento view
    cards = page.locator("main .grid > div")
    card_count = cards.count()
    print(f"\nTotal Working Group cards rendered: {card_count}")
    
    card_data = []
    for i in range(card_count):
        card = cards.nth(i)
        wg_num = card.locator("span.font-mono").first.inner_text() if card.locator("span.font-mono").count() > 0 else ""
        wg_title = card.locator("h3").first.inner_text() if card.locator("h3").count() > 0 else ""
        wg_badge = card.locator("span.rounded-full").first.inner_text() if card.locator("span.rounded-full").count() > 0 else ""
        wg_treatises = card.locator("span.text-muted").first.inner_text() if card.locator("span.text-muted").count() > 0 else ""
        wg_link = card.locator("a").first.get_attribute("href") if card.locator("a").count() > 0 else ""
        
        card_data.append({
            "index": i,
            "number": wg_num,
            "title": wg_title,
            "badge": wg_badge,
            "treatises": wg_treatises,
            "href": wg_link
        })
        print(f"  [{i+1:>2}] {wg_num:<10} | {wg_title:<50} | {wg_treatises:<15} | Link: {wg_link}")
        
    # Test View Switcher to Lines view
    lines_btn = page.locator("button[title='Lines / List View']")
    if lines_btn.count() > 0:
        lines_btn.click()
        page.wait_for_timeout(300)
        sc_lines = f"{OUTPUT_DIR}/tracks_lines_view.png"
        page.screenshot(path=sc_lines, full_page=True)
        print(f"\nSwitched to Lines view and saved screenshot to {sc_lines}")
    
    # Check Header Button
    header_wiki_btn = page.locator("main a:has-text('Open Research Wiki')")
    header_wiki_link = header_wiki_btn.get_attribute("href") if header_wiki_btn.count() > 0 else ""
    header_wiki_text = header_wiki_btn.inner_text() if header_wiki_btn.count() > 0 else ""
    print(f"\nHeader Action Button: '{header_wiki_text}' -> {header_wiki_link}")
    
    # Check Image Assets
    images = page.locator("img")
    img_count = images.count()
    img_status = []
    for j in range(img_count):
        src = images.nth(j).get_attribute("src")
        natural_w = images.nth(j).evaluate("el => el.naturalWidth")
        img_status.append({"src": src, "naturalWidth": natural_w, "loaded": natural_w > 0})
        print(f"Image asset: {src} -> loaded={natural_w > 0} (naturalWidth={natural_w})")
        
    # Check what happens when navigating to one of the WG links
    test_wg_url = "https://eigenia.nl/wiki?wg=MP-MATH"
    print(f"\nTesting navigation to: {test_wg_url} ...")
    page.goto(test_wg_url, wait_until="networkidle")
    page.wait_for_timeout(500)
    
    wiki_rendered_h1 = page.locator("article h1").first.inner_text() if page.locator("article h1").count() > 0 else ""
    wiki_rendered_badge = page.locator("article span").first.inner_text() if page.locator("article span").count() > 0 else ""
    wiki_breadcrumb = page.locator("nav").first.inner_text() if page.locator("nav").count() > 0 else ""
    
    print(f"Result on /wiki?wg=MP-MATH:")
    print(f"  Rendered H1: {wiki_rendered_h1}")
    print(f"  Rendered Badge: {wiki_rendered_badge}")
    print(f"  Breadcrumb: {wiki_breadcrumb.replace(chr(10), ' > ')}")
    
    browser.close()
    
    report = {
        "status_code": status_code,
        "hero": {
            "title": hero_title,
            "badge": badge_text,
            "desc": hero_desc
        },
        "card_count": card_count,
        "cards": card_data,
        "header_wiki_button": {
            "text": header_wiki_text,
            "href": header_wiki_link
        },
        "images": img_status,
        "test_wg_navigation": {
            "requested_url": test_wg_url,
            "rendered_h1": wiki_rendered_h1,
            "rendered_badge": wiki_rendered_badge,
            "breadcrumb": wiki_breadcrumb
        },
        "console_logs": console_logs
    }
    
    with open(f"{OUTPUT_DIR}/tracks_audit_report.json", "w") as f:
        json.dump(report, f, indent=2)
