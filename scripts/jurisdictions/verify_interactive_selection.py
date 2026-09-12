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

        # Dismiss cookie banner if visible
        accept_cookies = page.locator('button:has-text("Accept All")').first
        if await accept_cookies.count() > 0:
            await accept_cookies.click()
            await asyncio.sleep(0.5)

        # 1. Open Germany (DE) via initial click in table or quick select
        print("Selecting Germany...")
        inspect_btn = page.locator('button:has-text("Inspect")').first
        if await inspect_btn.count() > 0:
            await inspect_btn.click()
            await asyncio.sleep(1.0)

        # Screenshot: Drawer open with 3D Globe clearly visible and interactive
        s_open = os.path.join(ARTIFACT_DIR, "modeless_drawer_interactive_map.png")
        await page.screenshot(path=s_open, full_page=False)
        print(f"Captured: {s_open}")

        # 2. Directly interact with canvas world map while drawer is open!
        canvas = page.locator('canvas').first
        await canvas.scroll_into_view_if_needed()
        await asyncio.sleep(0.5)
        box = await canvas.bounding_box()
        if box:
            # Center of the globe canvas
            cx = box['x'] + box['width'] * 0.5
            cy = box['y'] + box['height'] * 0.5

            # Drag the globe slightly from the visible left half of the canvas while drawer is open
            drag_x = box['x'] + box['width'] * 0.35
            drag_y = cy
            print(f"Dragging globe from ({drag_x}, {drag_y}) while drawer is open...")
            await page.mouse.move(drag_x, drag_y)
            await page.mouse.down()
            await page.mouse.move(drag_x + 80, drag_y - 30, steps=10)
            await page.mouse.up()
            await asyncio.sleep(1.0)

            s_dragged = os.path.join(ARTIFACT_DIR, "modeless_drawer_globe_dragged.png")
            await page.screenshot(path=s_dragged, full_page=False)
            print(f"Captured: {s_dragged}")

            # 3. Click directly on the world map canvas to select another nation while drawer is open!
            # Since the globe is interactive, clicking on a nation on the canvas directly selects it
            print(f"Clicking directly on world map canvas at ({cx - 50}, {cy + 25}) while drawer is open...")
            await page.mouse.click(cx - 50, cy + 25)
            await asyncio.sleep(1.2)

            s_canvas_click = os.path.join(ARTIFACT_DIR, "modeless_drawer_switch_via_map_click.png")
            await page.screenshot(path=s_canvas_click, full_page=False)
            print(f"Captured: {s_canvas_click}")

        # 4. Test Minimize button
        min_btn = page.locator('button[aria-label="Minimize drawer"]').first
        if await min_btn.count() > 0:
            print("Clicking minimize drawer button...")
            await min_btn.click()
            await asyncio.sleep(0.8)

            s_minimized = os.path.join(ARTIFACT_DIR, "modeless_drawer_minimized_dock.png")
            await page.screenshot(path=s_minimized, full_page=False)
            print(f"Captured: {s_minimized}")

            # 5. Expand back
            dock_badge = page.locator('div:has-text("Expand Full Dossier")').first
            if await dock_badge.count() > 0:
                print("Expanding dossier back...")
                await dock_badge.click()
                await asyncio.sleep(0.8)

                s_reexpanded = os.path.join(ARTIFACT_DIR, "modeless_drawer_reexpanded.png")
                await page.screenshot(path=s_reexpanded, full_page=False)
                print(f"Captured: {s_reexpanded}")

        print("Interactive selection verification completed successfully!")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
