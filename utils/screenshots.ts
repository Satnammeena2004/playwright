import { Page } from '@playwright/test';

export async function takeScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({
        path: `screenshots/${name}-${Date.now()}.png`,
        fullPage: true
    });
}