import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Planner from './pages/Planner';
import Categories from './pages/Categories';
import Destinations from './pages/Destinations';
import Wishlist from './pages/Wishlist';
import Flights from './pages/Flights';
import Login from './pages/Login';         // 👈 import login
import Signup from './pages/Signup';       // 👈 import signup

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#2b0f0f] to-black text-black">
      {!isAuthPage && <Sidebar />}

      <div className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
