import { expect } from '@playwright/test';
import { Server } from 'bun';
import { afterAll, beforeAll, describe, test } from 'bun:test';
import { Browser, chromium } from 'playwright';

describe('browser', () => {
  let browser: Browser;
  let server: Server;

  beforeAll(async () => {
    // Bundle the SVG functions for the browser
    const { success, logs } = await Bun.build({
      entrypoints: ['./src/helpers/__test__/test-bundle.ts'],
      outdir: './src/helpers/__test__'
    });

    console.log('bundle logs', success, logs);

    browser = await chromium.launch();

    // Create a basic Bun server
    server = Bun.serve({
      port: 4512,
      fetch: async req => {
        const url = new URL(req.url);

        // Serve the HTML file
        if (url.pathname === '/') {
          const html = await Bun.file(
            './src/helpers/__test__/test.html'
          ).text();
          return new Response(html, {
            headers: { 'Content-Type': 'text/html' }
          });
        }

        // Serve the bundled JavaScript
        if (url.pathname === '/test-bundle.js') {
          const js = await Bun.file(
            './src/helpers/__test__/test-bundle.js'
          ).text();
          return new Response(js, {
            headers: { 'Content-Type': 'application/javascript' }
          });
        }

        return new Response('Not found', { status: 404 });
      }
    });
  });

  test('center', async () => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:4512');

    page.on('console', msg => console.log('[browser]', msg.text()));

    const result = await page.evaluate(`
      const svg = \`
        <svg width="100" height="50">
          <path d="M0 0 L10 10" />
          <rect x="0" y="0" width="20" height="10" />
        </svg>
      \`;


      console.log('svg', svg);
      
      // Insert the SVG into the page
      const container = document.getElementById('test-container');
      container.innerHTML = svg;
      
      // Get the SVG element
      const svgElement = container.querySelector('svg');
      
      
      // Use your SVG helper functions
      // const centered = window.svgHelpers.centerSvgGeometry(svgElement);
      const flattened = window.svgHelpers.flattenSvg(svgElement);

      window.svgHelpers.centerSvgGeometry(flattened);

      new XMLSerializer().serializeToString(flattened);
      // flattened;
    `);

    console.log('result', result);
    expect(result).toContain('svg');
    // Add more specific assertions based on what center() should do
  });

  afterAll(async () => {
    await browser.close();
    server.stop();
  });
});
