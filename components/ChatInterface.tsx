'use client';

import { useState } from 'react';
import TutorialWithImages from './TutorialWithImages';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setCurrentQuery(userMessage);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful tech support assistant. Provide clear, step-by-step instructions.' },
            { role: 'user', content: userMessage }
          ]
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="bg-secondary rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Header - Changed to secondary color (#4DB5AA) */}
        <div className="bg-secondary p-4 sm:p-6">
          <div className="flex items-center justify-center">
            <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">💬</span>
            <h2 className="text-lg sm:text-2xl font-bold text-white text-center">
              Ask a Tech Question & Get Step-by-Step Tutorial
            </h2>
          </div>
        </div>

        {/* Messages Area */}
        <div className="bg-cream p-3 sm:p-6 min-h-[300px] sm:min-h-[500px] max-h-[500px] sm:max-h-[700px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-5xl sm:text-6xl mb-4">📱</div>
              <p className="text-dark text-base sm:text-lg font-medium mb-4 px-4">
                Ask a tech question to see real screenshots
              </p>
              <p className="text-dark/70 text-xs sm:text-sm px-4">
                Screenshots are generated using Playwright
              </p>
              <div className="mt-6 sm:mt-8 text-left max-w-md mx-auto bg-light/50 p-3 sm:p-4 rounded-lg mx-4">
                <p className="text-dark font-medium mb-2 text-sm sm:text-base">Try asking:</p>
                <ul className="text-dark/80 text-xs sm:text-sm space-y-1">
                  <li>• "How to create a Gmail account?"</li>
                  <li>• "How to post on Instagram?"</li>
                  <li>• "How to search on Google?"</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] sm:max-w-[80%] rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
                    msg.role === 'user' 
                      ? 'bg-secondary text-white' 
                      : 'bg-light text-dark border-2 border-primary/20'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className="text-lg sm:text-xl">
                        {msg.role === 'user' ? '👤' : '🤖'}
                      </span>
                      <div>
                        <p className="text-xs font-medium mb-1 opacity-70">
                          {msg.role === 'user' ? 'YOUR QUESTION' : 'AI ASSISTANT'}
                        </p>
                        <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-light border-2 border-primary/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-primary"></div>
                      <span className="text-dark text-sm sm:text-base">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visual Tutorial Section */}
        {currentQuery && (
          <div className="border-t-2 sm:border-t-4 border-primary bg-cream">
            <div className="p-3 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">📸</span>
                  <h3 className="text-lg sm:text-xl font-bold text-dark">Visual Step-by-Step Tutorial</h3>
                </div>
              </div>
              <TutorialWithImages query={currentQuery} />
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 sm:p-6 bg-light rounded-b-xl sm:rounded-b-2xl">
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="How to create a Gmail account?"
              className="flex-1 px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl border-2 border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-cream text-dark placeholder-dark/50 text-sm sm:text-base"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{ backgroundColor: '#4DB5AA' }}
              className="px-4 py-2 sm:px-6 sm:py-3 hover:opacity-90 text-white rounded-lg sm:rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base whitespace-nowrap"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}