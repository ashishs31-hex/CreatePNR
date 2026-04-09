import { test, expect } from '@playwright/test';

test('open URL', async ({ page }) => {
    
    const name = process.env.NAME!;
    const source = process.env.SOURCE!;
    const destination = process.env.DESTINATION!;
    const departureDate = process.env.DEPARTURE_DATE!;
    const passengerCount = Number(process.env.PASSENGER_COUNT);

    console.log({ name, source, destination, departureDate, passengerCount });

    await page.goto('${WORKSPACE}/test.htm');
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
