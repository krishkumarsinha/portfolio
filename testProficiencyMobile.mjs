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
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  const profBounds = await page.evaluate(() => {
    const el = document.querySelector('#proficiency');
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: rect.height
    };
  });

  console.log('Mobile Proficiency bounds:', profBounds);
  const pinnedScrollDistance = profBounds.height - 844;

  const scrollSteps = [
    { label: 'mob-0-drafting', offsetFactor: 0.05 },
    { label: 'mob-3-graphics', offsetFactor: 0.39 },
    { label: 'mob-7-soft-skills', offsetFactor: 0.84 },
  ];

  for (const step of scrollSteps) {
    const targetScrollY = Math.round(profBounds.top + pinnedScrollDistance * step.offsetFactor);
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), targetScrollY);
    await new Promise(r => setTimeout(r, 600));

    const state = await page.evaluate(() => {
      const activeNumberEl = document.querySelector('#proficiency .text-4xl.sm\\:text-5xl');
      const activeTitleEl = document.querySelector('#proficiency h3.uppercase');
      return {
        scrollY: window.scrollY,
        activeNumber: activeNumberEl ? activeNumberEl.textContent.trim() : null,
        activeTitle: activeTitleEl ? activeTitleEl.textContent.trim() : null,
      };
    });

    console.log(`Mobile step ${step.label}:`, state);
    await page.screenshot({ path: path.join(artifactDir, `prof-${step.label}.png`) });
  }

  await browser.close();
}

run().catch(console.error);
