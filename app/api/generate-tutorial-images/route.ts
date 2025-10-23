import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const tutorialType = detectTutorialType(query);
    
    if (!tutorialType) {
      return NextResponse.json({ success: false, error: 'No tutorial found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, images: getScreenshotsForTutorial(tutorialType) });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate tutorial' }, { status: 500 });
  }
}

function detectTutorialType(query: string): string | null {
  const q = query.toLowerCase();
  if (q.includes('gmail') || q.includes('email')) return 'gmail';
  if (q.includes('instagram') || q.includes('insta')) return 'instagram';
  if (q.includes('google')) return 'google';
  return null;
}

function getScreenshotsForTutorial(type: string) {
  const tutorials: Record<string, any[]> = {
    gmail: [
      { stepNumber: 1, image: '/gmail-step-1.png', description: 'Go to accounts.google.com/signup' },
      { stepNumber: 2, image: '/gmail-step-2.png', description: 'Enter your first name' },
      { stepNumber: 3, image: '/gmail-step-3.png', description: 'Enter your last name' },
      { stepNumber: 4, image: '/gmail-step-4.png', description: 'Create a username' },
      { stepNumber: 5, image: '/gmail-step-5.png', description: 'Create a password' },
      { stepNumber: 6, image: '/gmail-step-6.png', description: 'Add phone number' },
      { stepNumber: 7, image: '/gmail-step-7.png', description: 'Enter birthday and gender' },
      { stepNumber: 8, image: '/gmail-step-8.png', description: 'Accept terms of service' }
    ],
    instagram: [
      { stepNumber: 1, image: '/instagram-step-1.png', description: 'Open Instagram and tap plus button' },
      { stepNumber: 2, image: '/instagram-step-2.png', description: 'Select Post from menu' },
      { stepNumber: 3, image: '/instagram-step-3.png', description: 'Choose a photo' },
      { stepNumber: 4, image: '/instagram-step-4.png', description: 'Apply filters if desired' },
      { stepNumber: 5, image: '/instagram-step-5.png', description: 'Write a caption' },
      { stepNumber: 6, image: '/instagram-step-6.png', description: 'Tag people and add location' },
      { stepNumber: 7, image: '/instagram-step-7.png', description: 'Tap Share to post' }
    ],
    google: [
      { stepNumber: 1, image: '/google-step-1.png', description: 'Go to google.com' },
      { stepNumber: 2, image: '/google-step-2.png', description: 'See the Google homepage' },
      { stepNumber: 3, image: '/google-step-3.png', description: 'Click in the search box' },
      { stepNumber: 4, image: '/google-step-4.png', description: 'Type your query' },
      { stepNumber: 5, image: '/google-step-5.png', description: 'Press Enter for results' }
    ]
  };
  return tutorials[type] || [];
}