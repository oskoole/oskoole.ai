'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TutorialStep {
  stepNumber: number;
  image: string;
  description: string;
  audioUrl?: string;
}

interface TutorialWithImagesProps {
  query: string;
}

export default function TutorialWithImages({ query }: TutorialWithImagesProps) {
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatingAudio, setGeneratingAudio] = useState(false);
  const [currentPlayingStep, setCurrentPlayingStep] = useState<number | null>(null);
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});

  const VOICE_ID = 'umdLb5CiI994u6JMunfq';

  useEffect(() => {
    if (query && query.trim() !== '') {
      generateTutorial();
    }
  }, [query]);

  async function generateTutorial() {
    setLoading(true);
    setError(null);
    setSteps([]);

    try {
      const response = await fetch('/api/generate-tutorial-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();

      if (data.success && data.images && data.images.length > 0) {
        const stepsWithoutAudio = data.images.map((step: TutorialStep) => ({ ...step, audioUrl: undefined }));
        setSteps(stepsWithoutAudio);
        setError(null);
        generateAllAudio(stepsWithoutAudio);
      } else {
        setError('No tutorial template found for this query');
      }
    } catch (err) {
      setError('Failed to generate tutorial');
    } finally {
      setLoading(false);
    }
  }

  async function generateAllAudio(tutorialSteps: TutorialStep[]) {
    setGeneratingAudio(true);
    const updatedSteps: TutorialStep[] = [];
    
    for (const step of tutorialSteps) {
      try {
        const audioUrl = await generateAudioForStep(step.description);
        updatedSteps.push({ ...step, audioUrl });
      } catch (error) {
        updatedSteps.push(step);
      }
    }

    setSteps(updatedSteps);
    setGeneratingAudio(false);
  }

  async function generateAudioForStep(text: string): Promise<string> {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceId: VOICE_ID }),
    });

    if (!response.ok) throw new Error('Failed to generate audio');
    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  }

  function playAudio(stepNumber: number) {
    if (currentPlayingStep !== null && audioRefs.current[currentPlayingStep]) {
      const currentAudio = audioRefs.current[currentPlayingStep];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    const audio = audioRefs.current[stepNumber];
    if (audio) {
      audio.play();
      setCurrentPlayingStep(stepNumber);
    }
  }

  function pauseAudio(stepNumber: number) {
    const audio = audioRefs.current[stepNumber];
    if (audio) {
      audio.pause();
      setCurrentPlayingStep(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="text-gray-700 font-semibold">Capturing Screenshots...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <p className="text-yellow-800 font-semibold">{error}</p>
              <p className="text-sm text-yellow-700 mt-2">Supported: Gmail, Instagram, Google</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center text-gray-400">
          <div className="text-6xl mb-4">📱</div>
          <p className="text-lg">Ask a tech question to see screenshots</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-green-600 text-xl mr-2">✓</span>
            <div>
              <p className="text-green-800 font-semibold">Real Playwright Screenshots</p>
              <p className="text-sm text-green-700">With voice-over narration</p>
            </div>
          </div>
          {generatingAudio && (
            <div className="flex items-center text-blue-600">
              <div className="animate-spin mr-2">🎤</div>
              <span className="text-sm font-medium">Generating voice...</span>
            </div>
          )}
        </div>
      </div>

      {steps.map((step) => (
        <div key={step.stepNumber} className="border-2 border-gray-200 rounded-lg bg-white shadow-sm">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                  {step.stepNumber}
                </div>
                <h3 className="font-bold text-lg">Step {step.stepNumber}</h3>
              </div>
              
              {step.audioUrl && (
                <button
                  onClick={() => currentPlayingStep === step.stepNumber ? pauseAudio(step.stepNumber) : playAudio(step.stepNumber)}
                  className={`px-4 py-2 rounded-lg font-semibold ${currentPlayingStep === step.stepNumber ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                >
                  {currentPlayingStep === step.stepNumber ? '⏸️ Pause' : '▶️ Play'}
                </button>
              )}
              {step.audioUrl && <audio ref={(el) => { audioRefs.current[step.stepNumber] = el; }} src={step.audioUrl} onEnded={() => setCurrentPlayingStep(null)} />}
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-gray-700 mb-4">{step.description}</p>
            <img src={step.image} alt={`Step ${step.stepNumber}`} className="w-full rounded-lg border-2 border-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}