export interface TutorialStep {
  text: string;
  duration: number;
  imagePrompt: string;
}

export interface Tutorial {
  title: string;
  steps: TutorialStep[];
  keywords: string[];
}

export const techTutorials: Tutorial[] = [
  {
    title: 'How to Create a Gmail Account',
    keywords: ['gmail', 'create gmail', 'make gmail', 'email account', 'google account'],
    steps: [
      {
        text: "Let's create your Gmail account step by step",
        duration: 3500,
        imagePrompt: "Gmail logo with colorful G icon, clean modern design, white background"
      },
      {
        text: "Open your web browser and go to gmail.com",
        duration: 3500,
        imagePrompt: "web browser showing gmail.com homepage with Create Account button, clean interface"
      },
      {
        text: "Click on Create Account and select For Myself",
        duration: 4000,
        imagePrompt: "Gmail signup page showing Create Account button highlighted, blue accent colors"
      },
      {
        text: "Enter your first name, last name, and choose a username",
        duration: 4000,
        imagePrompt: "Gmail signup form with name fields and username input, clean form design"
      },
      {
        text: "Create a strong password with letters, numbers, and symbols",
        duration: 4000,
        imagePrompt: "password creation field with strength indicator showing strong password, security icons"
      },
      {
        text: "Success! Your Gmail account is ready to use",
        duration: 3500,
        imagePrompt: "Gmail inbox interface showing Welcome message, clean email layout with folders"
      }
    ]
  },
  {
    title: 'How to Send a Text Message on iPhone',
    keywords: ['text message', 'send text', 'imessage', 'sms iphone', 'message iphone', 'text', 'message'],
    steps: [
      {
        text: "Let's learn how to send a text message on your iPhone",
        duration: 4000,
        imagePrompt: "iPhone displaying Messages app icon - green rounded square with white speech bubble"
      },
      {
        text: "Find and tap the Messages app - it's the green icon with a white speech bubble",
        duration: 4000,
        imagePrompt: "close-up of iPhone Messages app icon highlighted and glowing on home screen"
      },
      {
        text: "Tap the compose button in the top right corner",
        duration: 4000,
        imagePrompt: "iPhone Messages app interface showing compose button in top right corner highlighted"
      },
      {
        text: "Type the contact's name or phone number in the To field",
        duration: 4000,
        imagePrompt: "iPhone new message screen with To field active and contact suggestions appearing"
      },
      {
        text: "Tap the message field and type your text using the keyboard",
        duration: 4000,
        imagePrompt: "iPhone keyboard visible with message being typed in text field, realistic mobile UI"
      },
      {
        text: "When ready, tap the blue send arrow to send your message",
        duration: 4000,
        imagePrompt: "close-up of iPhone send button - blue upward arrow, ready to tap, glowing"
      },
      {
        text: "Success! Your message has been sent and appears in the conversation",
        duration: 4000,
        imagePrompt: "iPhone Messages conversation showing sent message with blue bubble and delivered status"
      }
    ]
  },
  {
    title: 'How to Post on Instagram',
    keywords: ['instagram', 'post on instagram', 'instagram post', 'share on instagram', 'upload to instagram', 'post photo instagram'],
    steps: [
      {
        text: "Let's learn how to post on Instagram step by step",
        duration: 3500,
        imagePrompt: "Instagram logo - gradient pink, purple, orange square icon with white camera symbol"
      },
      {
        text: "Open the Instagram app on your phone",
        duration: 3500,
        imagePrompt: "smartphone home screen showing Instagram app icon highlighted, colorful gradient icon"
      },
      {
        text: "Tap the plus button at the bottom center of your screen",
        duration: 4000,
        imagePrompt: "Instagram app interface showing bottom navigation with plus button highlighted in center"
      },
      {
        text: "Select Post, then choose a photo or video from your gallery",
        duration: 4500,
        imagePrompt: "Instagram photo selection screen showing gallery of photos in grid layout, modern UI"
      },
      {
        text: "Apply filters or edit your photo if you want",
        duration: 4000,
        imagePrompt: "Instagram photo editing screen with filter options and editing tools visible at bottom"
      },
      {
        text: "Tap Next, then write a caption and add hashtags",
        duration: 4500,
        imagePrompt: "Instagram caption screen with keyboard visible, text field showing sample caption and hashtags"
      },
      {
        text: "Tap Share to post your content to Instagram",
        duration: 3500,
        imagePrompt: "Instagram share button highlighted in blue at top right corner, ready to post"
      },
      {
        text: "Success! Your post is now live on Instagram",
        duration: 3500,
        imagePrompt: "Instagram feed showing newly posted photo with likes and comments starting to appear"
      }
    ]
  },
  {
    title: 'How to Take a Screenshot on Android',
    keywords: ['screenshot', 'screenshot android', 'capture screen', 'take screenshot', 'screen capture android'],
    steps: [
      {
        text: "Let's learn how to take a screenshot on your Android phone",
        duration: 3500,
        imagePrompt: "Android phone displaying home screen, clean modern interface"
      },
      {
        text: "Navigate to the screen you want to capture",
        duration: 3500,
        imagePrompt: "Android phone showing interesting content on screen ready to be captured"
      },
      {
        text: "Press and hold the Power button and Volume Down button at the same time",
        duration: 4500,
        imagePrompt: "close-up of Android phone side buttons - power and volume down buttons highlighted"
      },
      {
        text: "Hold both buttons for about one second until you see the screen flash",
        duration: 4000,
        imagePrompt: "Android phone screen with white flash animation effect indicating screenshot capture"
      },
      {
        text: "You'll see a preview of your screenshot at the bottom of the screen",
        duration: 4000,
        imagePrompt: "Android screenshot preview thumbnail appearing at bottom with share and edit options"
      },
      {
        text: "Tap the preview to edit or share, or find it later in your Photos app",
        duration: 4500,
        imagePrompt: "Android Photos app showing Screenshots folder with captured images in grid view"
      },
      {
        text: "Success! Your screenshot has been saved to your gallery",
        duration: 3500,
        imagePrompt: "Android notification showing screenshot saved successfully with thumbnail preview"
      }
    ]
  },
  {
    title: 'How to Join a Zoom Meeting',
    keywords: ['zoom', 'join zoom', 'zoom meeting', 'video call zoom', 'zoom conference'],
    steps: [
      {
        text: "Let's join a Zoom meeting step by step",
        duration: 3500,
        imagePrompt: "Zoom app logo - blue and white video camera icon in rounded square"
      },
      {
        text: "Open the Zoom app on your device",
        duration: 3500,
        imagePrompt: "device showing Zoom app icon highlighted, blue video camera logo"
      },
      {
        text: "Tap Join a Meeting on the home screen",
        duration: 3500,
        imagePrompt: "Zoom app home screen showing Join a Meeting button prominently displayed"
      },
      {
        text: "Enter the Meeting ID provided by the host",
        duration: 4000,
        imagePrompt: "Zoom meeting ID entry screen with numeric keypad and input field"
      },
      {
        text: "Type your name and tap Join",
        duration: 3500,
        imagePrompt: "Zoom name entry screen with keyboard visible and Join button highlighted"
      },
      {
        text: "Enter the meeting password if required",
        duration: 3500,
        imagePrompt: "Zoom password entry screen with secure password field and numpad"
      },
      {
        text: "Choose whether to enable your video and audio",
        duration: 4000,
        imagePrompt: "Zoom preview screen showing video and audio toggle options before joining"
      },
      {
        text: "Success! You're now in the Zoom meeting",
        duration: 3500,
        imagePrompt: "Zoom meeting in progress showing multiple participant video tiles in gallery view"
      }
    ]
  },
  {
    title: 'How to Connect to WiFi',
    keywords: ['wifi', 'connect wifi', 'wireless', 'internet connection', 'wifi network', 'connect to wifi'],
    steps: [
      {
        text: "Let's connect to a WiFi network",
        duration: 3500,
        imagePrompt: "WiFi symbol icon with radiating waves in blue, modern clean design"
      },
      {
        text: "Open Settings on your device",
        duration: 3500,
        imagePrompt: "smartphone home screen with Settings app icon (gear icon) highlighted"
      },
      {
        text: "Tap on WiFi or Network & Internet",
        duration: 3500,
        imagePrompt: "Settings menu showing WiFi option at top with toggle switch visible"
      },
      {
        text: "Make sure WiFi is turned on by tapping the toggle",
        duration: 4000,
        imagePrompt: "WiFi settings screen with toggle switch in ON position, glowing blue"
      },
      {
        text: "Select your WiFi network from the list of available networks",
        duration: 4000,
        imagePrompt: "WiFi network list showing multiple network names with signal strength bars"
      },
      {
        text: "Enter the WiFi password when prompted",
        duration: 4000,
        imagePrompt: "WiFi password entry screen with keyboard visible and secure password field"
      },
      {
        text: "Tap Connect and wait for the connection to establish",
        duration: 4000,
        imagePrompt: "WiFi connecting screen showing connection progress indicator"
      },
      {
        text: "Success! You're now connected to WiFi",
        duration: 3500,
        imagePrompt: "WiFi connected status showing checkmark and Connected text with full signal bars"
      }
    ]
  }
];

export function findTutorial(query: string): Tutorial | null {
  const lowerQuery = query.toLowerCase();
  
  for (const tutorial of techTutorials) {
    if (tutorial.keywords.some(keyword => lowerQuery.includes(keyword))) {
      return tutorial;
    }
  }
  
  return null;
}