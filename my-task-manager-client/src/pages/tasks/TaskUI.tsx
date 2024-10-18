import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const TaskUI: React.FC = () => {
  const { tasks, addTask, deleteTask, toggleTask, updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
    const {logout} = useAuth()

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      if (isEditing && editTaskId) {
        updateTask(editTaskId, title, description);
        toast.success('Task updated successfully!');
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        
        addTask(title, description);
        toast.success('Task added successfully!');
      }
      setTitle('');
      setDescription('');
    }else {
        toast.error('Please fill in both fields.');
    }
  };

  const handleEditTask = (taskId: string, taskTitle: string, taskDescription: string) => {
    setTitle(taskTitle);
    setDescription(taskDescription);
    setEditTaskId(taskId);
    setIsEditing(true);
    toast.info('Editing task...');
  };

  const handleCancelEdit = () => {
    setTitle('');
    setDescription('');
    setIsEditing(false);
    setEditTaskId(null);
    toast.warn('Task edit cancelled.');
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast.error('Task deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">Task Manager</h1>
            <button onClick={()=>logout() } className='w-[100px] bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition'>Logout</button>
        </div>
        <ToastContainer />
        {/* Task Form */}
        <form onSubmit={handleAddTask} className="mb-6">
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className={`w-full bg-${isEditing ? 'purple' : 'purple'}-600 text-white font-bold py-2 rounded-lg hover:bg-${isEditing ? 'blue' : 'purple'}-700 transition`}
            >
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-600 text-white font-bold py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task.id} className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditTask(task.id, task.title, task.description)}
                  className="px-3 py-1 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskUI;
