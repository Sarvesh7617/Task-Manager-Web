import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config/config';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    axios.get(`${BASE_URL}/api/auth/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setMessage(res.data.message);
      setUser(res.data.user);
    })
    .catch(err => {
      console.error('Auth error:', err);
      navigate('/login');
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToTasks = () => {
    navigate('/tasks');
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Center Content */}
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
          .blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
      <div className="flex-col items-center h-full p-10 text-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Dashboard</h2>
        {user ? (
          <>
            <p className="mb-2 text-red-700 blink text-3xl">{message}</p>
            <p className="text-lg">👤 <strong>{user.name}</strong></p>
            <p className="text-sm text-gray-600">📧 {user.email}</p>

            {/* 🔗 Go to Tasks Button */}
            <div className='flex-col sm:flex-row space-x-4 space-u-4'>
              <button
                onClick={goToTasks}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 border-2 border-black cursor-pointer"
              >
                Go to Tasks
              </button>
              {/*Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer border-2 border-black"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
