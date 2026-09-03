import os
import sys
from playwright.sync_api import sync_playwright

def verify_live_pages():
    print("Connecting to live site https://eigenia.nl ...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # 1. Verify /physics
        print("\n=== Auditing https://eigenia.nl/physics ===")
        page.goto("https://eigenia.nl/physics", wait_until="networkidle")
        page.wait_for_timeout(1000)
        
        # Check hero
        hero = page.locator("section.dark").first
        hero_box = hero.bounding_box()
        print(f"Physics Hero bounding box: {hero_box}")
        
        # Check quick jump cards
        quick_cards = page.locator("section:has-text('Actuarial Cyber Catastrophe Engine') a").all()
        print(f"Physics Quick jump cards count: {len(quick_cards)}")
        
        os.makedirs("audit_fixed_heroes", exist_ok=True)
        page.screenshot(path="audit_fixed_heroes/live_physics_fixed.png", full_page=True)
        print("Captured audit_fixed_heroes/live_physics_fixed.png")

        # 2. Verify /collaborate
        print("\n=== Auditing https://eigenia.nl/collaborate ===")
        page.goto("https://eigenia.nl/collaborate", wait_until="networkidle")
        page.wait_for_timeout(1000)
        
        # Check hero
        collab_hero = page.locator("section.dark").first
        collab_hero_box = collab_hero.bounding_box()
        print(f"Collaborate Hero bounding box: {collab_hero_box}")
        
        # Check 4 pathway cards
        pathway_cards = page.locator("section:has-text('Four Ways to Engage') .rounded-2xl").all()
        print(f"Collaborate Pathway cards count: {len(pathway_cards)}")
        for idx, card in enumerate(pathway_cards):
            op = card.evaluate("el => window.getComputedStyle(el).opacity")
            txt = card.inner_text()[:40].replace("\n", " ")
            print(f"  Pathway {idx}: opacity={op} | {txt}")
            
        # Check form
        form_count = page.locator("form").count()
        form_op = page.locator("form").evaluate("el => window.getComputedStyle(el).opacity") if form_count > 0 else "0"
        print(f"Collaborate Form count: {form_count} | opacity: {form_op}")
        
        page.screenshot(path="audit_fixed_heroes/live_collaborate_fixed.png", full_page=True)
        print("Captured audit_fixed_heroes/live_collaborate_fixed.png")

        browser.close()

if __name__ == "__main__":
    verify_live_pages()
