import puppeteer from 'puppeteer-core';
import path from 'path';

const artifactDir = 'C:\\Users\\krish\\.gemini\\antigravity\\brain\\0b7b9021-e7ca-45f7-8012-1b745173b7e4';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  // Get position of #proficiency section in document
  const profBounds = await page.evaluate(() => {
    const el = document.querySelector('#proficiency');
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: rect.height
    };
  });

  console.log('Proficiency section document bounds:', profBounds);

  // Pinned scroll range is from profBounds.top to profBounds.top + profBounds.height - viewportHeight
  const pinnedScrollDistance = profBounds.height - 900;

  // We will scroll to 8 distinct scroll positions to test all 8 individual items!
  const scrollSteps = [
    { label: 'item-0-drafting', offsetFactor: 0.05 },
    { label: 'item-1-3d-modelling', offsetFactor: 0.16 },
    { label: 'item-2-documentation', offsetFactor: 0.28 },
    { label: 'item-3-graphics', offsetFactor: 0.39 },
    { label: 'item-4-3d-rendering', offsetFactor: 0.50 },
    { label: 'item-5-others', offsetFactor: 0.62 },
    { label: 'item-6-languages', offsetFactor: 0.73 },
    { label: 'item-7-soft-skills', offsetFactor: 0.84 },
  ];

  for (const step of scrollSteps) {
    const targetScrollY = Math.round(profBounds.top + pinnedScrollDistance * step.offsetFactor);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), targetScrollY);
    await new Promise(r => setTimeout(r, 600));

    const state = await page.evaluate(() => {
      const activeNumberEl = document.querySelector('#proficiency .text-\\[\\#1d1d1f\\].font-extrabold.leading-none');
      const activeTitleEl = document.querySelector('#proficiency h3.uppercase');
      const stickyDiv = document.querySelector('#proficiency .sticky');
      const sRect = stickyDiv ? stickyDiv.getBoundingClientRect() : null;

      // Find active dot or rotating group transform
      const rotGroup = document.querySelector('#proficiency svg g[transform*="rotate"]');

      return {
        scrollY: window.scrollY,
        stickyTop: sRect ? sRect.top : null,
        activeNumber: activeNumberEl ? activeNumberEl.textContent.trim() : null,
        activeTitle: activeTitleEl ? activeTitleEl.textContent.trim() : null,
        rotationTransform: rotGroup ? rotGroup.getAttribute('transform') : null
      };
    });

    console.log(`Step ${step.label} at scrollY ${targetScrollY}:`, state);
    await page.screenshot({ path: path.join(artifactDir, `prof-${step.label}.png`) });
  }

  await browser.close();
}

run().catch(console.error);
