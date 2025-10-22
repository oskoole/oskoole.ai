// app/api/generate-tutorial-images/route.ts
// Simplified Playwright-only image generation (currently using mock data)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    console.log('📸 Tutorial request:', query);
    
    // Detect tutorial type
    const tutorialType = detectTutorialType(query);
    
    if (!tutorialType) {
      console.log('❌ No template found');
      return NextResponse.json({ 
        success: false,
        error: 'No tutorial template found for this query' 
      }, { status: 404 });
    }
    
    console.log('✅ Using template:', tutorialType);
    
    // Return mock data (replace with real Playwright later)
    const mockScreenshots = generateMockScreenshots(tutorialType);
    
    return NextResponse.json({ 
      success: true,
      images: mockScreenshots,
      tutorial: tutorialType
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to generate tutorial' 
    }, { status: 500 });
  }
}

// Detect which tutorial to use
function detectTutorialType(query: string): string | null {
  const q = query.toLowerCase();
  
  if (q.includes('gmail') || q.includes('email account') || q.includes('google mail')) {
    return 'gmail';
  }
  if (q.includes('instagram') || q.includes('post photo') || q.includes('insta')) {
    return 'instagram';
  }
  if (q.includes('google search') || q.includes('search google')) {
    return 'google';
  }
  if (q.includes('iphone') && q.includes('screenshot')) {
    return 'iphone_screenshot';
  }
  if (q.includes('android') && q.includes('wifi')) {
    return 'android_wifi';
  }
  
  return null;
}

// Generate mock screenshots for testing
function generateMockScreenshots(type: string) {
  const tutorials: { [key: string]: any[] } = {
    gmail: [
      {
        stepNumber: 1,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdGVwIDE6IEdvIHRvIEdtYWlsIFNpZ251cDwvdGV4dD48L3N2Zz4=',
        description: 'Go to accounts.google.com/signup'
      },
      {
        stepNumber: 2,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdGVwIDI6IEZpbGwgaW4geW91ciBpbmZvcm1hdGlvbjwvdGV4dD48L3N2Zz4=',
        description: 'Enter your first name, last name, and desired email address'
      },
      {
        stepNumber: 3,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdGVwIDM6IENyZWF0ZSBhIHBhc3N3b3JkPC90ZXh0Pjwvc3ZnPg==',
        description: 'Choose a strong password and confirm it'
      }
    ],
    instagram: [
      {
        stepNumber: 1,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdGVwIDE6IE9wZW4gSW5zdGFncmFtPC90ZXh0Pjwvc3ZnPg==',
        description: 'Open the Instagram app or go to instagram.com'
      },
      {
        stepNumber: 2,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdGVwIDI6IFRhcCB0aGUgKyBidXR0b248L3RleHQ+PC9zdmc+',
        description: 'Tap the plus (+) button to create a new post'
      }
    ],
    google: [
      {
        stepNumber: 1,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdGVwIDE6IEdvIHRvIGdvb2dsZS5jb208L3RleHQ+PC9zdmc+',
        description: 'Open your browser and go to google.com'
      }
    ],
    iphone_screenshot: [
      {
        stepNumber: 1,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QcmVzcyBTaWRlICsgVm9sdW1lIFVwPC90ZXh0Pjwvc3ZnPg==',
        description: 'Press the Side button and Volume Up button simultaneously'
      }
    ],
    android_wifi: [
      {
        stepNumber: 1,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5PcGVuIFNldHRpbmdzPC90ZXh0Pjwvc3ZnPg==',
        description: 'Open Settings and tap Wi-Fi'
      }
    ]
  };
  
  return tutorials[type] || [];
}