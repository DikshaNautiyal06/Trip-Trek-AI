import React, { useState } from 'react';
import axios from 'axios';
import airportList from '../data/airports.json'; // ✈️ Airports JSON

const Flights = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAutoComplete = (value, setSuggestions) => {
    const filtered = airportList.filter(
      (airport) =>
        airport.iata.toLowerCase().includes(value.toLowerCase()) ||
        airport.name.toLowerCase().includes(value.toLowerCase()) ||
        airport.city.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const fetchFlights = async () => {
    if (!from || !to) {
      alert('Please select both From and To airports!');
      return;
    }

    setLoading(true);
    const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY; // ✅ From .env
    try {
      const response = await axios.get('http://api.aviationstack.com/v1/flights', {
        params: {
          access_key: API_KEY,
          dep_iata: from.toUpperCase(),
          arr_iata: to.toUpperCase(),
        },
      });

      const flightData = response.data?.data?.slice(0, 5) || [];
      setFlights(flightData);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setFlights([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b0f0f] to-black text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">✈️ Find Your Flight</h2>

        {/* Search Section */}
        <div className="flex flex-wrap gap-4 justify-center mb-10 relative">
          {/* From Airport Input */}
          <div className="w-full sm:w-1/3 relative">
            <input
              type="text"
              placeholder="From (e.g., Delhi)"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                handleAutoComplete(e.target.value, setSuggestionsFrom);
              }}
              className="bg-[#1e1e1e] border border-red-600 text-white px-4 py-3 rounded-md w-full"
            />
            {suggestionsFrom.length > 0 && (
              <ul className="bg-white text-black rounded shadow absolute z-10 w-full mt-1 max-h-48 overflow-y-auto">
                {suggestionsFrom.map((s, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setFrom(s.iata);
                      setSuggestionsFrom([]);
                    }}
                  >
                    {s.city} - {s.name} ({s.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To Airport Input */}
          <div className="w-full sm:w-1/3 relative">
            <input
              type="text"
              placeholder="To (e.g., Mumbai)"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                handleAutoComplete(e.target.value, setSuggestionsTo);
              }}
              className="bg-[#1e1e1e] border border-red-600 text-white px-4 py-3 rounded-md w-full"
            />
            {suggestionsTo.length > 0 && (
              <ul className="bg-white text-black rounded shadow absolute z-10 w-full mt-1 max-h-48 overflow-y-auto">
                {suggestionsTo.map((s, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setTo(s.iata);
                      setSuggestionsTo([]);
                    }}
                  >
                    {s.city} - {s.name} ({s.iata})
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={fetchFlights}
            className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md font-semibold"
          >
            Search Flights
          </button>
        </div>

        {/* Flights Result Section */}
        {loading ? (
          <p className="text-center text-gray-300">🔄 Loading flights...</p>
        ) : (
          <div className="grid gap-6">
            {flights.length > 0 ? (
              flights.map((flight, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-red-500 shadow-lg text-white"
                >
                  <div className="text-xl font-bold mb-2">{flight.airline?.name || 'Unknown Airline'}</div>
                  <p>✈️ Flight: {flight.flight?.iata || 'N/A'} ({flight.flight?.number || 'N/A'})</p>
                  <p>📍 From: {flight.departure?.airport || 'N/A'} ({flight.departure?.iata || 'N/A'})</p>
                  <p>🛬 To: {flight.arrival?.airport || 'N/A'} ({flight.arrival?.iata || 'N/A'})</p>
                  <p>🕓 Departure Time: {flight.departure?.scheduled || 'N/A'}</p>
                  <p>💸 Estimated Price: ₹{Math.floor(Math.random() * 15000 + 4000)}</p>
                  <a
                    href="https://www.makemytrip.com/flights/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-red-300 hover:underline"
                  >
                    🔗 Book Now
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No flights found. Try different airports ✈️</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
