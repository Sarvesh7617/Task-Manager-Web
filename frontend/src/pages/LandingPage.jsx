import { useNavigate } from 'react-router-dom';
import React from 'react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Task Manager</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Manage your tasks, assign them to team members, and track progress in real-time.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-110 cursor-pointer duration-300 transition border-3 border-black"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 hover:scale-110 cursor-pointer duration-300 transition border-3 border-black"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
