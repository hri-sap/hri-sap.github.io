import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { notes } from '../src/data/site';

test('content, metadata, and all link destinations are complete', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Hrishav Sapkota — Projects & Perspectives');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('.project')).toHaveCount(4);
  if (notes.length === 0) {
    await expect(page.locator('.empty-description')).toContainText('Nothing published yet');
  } else {
    await expect(page.locator('.note')).toHaveCount(notes.length);
    for (const note of notes) {
      const entry = page.locator(`#note-${note.slug}`);
      await entry.locator('summary').click();
      await expect(entry).toHaveAttribute('open', '');
      await expect(entry.locator('.note-body')).toContainText(note.paragraphs[0]);
      await entry.locator('summary').click();
      await expect(entry).not.toHaveAttribute('open', '');
    }
  }
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://hri-sap.github.io/');
  const links = await page.locator('a').evaluateAll((anchors) =>
    anchors.map((anchor) => ({ href: anchor.getAttribute('href'), text: anchor.textContent?.trim() })),
  );
  for (const link of links) {
    expect(link.text).toBeTruthy();
    expect(link.href).toBeTruthy();
    if (link.href?.startsWith('#')) {
      expect(link.href.length).toBeGreaterThan(1);
      await expect(page.locator(link.href)).toHaveCount(1);
    } else {
      expect(link.href).toMatch(/^https:\/\/github\.com\/hri-sap(?:[/?]|$)/);
    }
  }
  for (const path of ['/favicon.svg', '/social-card.png', '/robots.txt', '/sitemap.xml']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  expect(errors).toEqual([]);
});

test('passes WCAG AA automated accessibility checks', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('navigation and keyboard skip link work', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole('navigation').getByRole('link', { name: 'Notes', exact: true }).click();
  await expect(page).toHaveURL(/#notes$/);
  await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await page.getByRole('link', { name: 'Back to top', exact: true }).click();
  await expect(page).toHaveURL(/#top$/);
});

test('no horizontal overflow at narrow, tablet, and wide widths', async ({ page }) => {
  for (const width of [320, 375, 390, 600, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(dimensions.document, `overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('reduced motion disables scrolling and reveal animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(page.locator('.about-copy')).toBeVisible();
});

test('all content and navigation work without JavaScript', async ({ browser, viewport }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.locator('.project')).toHaveCount(4);
  await page.getByRole('navigation').getByRole('link', { name: 'Notes', exact: true }).click();
  await expect(page).toHaveURL(/#notes$/);
  await expect(page.locator('#notes-heading')).toBeInViewport();
  await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator('#about-heading')).toBeInViewport();
  await context.close();
});
