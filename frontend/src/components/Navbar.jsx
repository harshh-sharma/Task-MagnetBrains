import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/dashboard" className="text-2xl font-bold">
          Task Manager
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-all"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-icons text-white">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden flex flex-col space-y-4">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
