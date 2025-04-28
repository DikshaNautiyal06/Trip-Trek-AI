import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_GOMAPS_API_KEY;

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          console.error(err);
          setError('Location access denied.');
        }
      );
    } else {
      setError('Geolocation not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            searchTerm
          )}&key=${apiKey}`
        );
        if (res.data.status === 'OK') {
          setSuggestions(res.data.predictions.map((p) => p.description));
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, apiKey]);

  const handleSelect = async (place) => {
    setSearchTerm(place);
    setSuggestions([]);
    setLoading(true);
    setError('');
    setDestination(null);

    try {
      const geoRes = await axios.get(
        `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
          place
        )}&key=${apiKey}`
      );

      if (geoRes.data.status !== 'OK') {
        throw new Error('Failed to fetch destination coordinates.');
      }

      const { lat, lng } = geoRes.data.results[0].geometry.location;

      setDestination({
        name: place,
        address: geoRes.data.results[0].formatted_address,
        lat,
        lng,
      });

      if (userLocation) {
        const distRes = await axios.get(
          `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${userLocation.lat},${userLocation.lng}&destinations=${lat},${lng}&key=${apiKey}`
        );

        if (distRes.data.status === 'OK') {
          const element = distRes.data.rows[0].elements[0];
          setDistance(element.distance.text);
          setDuration(element.duration.text);
        } else {
          throw new Error('Failed to fetch distance.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch destination info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg bg-gray-950 border border-red-500">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">
          🗺️ Destination Finder
        </h1>

        <div className="relative">
          <input
            type="text"
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 border border-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (suggestions.length > 0) {
                  handleSelect(suggestions[0]);
                } else {
                  handleSelect(searchTerm);
                }
              }
            }}
            placeholder="Type a place name..."
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 z-10 bg-gray-800 border border-red-500 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg text-sm">
              {suggestions.map((sugg, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-red-700 cursor-pointer"
                  onClick={() => handleSelect(sugg)}
                >
                  {sugg}
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading && (
          <p className="mt-4 text-red-300 animate-pulse">Loading destination info...</p>
        )}

        {error && (
          <p className="mt-4 text-red-400 font-medium">{error}</p>
        )}

        {destination && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-1 text-red-300">{destination.name}</h2>
            <p className="text-gray-300 mb-2">{destination.address}</p>

            {userLocation && (
              <div className="flex items-center gap-4 text-sm text-gray-200 mb-4">
                <span>📏 Distance: <strong className="text-white">{distance}</strong></span>
                <span>🕒 Duration: <strong className="text-white">{duration}</strong></span>
              </div>
            )}

            <div className="border border-red-500 rounded overflow-hidden h-64">
              <iframe
                title="map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${destination.lat},${destination.lng}&z=14&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
