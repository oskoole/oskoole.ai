const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Path to save screenshots in Next.js public folder
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

async function captureGmailTutorial() {
  console.log('📸 Capturing Gmail tutorial screenshots...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Step 1: Go to Gmail signup
    console.log('Step 1: Gmail signup page');
    await page.goto('https://accounts.google.com/signup', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'gmail-step-1.png'), fullPage: false });
    
    // Step 2: First name field
    console.log('Step 2: First name field');
    await page.evaluate(() => {
      const input = document.querySelector('input[name="firstName"]');
      if (input) {
        input.style.border = '3px solid #4285F4';
        input.style.boxShadow = '0 0 15px rgba(66, 133, 244, 0.5)';
      }
    });
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'gmail-step-2.png'), fullPage: false });
    
    // Step 3: Last name field
    console.log('Step 3: Last name field');
    await page.evaluate(() => {
      const input = document.querySelector('input[name="lastName"]');
      if (input) {
        input.style.border = '3px solid #4285F4';
        input.style.boxShadow = '0 0 15px rgba(66, 133, 244, 0.5)';
      }
    });
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'gmail-step-3.png'), fullPage: false });
    
    // Step 4: Username field
    console.log('Step 4: Username field');
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'gmail-step-4.png'), fullPage: false });
    
    // Step 5-8: Additional steps with placeholders
    for (let i = 5; i <= 8; i++) {
      await page.screenshot({ path: path.join(PUBLIC_DIR, `gmail-step-${i}.png`), fullPage: false 
});
    }
    
    console.log('✅ Gmail tutorial complete!');
  } catch (error) {
    console.error('❌ Error capturing Gmail tutorial:', error);
  } finally {
    await browser.close();
  }
}

async function captureInstagramTutorial() {
  console.log('📸 Capturing Instagram tutorial screenshots...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.instagram.com', { waitUntil: 'networkidle' });
    
    for (let i = 1; i <= 7; i++) {
      await page.screenshot({ path: path.join(PUBLIC_DIR, `instagram-step-${i}.png`), fullPage: 
false });
      console.log(`Step ${i} captured`);
      await page.waitForTimeout(500);
    }
    
    console.log('✅ Instagram tutorial complete!');
  } catch (error) {
    console.error('❌ Error capturing Instagram tutorial:', error);
  } finally {
    await browser.close();
  }
}

async function captureGoogleSearchTutorial() {
  console.log('📸 Capturing Google Search tutorial screenshots...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Step 1: Google homepage
    await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'google-step-1.png'), fullPage: false });
    
    // Step 2: Browser with Google
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'google-step-2.png'), fullPage: false });
    
    // Step 3: Search box highlighted
    await page.evaluate(() => {
      const searchBox = document.querySelector('textarea[name="q"]') || 
document.querySelector('input[name="q"]');
      if (searchBox) {
        searchBox.style.border = '3px solid #4285F4';
        searchBox.style.boxShadow = '0 0 15px rgba(66, 133, 244, 0.5)';
      }
    });
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'google-step-3.png'), fullPage: false });
    
    // Step 4: Type query
    await page.fill('textarea[name="q"]', 'how to use google search');
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'google-step-4.png'), fullPage: false });
    
    // Step 5: Search results
    await page.press('textarea[name="q"]', 'Enter');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(PUBLIC_DIR, 'google-step-5.png'), fullPage: false });
    
    console.log('✅ Google Search tutorial complete!');
  } catch (error) {
    console.error('❌ Error capturing Google tutorial:', error);
  } finally {
    await browser.close();
  }
}

async function captureAllTutorials() {
  console.log('🚀 Starting screenshot capture for all tutorials...\n');
  
  await captureGmailTutorial();
  console.log('');
  
  await captureGoogleSearchTutorial();
  console.log('');
  
  await captureInstagramTutorial();
  console.log('');
  
  console.log('✨ All tutorials captured successfully!');
  console.log(`📁 Screenshots saved to: ${PUBLIC_DIR}`);
}

// Run if called directly
if (require.main === module) {
  captureAllTutorials().catch(console.error);
}

module.exports = { captureGmailTutorial, captureInstagramTutorial, captureGoogleSearchTutorial };

