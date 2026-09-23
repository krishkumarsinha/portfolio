import puppeteer from 'puppeteer-core';
import path from 'path';

const mediaDir = 'C:\\Users\\krish\\.gemini\\antigravity\\brain\\ee4befc1-5816-4d2d-b30a-a632b043403b\\media';
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
  await page.evaluate(() => window.scrollTo(0, 1050));
  await new Promise(r => setTimeout(r, 600));

  // Option 1: Centered inside the shape (reset from left edge to center)
  await page.evaluate(() => {
    const photoContainer = document.querySelector('img[alt*="Krish"]').closest('.pointer-events-none');
    if (photoContainer) {
      photoContainer.className = photoContainer.className.replace('justify-start', 'justify-center');
      photoContainer.style.transform = 'none';
    }
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(mediaDir, 'test-right-opt1-centered.png') });

  // Option 2: Shifted slightly right of center (+24px)
  await page.evaluate(() => {
    const photoContainer = document.querySelector('img[alt*="Krish"]').closest('.pointer-events-none');
    if (photoContainer) {
      photoContainer.style.transform = 'translateX(24px)';
    }
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(mediaDir, 'test-right-opt2-shift-right-24.png') });

  // Option 3: Shifted moderately right of center (+45px)
  await page.evaluate(() => {
    const photoContainer = document.querySelector('img[alt*="Krish"]').closest('.pointer-events-none');
    if (photoContainer) {
      photoContainer.style.transform = 'translateX(45px)';
    }
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(mediaDir, 'test-right-opt3-shift-right-45.png') });

  // Option 4: Shifted more towards right edge (+70px)
  await page.evaluate(() => {
    const photoContainer = document.querySelector('img[alt*="Krish"]').closest('.pointer-events-none');
    if (photoContainer) {
      photoContainer.style.transform = 'translateX(70px)';
    }
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(mediaDir, 'test-right-opt4-shift-right-70.png') });

  await browser.close();
  console.log('Captured all right test options!');
}

run().catch(console.error);
