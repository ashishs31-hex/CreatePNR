import { test, expect } from '@playwright/test';

test('open URL', async ({ page }) => {
    await page.goto('file:///C:/Users/2000178773/OneDrive%20-%20Hexaware%20Technologies/Desktop/test.htm');
    await page.fill('input[id="name"]', 'Ashish');
    await expect(page.locator('input[id="name"]')).toHaveValue('Ashish');
    await page.fill('input[id="from"]', 'toronto');
    await expect(page.locator('input[id="from"]')).toHaveValue('toronto');
    await page.fill('input[id="to"]', 'delhi');
    await expect(page.locator('input[id="to"]')).toHaveValue('delhi');
    await page.fill('input[id="date"]', '2026-12-11');
    await expect(page.locator('input[id="date"]')).toHaveValue('2026-12-11');
    await page.getByText('Generate Test PNR').click();
    await expect(page.locator('span[id="outPNR"]')).toBeVisible();
    const pnrText = await page.locator('span[id="outPNR"]').textContent();
    console.log('PNR Text:', pnrText);
});
