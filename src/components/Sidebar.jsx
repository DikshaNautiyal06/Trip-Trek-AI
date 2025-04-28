import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaPlaneDeparture,
  FaHeart,
  FaMapMarkedAlt,
  FaHome,
  FaRobot,
  FaTags,
  FaSignOutAlt, // Import the logout icon
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate(); // For navigation

  // Function to handle logout
  const handleLogout = () => {
    

    // Redirect to login page
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-red-500 to-orange-400 text-white shadow-lg'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <aside className="w-64 bg-gradient-to-b from-zinc-900 to-gray-800 bg-opacity-80 border-r border-gray-700 shadow-xl p-5 min-h-screen backdrop-blur-md">
      <h1 className="text-3xl font-extrabold text-white mb-10 tracking-widest text-center bg-gradient-to-r from-gray-700 via-gray-800 to-red-500 py-4 px-2 rounded-lg shadow-md shadow-red-300">
        TripTrek AI
      </h1>

      <nav className="space-y-3">
        <NavLink to="/" className={linkClass}>
          <FaHome className="text-lg" /> Home
        </NavLink>
        <NavLink to="/planner" className={linkClass}>
          <FaRobot className="text-lg" /> AI Itinerary Planner
        </NavLink>
        <NavLink to="/categories" className={linkClass}>
          <FaTags className="text-lg" /> Categories
        </NavLink>
        <NavLink to="/destinations" className={linkClass}>
          <FaMapMarkedAlt className="text-lg" /> Destinations
        </NavLink>
        <NavLink to="/wishlist" className={linkClass}>
          <FaHeart className="text-lg" /> Wishlist
        </NavLink>
        <NavLink to="/flights" className={linkClass}>
          <FaPlaneDeparture className="text-lg" /> Flights
        </NavLink>
      </nav>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 mt-10 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
      >
        <FaSignOutAlt className="text-lg" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
