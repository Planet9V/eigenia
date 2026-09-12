import asyncio
from playwright.async_api import async_playwright
import os

ARTIFACT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/7b3860b2-7961-4d45-9602-378368c27c60"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        print("Navigating to http://localhost:4500/jurisdictions...")
        await page.goto("http://localhost:4500/jurisdictions", wait_until="networkidle")
        await asyncio.sleep(3)

        # 1. Capture 3D Globe Hero & Map
        s1 = os.path.join(ARTIFACT_DIR, "jurisdiction_map_3d_globe.png")
        await page.screenshot(path=s1, full_page=False)
        print(f"Captured: {s1}")

        # 2. Click 2D Flat Earth projection button
        # The flat earth button has text "2D Flat" or title "2D Flat Earth Projection"
        flat_btn = page.locator('button:has-text("2D Flat")')
        if await flat_btn.count() > 0:
            await flat_btn.first.click()
            await asyncio.sleep(1.5)
            s2 = os.path.join(ARTIFACT_DIR, "jurisdiction_map_2d_flat.png")
            await page.screenshot(path=s2, full_page=False)
            print(f"Captured: {s2}")

            # Switch back to 3D Globe
            globe_btn = page.locator('button:has-text("3D Globe")')
            if await globe_btn.count() > 0:
                await globe_btn.first.click()
                await asyncio.sleep(1.5)

        # 3. Click 'Inspect' for Germany in the comparison table
        inspect_btn = page.locator('button:has-text("Inspect")').first
        if await inspect_btn.count() > 0:
            await inspect_btn.click()
            await asyncio.sleep(1.2)
            s3 = os.path.join(ARTIFACT_DIR, "jurisdiction_drawer_overview.png")
            await page.screenshot(path=s3, full_page=False)
            print(f"Captured: {s3}")

            # Switch to Cyber & SBOM tab
            cyber_tab = page.locator('button:has-text("Cyber & SBOM")')
            if await cyber_tab.count() > 0:
                await cyber_tab.first.click()
                await asyncio.sleep(0.8)
                s4 = os.path.join(ARTIFACT_DIR, "jurisdiction_drawer_cyber_tab.png")
                await page.screenshot(path=s4, full_page=False)
                print(f"Captured: {s4}")

            # Close drawer
            close_btn = page.locator('button[aria-label="Close drawer"]')
            if await close_btn.count() > 0:
                await close_btn.first.click()
                await asyncio.sleep(0.8)

        # 4. Interact with Facility Impact Simulator
        eval_btn = page.locator('button:has-text("Evaluate & Highlight on Globe")')
        if await eval_btn.count() > 0:
            await eval_btn.first.click()
            await asyncio.sleep(1.2)

        # Full page screenshot
        s_full = os.path.join(ARTIFACT_DIR, "jurisdiction_map_full_page.png")
        await page.screenshot(path=s_full, full_page=True)
        print(f"Captured: {s_full}")

        await browser.close()
        print("Verification finished successfully!")

if __name__ == "__main__":
    asyncio.run(main())
