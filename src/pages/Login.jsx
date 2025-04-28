import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928dab]">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-zinc-700">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">🔐 Welcome Back</h2>
        <p className="text-zinc-400 mb-8 text-center">Login to continue your travel planning adventure</p>
        
        <form className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Continue →
          </button>
        </form>

        <p className="text-sm text-zinc-400 text-center mt-6">
          Don't have an account? <a href="/signup" className="text-red-400 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
