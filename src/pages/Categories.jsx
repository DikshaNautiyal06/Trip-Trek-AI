import React, { useState } from 'react';
import ReligiousImg from '../assets/categories/religious.jpg';
import FamilyImg from '../assets/categories/family.jpg';
import FriendsImg from '../assets/categories/friends.jpg';
import CouplesImg from '../assets/categories/couples.jpg';

const categories = [
  {
    name: 'Religious',
    image: ReligiousImg,
    query: 'churches temples in india pilgrims',
    description: 'Discover holy sites and spiritual places to visit around the world.',
  },
  {
    name: 'Family',
    image: FamilyImg,
    query: 'family travel destinations theme parks beaches zoos places in india',
    description: 'Explore fun and safe travel spots ideal for family vacations.',
  },
  {
    name: 'Friends',
    image: FriendsImg,
    query: 'Rishikesh Kedarkantha',
    description: 'Embark on thrilling journeys with your best buddies.',
  },
  {
    name: 'Couples',
    image: CouplesImg,
    query: 'Switzerland Manali',
    description: 'Find the most romantic escapes for couples and lovers.',
  },
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPexelsImages = async (query) => {
    const API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // 🔥 Now fetching from .env
    setLoading(true);
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = await res.json();
      setImages(data.photos || []);
    } catch (err) {
      console.error('Error fetching Pexels images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (category) => {
    setActiveCategory(category.name);
    fetchPexelsImages(category.query);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">🌐 Explore Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover rounded-t-2xl" />
            <div className="p-4 flex flex-col justify-between h-[200px]">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{cat.description}</p>
              </div>
              <button
                onClick={() => handleViewMore(cat)}
                className="mt-4 bg-indigo-600 text-white text-sm py-2 px-4 rounded hover:bg-indigo-700 transition"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeCategory && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-white mb-4">📸 {activeCategory} Destinations</h3>
          {loading ? (
            <p className="text-gray-500">Loading images...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={img.src.large}
                    alt={img.alt || 'Beautiful destination'}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm text-gray-600 capitalize">
                      {img.alt || 'A beautiful place to explore.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
