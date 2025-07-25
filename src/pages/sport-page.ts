import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SportPage extends BasePage {
  readonly sportNavLink: Locator;
  readonly f1Section: Locator;
  readonly searchButton: Locator;
  readonly raceResultsTable: Locator;
  readonly resultsRows: Locator;
  readonly podiumSection: Locator;

  constructor(page: Page) {
    super(page);
    this.sportNavLink = page.locator('nav a[href*="sport"]');
    this.f1Section = page.locator('[data-testid="f1-section"], a[href*="formula1"]');
    this.searchButton = page.locator('[data-testid="search-button"], .search-button');
    this.raceResultsTable = page.locator('[data-testid="race-results"], .race-results-table, table');
    this.resultsRows = page.locator('table tbody tr, .result-row');
    this.podiumSection = page.locator('[data-testid="podium"], .podium-results');
  }

  async navigateToSport(): Promise<void> {
    await this.navigateToUrl('/sport');
  }

  async goToF1Section(): Promise<void> {
    await this.clickElement(this.f1Section);
  }

  async searchForRace(searchTerm: string): Promise<void> {
    const searchInput = this.page.locator('input[type="search"], [data-testid="search-input"]');
    await this.clickElement(this.searchButton);
    await this.fillInput(searchInput, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async getRaceResults(): Promise<RaceResult[]> {
    await this.waitForElement(this.raceResultsTable);
    
    const results: RaceResult[] = [];
    const rowCount = await this.resultsRows.count();
    
    for (let i = 0; i < Math.min(rowCount, 3); i++) {
      const row = this.resultsRows.nth(i);
      const position = await row.locator('td:nth-child(1), .position').textContent();
      const driver = await row.locator('td:nth-child(2), .driver-name').textContent();
      const team = await row.locator('td:nth-child(3), .team-name').textContent();
      
      results.push({
        position: position?.trim() || '',
        driver: driver?.trim() || '',
        team: team?.trim() || ''
      });
    }
    
    return results;
  }

  async verifyPodiumFinisher(position: number, expectedDriver: string): Promise<boolean> {
    const podiumDriver = this.page.locator(`[data-position="${position}"] .driver-name, .position-${position} .driver`);
    const driverText = await this.getElementText(podiumDriver);
    return driverText.toLowerCase().includes(expectedDriver.toLowerCase());
  }

  async isResultsTableDisplayed(): Promise<boolean> {
    return await this.raceResultsTable.isVisible();
  }
}

export interface RaceResult {
  position: string;
  driver: string;
  team: string;
}