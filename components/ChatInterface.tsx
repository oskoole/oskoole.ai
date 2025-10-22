'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';
import TutorialWithImages from '@/components/TutorialWithImages';

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  });
  
  const [currentQuery, setCurrentQuery] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setCurrentQuery(input);
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            oskoole.ai
          </h1>
          <p className="text-gray-600">Learn Tech Skills with AI-Powered Education</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE - Chat */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">💬</span>
                Ask a Tech Question
              </h2>
            </div>

            <div className="h-[calc(100vh-350px)] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <p className="mb-4 font-semibold">Try asking:</p>
                  <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                    <p>• "How to create a Gmail account?"</p>
                    <p>• "How to post on Instagram?"</p>
                    <p>• "How to search on Google?"</p>
                  </div>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-100 ml-auto max-w-[85%]'
                      : 'bg-gray-100 mr-auto max-w-[85%]'
                  }`}
                >
                  <p className="text-xs font-semibold mb-2 text-gray-600">
                    {message.role === 'user' ? '👤 You' : '🤖 AI Assistant'}
                  </p>
                  <p className="whitespace-pre-wrap text-gray-800">{message.content}</p>
                </div>
              ))}
              
              {isLoading && (
                <div className="bg-gray-100 p-4 rounded-lg mr-auto max-w-[85%]">
                  <div className="flex items-center space-x-2">
                    <div className="animate-bounce">●</div>
                    <div className="animate-bounce delay-100">●</div>
                    <div className="animate-bounce delay-200">●</div>
                    <span className="ml-2 text-gray-600">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-4 bg-gray-50">
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="How to create a Gmail account?"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE - Tutorial */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">📸</span>
                Visual Tutorial (Playwright Screenshots)
              </h2>
            </div>
            
            <div className="h-[calc(100vh-350px)] overflow-y-auto p-4">
              <TutorialWithImages query={currentQuery} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}