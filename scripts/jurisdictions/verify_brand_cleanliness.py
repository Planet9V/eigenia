import asyncio
from playwright.async_api import async_playwright
import os

ARTIFACT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/7b3860b2-7961-4d45-9602-378368c27c60"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = await context.new_page()

        print("Navigating to http://localhost:4500/jurisdictions...")
        await page.goto("http://localhost:4500/jurisdictions", wait_until="networkidle")
        await asyncio.sleep(2.5)

        # Dismiss cookie banner if present
        accept_cookies = page.locator('button:has-text("Accept All")').first
        if await accept_cookies.count() > 0:
            await accept_cookies.click()
            await asyncio.sleep(0.5)

        # 1. Capture Hero Section & Command Deck
        page_top = os.path.join(ARTIFACT_DIR, "brand_clean_hero_and_deck.png")
        await page.screenshot(path=page_top, full_page=False)
        print(f"Captured: {page_top}")

        # 2. Scroll to Map and Capture High-Res Globe with Unified Command Deck
        canvas = page.locator('canvas').first
        await canvas.scroll_into_view_if_needed()
        await asyncio.sleep(1.2)
        globe_view = os.path.join(ARTIFACT_DIR, "brand_clean_globe_deck.png")
        await page.screenshot(path=globe_view, full_page=False)
        print(f"Captured: {globe_view}")

        # 3. Search and Select Germany to open Dossier Drawer & view Dutch Orange Beacon
        search_input = page.locator('input[placeholder*="Search 249 nations"]').first
        if await search_input.count() > 0:
            await search_input.fill("Germany")
            await asyncio.sleep(0.6)
            de_option = page.locator('button:has-text("Germany")').first
            if await de_option.count() > 0:
                await de_option.click()
                await asyncio.sleep(1.5)

        drawer_view = os.path.join(ARTIFACT_DIR, "brand_clean_dossier_drawer.png")
        await page.screenshot(path=drawer_view, full_page=False)
        print(f"Captured: {drawer_view}")

        # Close drawer
        close_btn = page.locator('button[aria-label="Close drawer"]').first
        if await close_btn.count() > 0:
            await close_btn.click()
            await asyncio.sleep(0.6)

        # 4. Open Bilateral Comparator Modal
        compare_btn = page.locator('button:has-text("Compare")').first
        if await compare_btn.count() > 0:
            await compare_btn.click()
            await asyncio.sleep(1.2)
            comparator_view = os.path.join(ARTIFACT_DIR, "brand_clean_comparator.png")
            await page.screenshot(path=comparator_view, full_page=False)
            print(f"Captured: {comparator_view}")

            # Close comparator modal
            dismiss_comp = page.locator('button:has-text("Dismiss Comparator")').first
            if await dismiss_comp.count() > 0:
                await dismiss_comp.click()
                await asyncio.sleep(0.8)
            else:
                close_comp = page.locator('button[aria-label="Close comparator"]').first
                if await close_comp.count() > 0:
                    await close_comp.click()
                    await asyncio.sleep(0.8)
                else:
                    await page.keyboard.press("Escape")
                    await asyncio.sleep(0.8)

        # 5. Scroll down to Master Regulatory Table
        table_header = page.locator('h2:has-text("Anchor Regulatory Frameworks")').first
        if await table_header.count() > 0:
            await table_header.scroll_into_view_if_needed()
            await asyncio.sleep(1.0)
            table_view = os.path.join(ARTIFACT_DIR, "brand_clean_master_table.png")
            await page.screenshot(path=table_view, full_page=False)
            print(f"Captured: {table_view}")

        print("Visual verification completed!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
