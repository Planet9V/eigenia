import asyncio
import json
import os
from playwright.async_api import async_playwright

OUTPUT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/live_font_audits"
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGES = [
    {"name": "home", "url": "https://eigenia.nl/"},
    {"name": "mission", "url": "https://eigenia.nl/mission"},
    {"name": "physics", "url": "https://eigenia.nl/physics"},
    {"name": "collaborate", "url": "https://eigenia.nl/collaborate"},
    {"name": "paper_cdt1", "url": "https://eigenia.nl/papers/cdt-series-1"},
]

async def audit():
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        for item in PAGES:
            print(f"Auditing {item['name']} ({item['url']})...")
            await page.goto(item["url"], wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(1000)

            # Inspect computed font-family
            font_info = await page.evaluate('''() => {
                const getFont = (selector) => {
                    const el = document.querySelector(selector);
                    if (!el) return null;
                    const style = window.getComputedStyle(el);
                    return {
                        fontFamily: style.fontFamily,
                        fontWeight: style.fontWeight,
                        letterSpacing: style.letterSpacing,
                        fontSize: style.fontSize,
                        text: el.innerText.trim().slice(0, 50)
                    };
                };

                return {
                    h1: getFont("h1"),
                    h2: getFont("h2"),
                    h3: getFont("h3"),
                    p: getFont("p"),
                    mono: getFont(".font-mono, code, .katex")
                };
            }''')

            # Screenshot
            shot_path = f"{OUTPUT_DIR}/{item['name']}_live_fonts.png"
            await page.screenshot(path=shot_path, full_page=False)

            results.append({
                "page": item["name"],
                "url": item["url"],
                "font_info": font_info,
                "screenshot": shot_path
            })

        await browser.close()

    print("\n--- AUDIT RESULTS ---")
    print(json.dumps(results, indent=2))
    with open(f"{OUTPUT_DIR}/results.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    asyncio.run(audit())
