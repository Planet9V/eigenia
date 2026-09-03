import asyncio
import json
import os
from playwright.async_api import async_playwright

OUTPUT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/ec0210c2-7593-43d1-ba7b-20fba8fe86ce/lacanian_live_verification"
os.makedirs(OUTPUT_DIR, exist_ok=True)

TARGETS = [
    {
        "name": "paper_lacanian",
        "url": "https://eigenia.nl/papers/lacanian-psychohistory-framework",
    },
    {
        "name": "theory_lacanian",
        "url": "https://eigenia.nl/theory/mckenney-lacan-psychometric-tensor",
    }
]

async def verify():
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 1100})
        page = await context.new_page()

        for t in TARGETS:
            print(f"Loading {t['url']}...")
            resp = await page.goto(t["url"], wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(1000)

            # Check if formula and content are present
            info = await page.evaluate('''() => {
                const bodyText = document.body.innerText;
                const hasCalculus = bodyText.includes("The McKenney-Lacan Calculus");
                const hasWhyLacan = bodyText.includes("Why Lacan?");
                const hasPsychometricTensor = bodyText.includes("The Psychometric Tensor");
                const hasKronecker = bodyText.includes("Kronecker product");
                const katexElements = document.querySelectorAll(".katex, .katex-display");

                return {
                    hasCalculus,
                    hasWhyLacan,
                    hasPsychometricTensor,
                    hasKronecker,
                    katexCount: katexElements.length,
                    title: document.title
                };
            }''')

            shot_path = f"{OUTPUT_DIR}/{t['name']}.png"
            await page.screenshot(path=shot_path, full_page=False)

            results.append({
                "target": t["name"],
                "url": t["url"],
                "status": resp.status,
                "info": info,
                "screenshot": shot_path
            })

        await browser.close()

    print("\n--- RESULTS ---")
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    asyncio.run(verify())
