const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({ path: 'google.png' });
  await browser.close();
  console.log('✅ Screenshot saved as google.png');
}

test();