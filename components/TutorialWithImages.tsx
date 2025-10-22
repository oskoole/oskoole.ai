'use client';

import React, { useState, useEffect } from 'react';

interface TutorialStep {
  stepNumber: number;
  image: string;
  description: string;
}

interface TutorialWithImagesProps {
  query: string;
}

export default function TutorialWithImages({ query }: TutorialWithImagesProps) {
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query && query.trim() !== '') {
      generateTutorial();
    }
  }, [query]);

  async function generateTutorial() {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Generating tutorial for:', query);

      const response = await fetch('/api/generate-tutorial-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.success && data.images && data.images.length > 0) {
        console.log('✅ Tutorial generated:', data.images.length, 'steps');
        setSteps(data.images);
        setError(null);
      } else {
        console.log('⚠️ No tutorial found');
        setError('No tutorial template found for this query');
        setSteps([]);
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to generate tutorial screenshots');
      setSteps([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-700 font-semibold">Capturing Real Screenshots...</p>
          <p className="text-sm text-gray-500 mt-2">Using Playwright automation</p>
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
              <p className="text-yellow-800 font-semibold mb-2">{error}</p>
              <p className="text-sm text-yellow-700">Currently supported tutorials:</p>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Gmail account creation</li>
                <li>• Instagram posting</li>
                <li>• Google searching</li>
                <li>• iPhone screenshots</li>
                <li>• Android WiFi connection</li>
              </ul>
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
          <p className="text-lg">Ask a tech question to see real screenshots</p>
          <p className="text-sm mt-2">Screenshots are generated using Playwright</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-green-600 text-xl mr-2">✓</span>
          <div>
            <p className="text-green-800 font-semibold">Real Playwright Screenshots</p>
            <p className="text-sm text-green-700">No FLUX or DALL-E - 100% accurate screenshots</p>
          </div>
        </div>
      </div>

      {steps.map((step, index) => (
        <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b-2 border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                {step.stepNumber}
              </div>
              <h3 className="font-bold text-lg text-gray-800">Step {step.stepNumber}</h3>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-gray-700 mb-4 font-medium">{step.description}</p>
            <img
              src={step.image}
              alt={`Step ${step.stepNumber}: ${step.description}`}
              className="w-full rounded-lg border-2 border-gray-200 shadow-md"
            />
          </div>
        </div>
      ))}

      <div className="text-center text-sm text-gray-500 py-4">
        <p>📸 {steps.length} screenshot{steps.length !== 1 ? 's' : ''} generated</p>
      </div>
    </div>
  );
}