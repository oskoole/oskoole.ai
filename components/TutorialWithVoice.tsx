'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import VoiceManager from './VoiceManager';

interface TutorialStep {
  text: string;
  duration: number;
  screenshot: string;
}

interface Tutorial {
  title: string;
  steps: TutorialStep[];
}

interface TutorialWithVoiceProps {
  tutorial: string;
  voiceId: string;
  onClose: () => void;
}

export default function TutorialWithVoice({ tutorial, voiceId, onClose }: TutorialWithVoiceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tutorialData: Tutorial = {
    title: tutorial,
    steps: [
      {
        text: "Welcome to this tutorial. Let's get started!",
        duration: 3,
        screenshot: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdGVwIDE8L3RleHQ+PC9zdmc+"
      }
    ]
  };

  useEffect(() => {
    if (isPlaying) {
      generateVoiceover();
    }
  }, [currentStep, isPlaying]);

  async function generateVoiceover() {
    try {
      const step = tutorialData.steps[currentStep];
      const audio = await VoiceManager.generateSpeech(step.text, voiceId);
      setAudioUrl(audio);
      
      if (audioRef.current) {
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error generating voiceover:', error);
    }
  }

  function handlePlayPause() {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleNext() {
    if (currentStep < tutorialData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePrevious() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleRestart() {
    setCurrentStep(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{tutorialData.title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <img
              src={tutorialData.steps[currentStep].screenshot}
              alt={`Step ${currentStep + 1}`}
              className="w-full rounded-lg border shadow-md"
            />
          </div>

          <div className="mb-4">
            <p className="text-lg text-gray-800">{tutorialData.steps[currentStep].text}</p>
          </div>

          <div className="flex justify-center items-center space-x-4 mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            
            <button
              onClick={handlePlayPause}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-gray-300 rounded-lg flex items-center"
            >
              <RotateCcw className="mr-2" size={16} />
              Restart
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentStep === tutorialData.steps.length - 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Step {currentStep + 1} of {tutorialData.steps.length}
          </div>
        </div>

        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => {
              setIsPlaying(false);
              if (currentStep < tutorialData.steps.length - 1) {
                setCurrentStep(currentStep + 1);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}