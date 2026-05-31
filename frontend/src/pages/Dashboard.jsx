import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Loader2 } from 'lucide-react';
import TaskBoard from '../components/TaskBoard';
import TaskModal from '../components/TaskModal';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axios.post('/tasks', taskData);
      setTasks([response.data, ...tasks]);
      toast.success('Task created successfully');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map(t => t.id === id ? response.data : t));
      toast.success('Task updated');
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update
    const previousTasks = [...tasks];
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    try {
      await axios.put(`/tasks/${id}`, { status: newStatus });
    } catch (error) {
      // Revert on failure
      setTasks(previousTasks);
      toast.error('Failed to change status');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const todoCount = tasks.filter(t => t.status === 'Todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const doneCount = tasks.filter(t => t.status === 'Done').length;

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
          <div className="flex gap-4 mt-2 text-sm text-slate-600">
            <span className="bg-white px-2 py-1 rounded border border-slate-200">Total: {tasks.length}</span>
            <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">Todo: {todoCount}</span>
            <span className="bg-brand-50 text-brand-700 px-2 py-1 rounded border border-brand-100">In Progress: {inProgressCount}</span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">Done: {doneCount}</span>
          </div>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
        </div>
      ) : (
        <TaskBoard
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
          onEdit={openEditModal}
        />
      )}

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={closeEditModal}
          onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
