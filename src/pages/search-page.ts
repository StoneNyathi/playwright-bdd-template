import { BasePage } from './base-page';
import { Page } from '@playwright/test';

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page, 'https://www.bbc.co.uk/search?q=sport');
  }

  async open(): Promise<void> {
    await this.navigateToUrl();
  }

  async search(query: string): Promise<void> {
    const searchInput = this.page.locator('input[type="search"]');
    await this.smartFill(searchInput, query);
    await searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async getSearchResults(): Promise<string[]> {
    const resultLocator = this.page.locator('.search-results .ssrcss-1ynlzyd-PromoHeadline');
    return await this.getElementsText(resultLocator);
  }
}