"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(register({ username: name, email, password }));
      console.log('response', response);

      if (response?.payload?.success) {
        toast.success('Registration successful!');
        navigate('/dashboard');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
        console.log('error',error);
        
    //   toast.error('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Create Account</h1>
        <p className="text-gray-400 text-center mb-6">Please fill out the form to create a new account</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 px-4 py-3 rounded-lg text-white placeholder-gray-400 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 px-4 py-3 rounded-lg text-white placeholder-gray-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 px-4 py-3 rounded-lg text-white placeholder-gray-400 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 px-4 py-3 rounded-lg text-white placeholder-gray-400 transition-all"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border text-white border-2 border-t-transparent rounded-full w-6 h-6 inline-block mr-3 animate-spin"></span>
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="flex justify-between mt-4 text-gray-400 text-sm">
          <a href="/login" className="hover:text-white">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
