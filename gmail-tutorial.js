const { chromium } = require('playwright');

async function createGmailTutorial() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('📸 Taking real Gmail screenshot...');
  await page.goto('https://accounts.google.com/signup');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'gmail-step-1.png' });
  console.log('✅ Real screenshot saved as gmail-step-1.png');
  
  await browser.close();
}

createGmailTutorial();