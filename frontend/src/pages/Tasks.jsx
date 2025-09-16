import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import {BASE_URL} from "../config/config";


function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium' });
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', assignee: '', keyword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const token = localStorage.getItem('token');

  const socket = io(`${BASE_URL}`);

  const fetchUsers = async () => {
    const res = await axios.get(`${BASE_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data.users);
  };


  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };



  const applyFilters = async () => {
    const params = new URLSearchParams(filters);
    const res = await axios.get(`${BASE_URL}/api/tasks?${params}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data.tasks);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/tasks`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task added successfully!');
      setForm({ title: '', description: '', priority: 'Medium' });
      fetchTasks();
    } catch (error) {
      toast.error('Failed to add task');
    }
  };


  const updateStatus = async (id, newStatus) => {
  try {
      await axios.put(`${BASE_URL}/api/tasks/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task updated!');
      fetchTasks();
  } catch (error) {
    toast.error('Failed to update task');
  }
};


const deleteTask = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success('Task deleted!');
    fetchTasks();
  } catch (error) {
    toast.error('Failed to delete task');
  }
};


  useEffect(() => {
    fetchTasks();
    fetchUsers();
    socket.on('taskCreated', () => fetchTasks());
    socket.on('taskUpdated', () => fetchTasks());
    socket.on('taskDeleted', () => fetchTasks());

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Task Manager</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-md mx-auto mt-6">
          <h2 className="text-xl font-bold text-center">Add Task</h2>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            name="assignee"
            value={form.assignee}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Assign to</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition border-2 border-black cursor-pointer"
          >
            Add Task
          </button>
        </form>


        <div className='flex-col sm:flex-row space-x-2 space-y-4'>
          <input 
            name="keyword" 
            placeholder="Search..." 
            onChange={handleFilterChange}
            className='border-2 border-black rounded p-1'
          />

          <select 
            name="status" 
            onChange={handleFilterChange}
            className='border-2 border-black p-1 rounded'
          >
            <option value="">Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>


          <select 
            name="priority" 
            onChange={handleFilterChange}
            className='border-2 border-black p-1 rounded'
          >
            <option value="">Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>


          <select 
            name="assignee" 
            onChange={handleFilterChange}
            className='border-2 border-black p-1 rounded'
          >
            <option value="">Assignee</option>
            {Array.isArray(users) ? (
              users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))
            ) : (
              <option disabled>No users found</option>
            )}
          </select>


          <button 
            onClick={applyFilters}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer border-2 border-black"
          >Apply Filters</button>
        </div>
      </div>
      <div className="mt-8 max-w-2xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
        <ul className="mt-8 space-y-4 max-w-2xl mx-auto">
          {Array.isArray(tasks) ? (
            tasks.map(task => (
            <li key={task._id} className="bg-gray-100 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm mt-1"
                >
                  Status: 
                  <span 
                    className={`px-2 py-1 rounded text-white text-xs ${
                    task.status === 'Completed' ? 'bg-green-500' :
                    task.status === 'In Progress' ? 'bg-yellow-500' :
                    'bg-gray-500'
                    }`}>
                      {task.status}
                  </span>
                </p>
                <p className="text-sm">Priority: <span className="font-medium">{task.priority}</span></p>
                <p className="text-sm">Assignee: <span className="font-medium">{task.assignee?.name || 'Unassigned'}</span></p>
              </div>

              <div className="mt-4 md:mt-0 flex gap-2">
                <button
                  onClick={() => updateStatus(task._id, 'In Progress')}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Start
                </button>
                <button
                  onClick={() => updateStatus(task._id, 'Completed')}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
          ) : (
            <p className="text-center text-red-500">Invalid task data</p>
          )}
        </ul>
        )}
      </div>

    </div>
  );
}



export default Tasks;