'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import TutorialWithImages from '@/components/TutorialWithImages';

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  });
  
  const [currentQuery, setCurrentQuery] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setCurrentQuery(input);
    setShowTutorial(true);
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            oskoole.ai
          </h1>
          <p className="text-gray-600">Learn Tech Skills with AI-Powered Education</p>
        </div>

        {/* UNIFIED INTERFACE */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 p-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <span className="mr-2">🎓</span>
              Ask a Tech Question & Get Step-by-Step Tutorial
            </h2>
          </div>

          <div className="h-[calc(100vh-300px)] overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && !showTutorial && (
              <div className="text-center text-gray-400 mt-8">
                <div className="mb-6">
                  <span className="text-6xl">📱</span>
                </div>
                <p className="mb-4 text-lg font-semibold text-gray-700">
                  Ask a tech question to see real screenshots
                </p>
                <p className="text-sm mb-4">Screenshots are generated using Playwright</p>
                <div className="space-y-2 text-sm bg-gray-50 p-6 rounded-lg max-w-md mx-auto">
                  <p className="text-gray-600">• "How to create a Gmail account?"</p>
                  <p className="text-gray-600">• "How to post on Instagram?"</p>
                  <p className="text-gray-600">• "How to search on Google?"</p>
                </div>
              </div>
            )}
            
            {/* Messages with integrated tutorials */}
            {messages.map((message, index) => (
              <div key={message.id} className="space-y-4">
                {/* User Question */}
                {message.role === 'user' && (
                  <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-5 rounded-xl ml-auto max-w-[85%] border-l-4 border-blue-500">
                    <p className="text-xs font-bold mb-2 text-blue-700 uppercase tracking-wide">
                      👤 Your Question
                    </p>
                    <p className="text-gray-800 text-lg font-medium">{message.content}</p>
                  </div>
                )}

                {/* AI Response */}
                {message.role === 'assistant' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-l-4 border-purple-500">
                      <p className="text-xs font-bold mb-3 text-purple-700 uppercase tracking-wide">
                        🤖 AI Assistant
                      </p>
                      <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{message.content}</p>
                    </div>

                    {/* Tutorial with Screenshots - appears right after AI response */}
                    {index === messages.length - 1 && showTutorial && (
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-purple-200">
                        <div className="flex items-center mb-4 pb-3 border-b border-purple-200">
                          <span className="text-2xl mr-3">📸</span>
                          <h3 className="text-xl font-bold text-purple-700">
                            Visual Step-by-Step Tutorial
                          </h3>
                        </div>
                        <TutorialWithImages query={currentQuery} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gray-100 p-5 rounded-xl max-w-[85%] border-l-4 border-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="ml-2 text-gray-600 font-medium">Generating tutorial with screenshots...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t-2 border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-blue-50">
            <form onSubmit={onSubmit} className="flex gap-3">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="How to create a Gmail account?"
                className="flex-1 p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? '⏳' : '🚀 Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}