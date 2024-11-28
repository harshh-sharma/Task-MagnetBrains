import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../redux/slices/taskSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const tasks = useSelector((store) => store?.task?.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await dispatch(getTasks());
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  if (loading)
    return (
      <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
      <Navbar />
      <main className="p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        {tasks && tasks.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-center sm:text-left">
              Welcome to Your Tasks
            </h1>
            <button
              onClick={() => navigate('/task/create')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 w-full sm:w-auto"
            >
              Create Task
            </button>
          </div>
        )}

        {/* Tasks Section */}
        {tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 border-l-4 ${
                  task.priority === 'High'
                    ? 'border-red-500'
                    : task.priority === 'Medium'
                    ? 'border-yellow-500'
                    : 'border-green-500'
                }`}
              >
                <h3 className="text-md sm:text-lg font-bold mb-2 truncate">{task.title}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-semibold ${
                      task.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                    }`}
                  >
                    {task.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(`View Task ${task._id}`)}
                      className="text-blue-500 hover:text-blue-600 text-lg"
                      title="View Task"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => alert(`Delete Task ${task._id}`)}
                      className="text-red-500 hover:text-red-600 text-lg"
                      title="Delete Task"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-4">
              No tasks found!
            </h2>
            <p className="text-gray-400 mb-6 sm:mb-8">
              It looks like you don’t have any tasks yet.
            </p>
            <button
              onClick={() => navigate('/task/create')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
            >
              Create Your First Task
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
