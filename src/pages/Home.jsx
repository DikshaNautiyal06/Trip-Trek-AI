import React, { useState } from 'react';
import { marked } from 'marked';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load API Key from environment variable
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setChatLog((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userInput }] }],
          }),
        }
      );

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      const botMessage = { role: 'model', content: reply };
      setChatLog((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl backdrop-blur-md bg-white/5 p-8 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center">
        
        {/* Intro Section */}
        <h1 className="text-5xl font-extrabold text-center mb-3 font-[sans] tracking-wide">
          AI Virtual Travel Assistant
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mb-6 text-lg">
          Plan your dream vacation with the power of AI. From personalized itineraries to booking flights —
          your smart assistant has got it all covered. 🌍✈️
        </p>

        {/* Input Section */}
        <div className="w-full bg-zinc-800 rounded-full p-1 flex items-center justify-between mb-4 shadow-inner transition-all">
          <input
            type="text"
            placeholder="Ask anything about your trip..."
            className="bg-transparent px-4 py-2 w-full text-white focus:outline-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition duration-300 ease-in-out"
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </div>

        {/* Chat Section */}
        <div className="w-full h-[350px] bg-black/30 border border-gray-600 rounded-xl p-4 overflow-y-auto mb-6 scroll-smooth">
          {chatLog.length === 0 && (
            <p className="text-gray-500 text-center">Ask me anything about your next trip!</p>
          )}
          {chatLog.map((msg, index) => (
            <div
              key={index}
              className={`p-3 mb-3 rounded-lg ${
                msg.role === 'user' ? 'bg-zinc-800 text-white' : 'bg-zinc-700 text-slate-200'
              }`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Gemini'}:</strong>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }}
              />
            </div>
          ))}
          {loading && <p className="text-gray-400">Gemini is typing...</p>}
        </div>

        {/* Features List */}
        <ul className="list-disc text-gray-400 pl-6 text-sm w-full">
          <li>🧠 Smart AI-powered itinerary generation</li>
          <li>🗺️ Category-wise destination exploration</li>
          <li>📍 Map visualizations with GoMaps</li>
          <li>📅 Wishlist calendar to save trip ideas</li>
          <li>✈️ Real-time flight search and bookings</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
