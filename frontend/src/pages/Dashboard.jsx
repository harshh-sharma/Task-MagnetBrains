import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask } from '../redux/slices/taskSlice';
import { FaEye, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const tasks = useSelector((store) => store?.task?.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await dispatch(getTasks()); // Fetch tasks from the server
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const deleteTaskById = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(taskId)); // Delete task
        await dispatch(getTasks()); // Refresh tasks after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const updateTaskStatusById = async (taskId, status) => {
    try {
      // await dispatch(updateTaskStatus({ taskId, status }));
      await dispatch(getTasks()); // Refresh task list after status change
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Formats date as dd-mm-yyyy
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold text-center text-white">Your Tasks</h1>
          {/* Create Task Button */}
          <button
            onClick={() => navigate('/task/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-300"
          >
            Create New Task
          </button>
        </div>

        {/* Task Cards Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`bg-gray-800 p-6 rounded-xl shadow-lg border-l-8 transition-transform transform hover:scale-105 hover:shadow-xl ${
                task.priority === 'High'
                  ? 'border-red-500'
                  : task.priority === 'Medium'
                  ? 'border-yellow-500'
                  : 'border-green-500'
              }`}
            >
              <h3 className="text-2xl font-semibold text-white truncate mb-3">{task.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-3 mb-3">{task.description}</p>
              <p className="text-xs text-gray-500 mb-3">Due: {formatDate(task.dueDate)}</p>
              <p
                className={`text-xs ${
                  task.status === 'Completed' ? 'text-green-400' : 'text-yellow-500'
                } mb-4`}
              >
                {task.status}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                {/* View Task */}
                <button
                  onClick={() => navigate(`/task/${task._id}`)}
                  className="text-blue-400 hover:text-blue-500 transition duration-300"
                  title="View Task Details"
                >
                  <FaEye size={20} />
                </button>

                {/* Delete Task */}
                <button
                  onClick={() => deleteTaskById(task._id)}
                  className="text-red-400 hover:text-red-500 transition duration-300"
                  title="Delete Task"
                >
                  <FaTrash size={20} />
                </button>

                {/* Mark as Completed */}
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => updateTaskStatusById(task._id, 'Completed')}
                    className="text-green-400 hover:text-green-500 transition duration-300"
                    title="Mark as Completed"
                  >
                    <FaCheckCircle size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
