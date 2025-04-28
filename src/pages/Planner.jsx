import React, { useState } from 'react';
import { marked } from 'marked';

const Planner = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [interests, setInterests] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `Generate a ${days}-day itinerary for ${destination}, focusing on interests like ${interests}.
    Break each day into morning, afternoon, and evening activities with proper formatting.`;

    setLoading(true);
    setItinerary('');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
      setItinerary(marked(reply));
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setItinerary('<p>Something went wrong. Please try again.</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-[sans]">🚞 AI Itinerary Planner</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Destination"
          className="p-3 border rounded-md"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of Days"
          className="p-3 border rounded-md"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />
        <textarea
          placeholder="Your interests (e.g. adventure, culture, food)"
          className="p-3 border rounded-md"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </form>

      {itinerary && (
        <div className="bg-gray-100 p-4 rounded-md prose max-w-none">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">📋 Suggested Itinerary</h3>
          <div dangerouslySetInnerHTML={{ __html: itinerary }} />
        </div>
      )}
    </div>
  );
};

export default Planner;
