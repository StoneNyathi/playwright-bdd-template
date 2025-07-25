import { beforeAll, afterAll } from '@playwright/test';
import { chromium } from 'playwright';

export const page = await chromium.launch();

beforeAll(async () => {
  await page.goto('/');
});

afterAll(async () => {
  await page.close();
});