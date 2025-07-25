import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../hooks';

Given('I am on the BBC Sport race results page', async () => {
  await page.goto('https://www.bbc.co.uk/sport/formula1/results');
});

Then('the results table should show:', async (dataTable: any) => {
  const expectedResults = dataTable.hashes();
  for (const row of expectedResults) {
    const position = row.Position;
    const driver = row.Driver;
    const cellText = await page
      .locator(`//table//tr[td[contains(., '${position}')]]/td[2]`)
      .textContent();
    expect(cellText.trim()).toEqual(driver);
  }
});