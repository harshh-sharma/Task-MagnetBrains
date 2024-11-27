import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
    <div>
      <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded mr-4">Login</Link>
      <Link to="/register" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded">Register</Link>
    </div>
  </div>
);

export default Home;
