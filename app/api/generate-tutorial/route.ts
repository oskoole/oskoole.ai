import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

interface TutorialStep {
  stepNumber: number;
  action: string;
  screenshot?: string;
  narration: string;
}

interface ComputerUseResponse {
  title: string;
  platform: string;
  steps: TutorialStep[];
  fullNarration: string;
  totalSteps: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, platform = 'web' } = body;

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    console.log('Calling Computer Use service...');
    const computerUseUrl = process.env.COMPUTER_USE_SERVICE_URL;
    const apiKey = process.env.COMPUTER_USE_API_KEY;

    if (!computerUseUrl) {
      return NextResponse.json(
        { error: 'Computer Use service not configured' },
        { status: 500 }
      );
    }

    const computerUseResponse = await fetch(`${computerUseUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
      },
      body: JSON.stringify({ question, platform }),
    });

    if (!computerUseResponse.ok) {
      const errorText = await computerUseResponse.text();
      console.error('Computer Use service error:', errorText);
      return NextResponse.json(
        { error: 'Failed to generate tutorial steps' },
        { status: 500 }
      );
    }

    const tutorialData: ComputerUseResponse = await computerUseResponse.json();
    console.log(`Tutorial generated: ${tutorialData.title}`);

    console.log('Uploading screenshots to Vercel Blob...');
    const screenshotUrls: string[] = [];

    for (let i = 0; i < tutorialData.steps.length; i++) {
      const step = tutorialData.steps[i];
      
      if (step.screenshot) {
        try {
          const base64Data = step.screenshot.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          
          const filename = `${tutorialData.title.replace(/\s+/g, '-').toLowerCase()}-step-${step.stepNumber}.png`;
          const blob = await put(filename, buffer, {
            access: 'public',
            contentType: 'image/png',
          });
          
          screenshotUrls.push(blob.url);
          console.log(`Uploaded screenshot ${i + 1}/${tutorialData.steps.length}`);
        } catch (uploadError) {
          console.error(`Failed to upload screenshot ${i + 1}:`, uploadError);
          screenshotUrls.push('');
        }
      } else {
        screenshotUrls.push('');
      }
    }

    console.log('Generating voiceover with ElevenLabs...');
    let audioUrl = '';

    try {
      const elevenlabsApiKey = process.env.ELEVENLABS_API_KEY;
      const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || process.env.ELEVENLABS_VOICE_ID;

      if (elevenlabsApiKey && voiceId) {
        const audioResponse = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
          {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': elevenlabsApiKey,
            },
            body: JSON.stringify({
              text: tutorialData.fullNarration,
              model_id: 'eleven_monolingual_v1',
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          }
        );

        if (audioResponse.ok) {
          const audioBuffer = await audioResponse.arrayBuffer();
          
          const audioFilename = `${tutorialData.title.replace(/\s+/g, '-').toLowerCase()}-audio.mp3`;
          const audioBlob = await put(audioFilename, Buffer.from(audioBuffer), {
            access: 'public',
            contentType: 'audio/mpeg',
          });
          
          audioUrl = audioBlob.url;
          console.log('Voiceover generated successfully');
        }
      }
    } catch (audioError) {
      console.error('Failed to generate audio:', audioError);
    }

    const stepsWithUrls = tutorialData.steps.map((step, index) => ({
      ...step,
      screenshot: screenshotUrls[index] || undefined,
    }));

    const response = {
      title: tutorialData.title,
      platform: tutorialData.platform,
      steps: stepsWithUrls,
      audioUrl: audioUrl || undefined,
      narration: tutorialData.fullNarration,
      totalSteps: tutorialData.totalSteps,
    };

    console.log('Tutorial generation complete!');
    return NextResponse.json(response);

  } catch (error) {
    console.error('Error generating tutorial:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    service: 'Computer Use Tutorial Generator',
    timestamp: new Date().toISOString()
  });
}