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
        await asyncio.sleep(2.0)

        # Dismiss cookie preferences banner if visible
        try:
            cookie_accept = page.locator('button:has-text("Accept All"), button:has-text("Accept")').first
            if await cookie_accept.count() > 0:
                await cookie_accept.click()
                await asyncio.sleep(0.5)
        except Exception:
            pass

        # 1. Capture Globe with Corridors enabled
        s_corridors = os.path.join(ARTIFACT_DIR, "next_wave_corridors_globe.png")
        await page.screenshot(path=s_corridors, full_page=False)
        print(f"Captured: {s_corridors}")

        # 2. Launch Interactive Showcase Tour
        print("Launching Interactive Showcase Tour...")
        tour_btn = page.locator('[data-tour="tour-launcher-btn"]').first
        if await tour_btn.count() > 0:
            await tour_btn.click()
            await asyncio.sleep(1.0)
            
            s_tour_1 = os.path.join(ARTIFACT_DIR, "next_wave_tour_step1.png")
            await page.screenshot(path=s_tour_1, full_page=False)
            print(f"Captured: {s_tour_1}")

            # Advance to Step 2
            next_btn = page.locator('button:has-text("Next")')
            if await next_btn.count() > 0:
                await next_btn.first.click()
                await asyncio.sleep(1.0)
                s_tour_2 = os.path.join(ARTIFACT_DIR, "next_wave_tour_step2.png")
                await page.screenshot(path=s_tour_2, full_page=False)
                print(f"Captured: {s_tour_2}")

            # Close Tour using Exit Tour button or Escape
            exit_btn = page.locator('button[aria-label="Exit tour"]')
            if await exit_btn.count() > 0:
                await exit_btn.first.click()
                await asyncio.sleep(1.0)
            else:
                await page.keyboard.press("Escape")
                await asyncio.sleep(1.0)

        # 3. Open Bilateral Regulatory Delta Comparator
        print("Opening Bilateral Comparator Modal...")
        compare_btn = page.locator('[data-tour="compare-launcher-btn"]').first
        if await compare_btn.count() > 0:
            await compare_btn.click()
            await asyncio.sleep(1.2)

            s_comparator = os.path.join(ARTIFACT_DIR, "next_wave_bilateral_comparator.png")
            await page.screenshot(path=s_comparator, full_page=False)
            print(f"Captured: {s_comparator}")

            # Click Preset 2: North Sea vs Southeast Asia
            preset_btn = page.locator('button:has-text("North Sea vs Southeast Asia")')
            if await preset_btn.count() > 0:
                await preset_btn.first.click()
                await asyncio.sleep(0.8)
                s_comparator_p2 = os.path.join(ARTIFACT_DIR, "next_wave_bilateral_comparator_preset2.png")
                await page.screenshot(path=s_comparator_p2, full_page=False)
                print(f"Captured: {s_comparator_p2}")

            # Close comparator modal using header close button or Escape
            close_icon = page.locator('button[aria-label="Close comparator"]')
            if await close_icon.count() > 0:
                await close_icon.first.click()
                await asyncio.sleep(0.8)
            else:
                await page.keyboard.press("Escape")
                await asyncio.sleep(0.8)

        # 4. Inspect Germany (DE) in the Comparison Table to test Checklist and Export
        print("Opening Germany Dossier Drawer...")
        inspect_btn = page.locator('button:has-text("Inspect")').first
        if await inspect_btn.count() > 0:
            await inspect_btn.click()
            await asyncio.sleep(1.2)

            s_dossier_checklist = os.path.join(ARTIFACT_DIR, "next_wave_dossier_checklist.png")
            await page.screenshot(path=s_dossier_checklist, full_page=False)
            print(f"Captured: {s_dossier_checklist}")

            # Close drawer
            close_drawer = page.locator('button[aria-label="Close drawer"]')
            if await close_drawer.count() > 0:
                await close_drawer.first.click()
                await asyncio.sleep(0.8)

        # 5. Open Keyboard Shortcuts Modal
        print("Opening Keyboard Shortcuts Helper...")
        kb_btn = page.locator('button[title="Keyboard Shortcuts (?)"]')
        if await kb_btn.count() > 0:
            await kb_btn.first.click()
            await asyncio.sleep(0.8)

            s_shortcuts = os.path.join(ARTIFACT_DIR, "next_wave_keyboard_shortcuts.png")
            await page.screenshot(path=s_shortcuts, full_page=False)
            print(f"Captured: {s_shortcuts}")

            # Press Escape to close
            await page.keyboard.press("Escape")
            await asyncio.sleep(0.5)

        print("Verification completed successfully!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
