export class TestHelpers {
  static async waitForResults(page: any, selector: string, timeout = 10000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }
  
  static formatDriverName(name: string): string {
    return name.trim().replace(/\s+/g, ' ');
  }
  
  static isValidSearchResult(result: any): boolean {
    return result.title && result.description && result.title.length > 0;
  }
  
  static extractPositionNumber(positionText: string): number {
    const match = positionText.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}