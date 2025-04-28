import React from 'react';

const Signup = () => {
  return (
    <div className="text-white flex items-center justify-center h-screen">
      <div className="bg-zinc-900 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 w-full p-2 rounded text-white font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
