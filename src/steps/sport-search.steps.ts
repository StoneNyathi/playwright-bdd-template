import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SearchPage, SearchResult } from '../pages/search-page';
import { TestContext } from '../utils/test-context';

Given('I am on the BBC website', async function (this: TestContext) {
  this.searchPage = new SearchPage(this.page);
  await this.searchPage.navigateToUrl('/');
});

Given('I am on the search page', async function (this: TestContext) {
  this.searchPage = new SearchPage(this.page);
  await this.searchPage.navigateToSearch();
});

Given('I perform a search for {string}', async function (this: TestContext, query: string) {
  await this.searchPage.performSearch(query);
});

Given('I search for {string} content', async function (this: TestContext, query: string) {
  await this.searchPage.performSearch(query);
});

When('I search for {string}', async function (this: TestContext, query: string) {
  await this.searchPage.performSearch(query);
  this.searchQuery = query;
});

When('I examine the returned results', async function (this: TestContext) {
  this.searchResults = await this.searchPage.getSearchResults();
});

When('I review the search results layout', async function (this: TestContext) {
  this.searchResults = await this.searchPage.getSearchResults();
});

Then('I should see at least {int} search results', async function (this: TestContext, minResults: number) {
  const hasMinResults = await this.searchPage.hasMinimumResults(minResults);
  expect(hasMinResults).toBe(true);
  
  const actualCount = await this.searchPage.getSearchResultsCount();
  expect(actualCount).toBeGreaterThanOrEqual(minResults);
});

Then('each result should be relevant to sport content', async function (this: TestContext) {
  const isRelevant = await this.searchPage.verifySearchResultsRelevance(this.searchQuery);
  expect(isRelevant).toBe(true);
});

Then('each result should contain a title and description', async function (this: TestContext) {
  for (const result of this.searchResults) {
    expect(result.title).toBeTruthy();
    expect(result.description).toBeTruthy();
    expect(result.title.length).toBeGreaterThan(5);
    expect(result.description.length).toBeGreaterThan(10);
  }
});

Then('results should include various content types', async function (this: TestContext) {
  const contentTypes = this.searchResults.map(result => {
    if (result.url.includes('/video')) return 'video';
    if (result.url.includes('/audio')) return 'audio';
    if (result.url.includes('/live')) return 'live';
    return 'article';
  });
  
  const uniqueTypes = new Set(contentTypes);
  expect(uniqueTypes.size).toBeGreaterThan(1);
});

Then('the results should include diverse sport categories', async function (this: TestContext) {
  const sportKeywords = ['football', 'tennis', 'cricket', 'rugby', 'athletics', 'swimming', 'f1', 'formula'];
  let categoriesFound = 0;
  
  for (const keyword of sportKeywords) {
    const hasCategory = this.searchResults.some(result => 
      result.title.toLowerCase().includes(keyword) || 
      result.description.toLowerCase().includes(keyword)
    );
    if (hasCategory) categoriesFound++;
  }
  
  expect(categoriesFound).toBeGreaterThan(1);
});

Then('each result should have a clear headline', async function (this: TestContext) {
  for (const result of this.searchResults) {
    expect(result.title).toMatch(/^[A-Z]/); // Starts with capital letter
    expect(result.title.length).toBeLessThan(200); // Reasonable length
    expect(result.title.length).toBeGreaterThan(5); // Not too short
  }
});

Then('results should span different time periods in 2023', async function (this: TestContext) {
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                 'july', 'august', 'september', 'october', 'november', 'december'];
  
  let monthsFound = 0;
  for (const month of months) {
    const hasMonth = this.searchResults.some(result =>
      result.title.toLowerCase().includes(month) ||
      result.description.toLowerCase().includes(month)
    );
    if (hasMonth) monthsFound++;
  }
  
  // Expect at least 2 different months to be represented
  expect(monthsFound).toBeGreaterThanOrEqual(2);
});

Then('I should see articles, reports, and media content', async function (this: TestContext) {
  const contentIndicators = {
    articles: ['article', 'story', 'news'],
    reports: ['report', 'analysis', 'review'],
    media: ['video', 'audio', 'gallery', 'photo']
  };
  
  const foundTypes = new Set();
  
  for (const [type, indicators] of Object.entries(contentIndicators)) {
    const hasType = this.searchResults.some(result =>
      indicators.some(indicator =>
        result.title.toLowerCase().includes(indicator) ||
        result.description.toLowerCase().includes(indicator) ||
        result.url.toLowerCase().includes(indicator)
      )
    );
    if (hasType) foundTypes.add(type);
  }
  
  expect(foundTypes.size).toBeGreaterThanOrEqual(2);
});

Then('the search results count should be displayed', async function (this: TestContext) {
  const count = await this.searchPage.getSearchResultsCount();
  expect(count).toBeGreaterThan(0);
});

Then('each result should be properly structured with headings', async function (this: TestContext) {
  for (const result of this.searchResults) {
    expect(result.title).toBeTruthy();
    expect(result.title.length).toBeGreaterThan(0);
  }
});

Then('search results should be keyboard navigable', async function (this: TestContext) {
  // Focus first result and check if it's focusable
  const firstResult = this.searchPage.resultItems.first();
  await firstResult.focus();
  const isFocused = await firstResult.evaluate(el => document.activeElement === el);
  expect(isFocused).toBe(true);
});

Then('results should have appropriate ARIA labels', async function (this: TestContext) {
  const areAccessible = await this.searchPage.areResultsAccessible();
  expect(areAccessible).toBe(true);
});

Then('the total count of results should be visible to screen readers', async function (this: TestContext) {
  const countElement = this.searchPage.resultCount;
  const isVisible = await countElement.isVisible();
  const hasAriaLabel = await countElement.getAttribute('aria-label') !== null;
  
  expect(isVisible || hasAriaLabel).toBe(true);
});