import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../config/config';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(`Login failed ${err.response.data.error}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <div className='flex gap-5 justify-content items-center mb-5'>
        <label className='text-md font-bold'>Email: </label>
        <input 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          className='border-2 rounded p-1'
        />
      </div>
      <div className='flex gap-5 justify-content items-center mb-5'>
        <label className='text-md font-bold'>Password: </label>
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          className='border-2 rounded p-1'
        />
      </div>
      <button 
        type="submit"
        className="px-6 py-2 bg-green-500 text-purple-900 font-bold rounded hover:bg-green-600 hover:scale-110 cursor-pointer duration-300 transition border-3 border-black"
      >Login</button>
    </form>
  );
}

export default Login;