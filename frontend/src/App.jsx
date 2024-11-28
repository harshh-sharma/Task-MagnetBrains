import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import './index.css';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import TaskDetail from './pages/TaskDetailPage';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './pages/NotfoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes using PrivateRoute */}
      <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/task/create" element={<PrivateRoute element={CreateTask} />} />
      <Route path="/task/:id" element={<PrivateRoute element={TaskDetail} />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
