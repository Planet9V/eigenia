import asyncio
from playwright.async_api import async_playwright
import os

ARTIFACT_DIR = "/Users/jimmcknney/.gemini/antigravity-ide/brain/7b3860b2-7961-4d45-9602-378368c27c60"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Use device_scale_factor=2 for high-DPI Retina rasterization verification
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

        # Scroll globe into view
        canvas = page.locator('canvas').first
        await canvas.scroll_into_view_if_needed()
        await asyncio.sleep(1.0)

        # 1. Capture Default HD 3D Globe (50m Vector Mesh, Graticules, Spherical Depth)
        s_default = os.path.join(ARTIFACT_DIR, "hd_globe_default.png")
        await page.screenshot(path=s_default, full_page=False)
        print(f"Captured: {s_default}")

        # 2. Select a Country (Germany via Search Input or Inspect button)
        search_input = page.locator('input[placeholder*="Search 249 nations"]').first
        if await search_input.count() > 0:
            await search_input.fill("Germany")
            await asyncio.sleep(0.5)
            de_option = page.locator('button:has-text("Germany")').first
            if await de_option.count() > 0:
                await de_option.click()
                await asyncio.sleep(1.2)

        # Capture selected state: Pure white highlight, drop-shadow glow, and sonar beacon
        s_selected = os.path.join(ARTIFACT_DIR, "hd_globe_selected_white.png")
        await page.screenshot(path=s_selected, full_page=False)
        print(f"Captured: {s_selected}")

        # 3. Close drawer to un-obscure controls
        close_btn = page.locator('button[aria-label="Close drawer"]').first
        if await close_btn.count() > 0:
            await close_btn.click()
            await asyncio.sleep(0.5)

        # 4. Toggle Supply Chain Corridors
        corridor_btn = page.locator('button[data-tour="corridor-toggle-btn"]').first
        if await corridor_btn.count() > 0:
            await corridor_btn.click()
            await asyncio.sleep(1.0)
            s_corridors = os.path.join(ARTIFACT_DIR, "hd_corridors.png")
            await page.screenshot(path=s_corridors, full_page=False)
            print(f"Captured: {s_corridors}")

        # 5. Switch to 2D Flat Earth Projection
        flat_btn = page.locator('button:has-text("2D Flat Earth")').first
        if await flat_btn.count() > 0:
            await flat_btn.click()
            await asyncio.sleep(1.5)
            s_flat = os.path.join(ARTIFACT_DIR, "hd_flat_earth_50m.png")
            await page.screenshot(path=s_flat, full_page=False)
            print(f"Captured: {s_flat}")

        print("Visual verification completed successfully!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
