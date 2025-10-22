// Complete Tutorial Generation System for oskoole.ai
// Generates real screenshots based on user queries

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

class TutorialSystem {
  constructor() {
    this.templates = this.loadTemplates();
  }

  // Initialize is now a no-op since we create browser per request
  async initialize() {
    console.log('✅ Tutorial system ready!');
  }

  // Main entry point - takes user question and generates tutorial
  async generateFromQuery(userQuery) {
    console.log(`\n🎯 Processing: "${userQuery}"\n`);

    // Parse the query
    const tutorial = this.findTutorial(userQuery);
    
    if (!tutorial) {
      console.log('❌ No tutorial found for this query');
      return { 
        success: false, 
        message: 'Tutorial not available yet' 
      };
    }

    console.log(`📚 Found tutorial: ${tutorial.title}`);

    // Generate screenshots with a fresh browser instance
    const screenshots = await this.generateTutorial(tutorial);

    if (screenshots.length === 0) {
      return {
        success: false,
        message: 'Failed to generate screenshots'
      };
    }

    return {
      success: true,
      title: tutorial.title,
      platform: tutorial.platform || 'web',
      screenshots: screenshots,
      totalSteps: screenshots.length
    };
  }

  // Generate tutorial screenshots
  async generateTutorial(tutorial) {
    const screenshots = [];
    const outputDir = `./tutorials/${tutorial.id}`;
    
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    // Create a fresh browser instance for this request
    let browser = null;
    let page = null;

    try {
      browser = await chromium.launch({ 
        headless: false // Set to true in production
      });
      
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
      });
      
      page = await context.newPage();

      for (let i = 0; i < tutorial.steps.length; i++) {
        const step = tutorial.steps[i];
        const stepNum = i + 1;
        
        console.log(`📸 Step ${stepNum}/${tutorial.steps.length}: ${step.description}`);

        try {
          // Navigate if URL provided
          if (step.url) {
            await page.goto(step.url, { waitUntil: 'networkidle', timeout: 30000 });
          }

          // Wait for element if specified
          if (step.waitFor) {
            await page.waitForSelector(step.waitFor, { timeout: 10000 });
          }

          // Add visual annotations
          if (step.highlight) {
            await this.addHighlight(page, step.highlight);
          }

          // Take screenshot
          const filename = `step-${stepNum}.png`;
          const filepath = path.join(outputDir, filename);
          await page.screenshot({ path: filepath });

          screenshots.push({
            step: stepNum,
            description: step.description,
            path: filepath,
            filename: filename,
            url: `http://localhost:3003/tutorials/${tutorial.id}/${filename}`
          });

          console.log(`✅ Saved: ${filename}`);

          // Wait before next step
          await page.waitForTimeout(500);

        } catch (error) {
          console.error(`❌ Error on step ${stepNum}: ${error.message}`);
        }
      }

    } catch (error) {
      console.error(`❌ Browser error: ${error.message}`);
    } finally {
      // Always close the browser when done
      if (browser) {
        await browser.close();
      }
    }

    return screenshots;
  }

  // Add visual highlights to elements
  async addHighlight(page, highlight) {
    const { selector, color = '#FF6B6B', type = 'box' } = highlight;

    await page.evaluate(({ selector, color, type }) => {
      const element = document.querySelector(selector);
      if (!element) return;

      if (type === 'box') {
        element.style.border = `5px solid ${color}`;
        element.style.boxShadow = `0 0 20px ${color}80`;
        element.style.borderRadius = '8px';
      }

      if (type === 'background') {
        element.style.backgroundColor = `${color}40`;
      }

      // Add arrow annotation
      if (type === 'arrow') {
        const rect = element.getBoundingClientRect();
        const arrow = document.createElement('div');
        arrow.innerHTML = `
          <svg width="100" height="100" style="position: fixed; top: ${rect.top - 100}px; left: ${rect.left + rect.width/2 - 50}px; z-index: 9999;">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="${color}" />
              </marker>
            </defs>
            <path d="M 50 20 Q 50 50, 50 90" stroke="${color}" stroke-width="4" fill="none" marker-end="url(#arrowhead)" />
          </svg>
        `;
        document.body.appendChild(arrow);
      }
    }, { selector, color, type });
  }

  // Find tutorial based on user query
  findTutorial(query) {
    const lowerQuery = query.toLowerCase();

    for (const template of this.templates) {
      // Check if any keyword matches
      if (template.keywords.some(keyword => lowerQuery.includes(keyword))) {
        return template;
      }
    }

    return null;
  }

  // Load tutorial templates
  loadTemplates() {
    return [
      {
        id: 'gmail-signup',
        title: 'How to Create a Gmail Account',
        keywords: ['gmail', 'create gmail', 'gmail account', 'sign up gmail'],
        platform: 'web',
        steps: [
          {
            description: 'Go to Gmail signup page',
            url: 'https://accounts.google.com/signup',
            waitFor: 'input[name="firstName"]',
            highlight: null
          },
          {
            description: 'Enter your first name',
            highlight: {
              selector: 'input[name="firstName"]',
              color: '#FF6B6B',
              type: 'box'
            }
          },
          {
            description: 'Enter your last name',
            highlight: {
              selector: 'input[name="lastName"]',
              color: '#4CAF50',
              type: 'box'
            }
          }
        ]
      },

      {
        id: 'instagram-post',
        title: 'How to Post on Instagram',
        keywords: ['instagram', 'post instagram', 'instagram post', 'share instagram'],
        platform: 'web',
        steps: [
          {
            description: 'Go to Instagram',
            url: 'https://www.instagram.com',
            waitFor: 'svg[aria-label="New post"]'
          },
          {
            description: 'Click the New Post button',
            highlight: {
              selector: 'svg[aria-label="New post"]',
              color: '#E91E63',
              type: 'box'
            }
          }
        ]
      },

      {
        id: 'google-search',
        title: 'How to Search on Google',
        keywords: ['google search', 'search google', 'how to google'],
        platform: 'web',
        steps: [
          {
            description: 'Go to Google',
            url: 'https://www.google.com',
            waitFor: 'textarea[name="q"]'
          },
          {
            description: 'Click in the search box',
            highlight: {
              selector: 'textarea[name="q"]',
              color: '#4285F4',
              type: 'box'
            }
          }
        ]
      },

      {
        id: 'facebook-post',
        title: 'How to Post on Facebook',
        keywords: ['facebook', 'post facebook', 'facebook post', 'share facebook'],
        steps: [
          {
            description: 'Go to Facebook',
            url: 'https://www.facebook.com',
            waitFor: 'div[role="button"][aria-label*="What"]'
          },
          {
            description: 'Click "What\'s on your mind?"',
            highlight: {
              selector: 'div[role="button"]',
              color: '#1877F2',
              type: 'box'
            }
          }
        ]
      },

      {
        id: 'youtube-search',
        title: 'How to Search on YouTube',
        keywords: ['youtube', 'search youtube', 'youtube search', 'find youtube'],
        platform: 'web',
        steps: [
          {
            description: 'Go to YouTube',
            url: 'https://www.youtube.com',
            waitFor: 'input#search'
          },
          {
            description: 'Click the search box',
            highlight: {
              selector: 'input#search',
              color: '#FF0000',
              type: 'box'
            }
          }
        ]
      },

      // MOBILE TUTORIALS - iOS
      {
        id: 'iphone-screenshot',
        title: 'How to Take a Screenshot on iPhone',
        keywords: ['iphone screenshot', 'screenshot iphone', 'ios screenshot', 'take screenshot iphone'],
        platform: 'ios',
        steps: [
          {
            description: 'Press the Side button and Volume Up button at the same time',
            url: 'https://support.apple.com/en-us/HT200289',
            waitFor: 'body'
          },
          {
            description: 'Quickly release both buttons',
            highlight: null
          },
          {
            description: 'Your screenshot will appear as a thumbnail in the corner',
            highlight: null
          }
        ]
      },

      {
        id: 'iphone-text-message',
        title: 'How to Send a Text Message on iPhone',
        keywords: ['send text iphone', 'text message iphone', 'imessage', 'iphone message'],
        platform: 'ios',
        steps: [
          {
            description: 'Open the Messages app',
            url: 'https://support.apple.com/guide/iphone/send-and-receive-messages-iph2f59e61c/ios',
            waitFor: 'body'
          },
          {
            description: 'Tap the compose button',
            highlight: null
          },
          {
            description: 'Enter a contact name or number',
            highlight: null
          },
          {
            description: 'Type your message and tap Send',
            highlight: null
          }
        ]
      },

      // MOBILE TUTORIALS - Android
      {
        id: 'android-screenshot',
        title: 'How to Take a Screenshot on Android',
        keywords: ['android screenshot', 'screenshot android', 'take screenshot android'],
        platform: 'android',
        steps: [
          {
            description: 'Press the Power button and Volume Down button at the same time',
            url: 'https://support.google.com/android/answer/9075928',
            waitFor: 'body'
          },
          {
            description: 'Hold for 1-2 seconds',
            highlight: null
          },
          {
            description: 'Your screenshot will be saved to your Photos',
            highlight: null
          }
        ]
      },

      {
        id: 'android-wifi',
        title: 'How to Connect to WiFi on Android',
        keywords: ['android wifi', 'connect wifi android', 'wifi android'],
        platform: 'android',
        steps: [
          {
            description: 'Open Settings',
            url: 'https://support.google.com/android/answer/9075928',
            waitFor: 'body'
          },
          {
            description: 'Tap Network & Internet',
            highlight: null
          },
          {
            description: 'Tap WiFi',
            highlight: null
          },
          {
            description: 'Turn on WiFi and select your network',
            highlight: null
          }
        ]
      }
    ];
  }

  // Cleanup (no-op since we don't keep browser open)
  async close() {
    console.log('✅ System cleanup complete');
  }
}

module.exports = { TutorialSystem };