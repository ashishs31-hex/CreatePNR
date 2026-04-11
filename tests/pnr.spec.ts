import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('open URL', async ({ page }) => {

    const name = process.env.NAME!;
    const source = process.env.SOURCE!;
    const destination = process.env.DESTINATION!;
    const departureDate = process.env.DEPARTURE_DATE!;
    const passengerCount = Number(process.env.PASSENGER_COUNT);

    const filePath = path.resolve(__dirname, '..', 'test.htm');
    await page.goto(`file://${filePath}`);

    await page.fill('input[id="name"]', name);
    await expect(page.locator('input[id="name"]')).toHaveValue(name);

    await page.fill('input[id="from"]', source);
    await expect(page.locator('input[id="from"]')).toHaveValue(source);

    await page.fill('input[id="to"]', destination);
    await expect(page.locator('input[id="to"]')).toHaveValue(destination);

    await page.fill('input[id="date"]', departureDate);
    await expect(page.locator('input[id="date"]')).toHaveValue(departureDate);

    await page.getByText('Generate Test PNR').click();

    await expect(page.locator('span[id="outPNR"]')).toBeVisible();

    const pnrText = (await page.locator('span[id="outPNR"]').textContent())?.trim();

    // ✅ Create JSON that Copilot can read
    const output = {
        pnr: pnrText
    };

    // ✅ Write JSON file
    fs.writeFileSync('pnr.json', JSON.stringify(output, null, 2));

    console.log('PNR generated:', pnrText);
});
``
