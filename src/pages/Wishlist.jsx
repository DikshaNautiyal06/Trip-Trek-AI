import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css'; // Make sure this includes the custom calendar styling below

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [place, setPlace] = useState('');
  const [visitDate, setVisitDate] = useState(new Date());

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAdd = () => {
    if (!place.trim()) return;
    const newWish = { place, date: visitDate.toDateString() };
    setWishlist([...wishlist, newWish]);
    setPlace('');
    setVisitDate(new Date());
  };

  const handleRemove = (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    setWishlist(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b0f0f] to-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-[#1c1c1c] p-6 rounded-2xl shadow-lg border border-red-700">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 font-[poppins]">📋 Wishlist</h2>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter place (e.g., Goa)"
            className="bg-[#2b2b2b] text-white border border-red-700 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <DatePicker
            selected={visitDate}
            onChange={(date) => setVisitDate(date)}
            className="bg-[#2b2b2b] text-white border border-red-700 p-2 rounded-md"
            calendarClassName="dark-datepicker"
            popperClassName="z-50"
          />
          <button
            onClick={handleAdd}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Add
          </button>
        </div>

        {wishlist.length > 0 ? (
          <div className="space-y-4">
            {wishlist.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#3a0f0f] border-l-4 border-red-600 p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold">{item.place}</h4>
                  <p className="text-sm text-gray-300">📅 Planned Date: {item.date}</p>
                </div>
                <button
                  onClick={() => handleRemove(idx)}
                  className="text-sm text-red-400 hover:text-red-600 transition"
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-6">No places added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
