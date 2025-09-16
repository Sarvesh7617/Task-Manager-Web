import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import LandingPage from './pages/LandingPage';
import { ToastContainer} from 'react-toastify';
import './index.css';

function App() {
  return (
    <>
    <ToastContainer position="top-center" autoClose={3000}/>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
