'use client';

import { useEffect, useState } from 'react';
import { todoAPI } from '@/lib/api';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import TodoStats from '@/components/TodoStats';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    console.log('=== Component mounted, starting checks ===');
    checkHealth();
    loadTodos();
  }, []);

  const checkHealth = async () => {
    try {
      setApiStatus('checking');
      const result = await todoAPI.healthCheck();
      console.log('Health check result:', result);
      
      if (result.available === true && result.status === 'healthy') {
        setApiStatus('healthy');
        setError(null);
        console.log('Local Storage is healthy and available');
      } else {
        setApiStatus('unhealthy');
        setError(result.message || 'Local Storage is not available');
        console.log('Local Storage is not healthy:', result);
      }
    } catch (err) {
      console.error('Health check failed:', err);
      setApiStatus('unhealthy');
      setError('Cannot access Local Storage.');
    }
  };

  const loadTodos = async () => {
    try {
      setLoading(true);
      const result = await todoAPI.getTodos();
      console.log('Load todos result:', result);
      
      if (result.success === true) {
        setTodos(result.data || []);
        setError(null);
        console.log('Todos loaded successfully:', result.data);
      } else {
        setError(result.message || 'Failed to load todos');
        console.error('Failed to load todos:', result);
      }
    } catch (err) {
      console.error('Error loading todos:', err);
      setError('Error loading todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    try {
      console.log('Adding todo:', title);
      const result = await todoAPI.createTodo(title);
      console.log('Add todo result:', result);
      
      if (result.success === true) {
        await loadTodos();
        console.log('Todo added successfully');
      } else {
        setError(result.message || 'Failed to add todo');
        console.error('Failed to add todo:', result);
      }
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Error adding todo. Please try again.');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      console.log('Updating todo:', id, updates);
      const result = await todoAPI.updateTodo(id, updates);
      console.log('Update todo result:', result);
      
      if (result.success === true) {
        await loadTodos();
        console.log('Todo updated successfully');
      } else {
        setError(result.message || 'Failed to update todo');
        console.error('Failed to update todo:', result);
      }
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Error updating todo. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting todo:', id);
      const result = await todoAPI.deleteTodo(id);
      console.log('Delete todo result:', result);
      
      if (result.success === true) {
        await loadTodos();
        console.log('Todo deleted successfully');
      } else {
        setError(result.message || 'Failed to delete todo');
        console.error('Failed to delete todo:', result);
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Error deleting todo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-5xl animate-bounce">✨</div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Todo List
            </h1>
            <div className="text-5xl animate-bounce">📝</div>
          </div>
          <p className="text-gray-600 text-lg mb-4">Organize your tasks beautifully</p>
          
          {/* API Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                        shadow-sm bg-white border-2 border-gray-200">
            <div className={`w-3 h-3 rounded-full ${
              apiStatus === 'healthy' ? 'bg-green-500 animate-pulse' :
              apiStatus === 'unhealthy' ? 'bg-red-500' :
              'bg-yellow-500 animate-pulse'
            }`} />
            <span className="text-gray-700">
              {apiStatus === 'healthy' ? '🟢 Local Storage Connected' :
               apiStatus === 'unhealthy' ? '🔴 Local Storage Error' :
               '🟡 Checking Local Storage...'}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-red-800 font-medium">{error}</p>
                <button 
                  onClick={() => { checkHealth(); loadTodos(); }}
                  className="text-red-600 underline text-sm mt-1 hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Todo Form */}
        <AddTodo onAdd={handleAdd} loading={loading} />

        {/* Statistics */}
        <TodoStats todos={todos} />

        {/* Todo List */}
        <TodoList 
          todos={todos} 
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p className="mb-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> using Next.js + Local Storage
          </p>
          <p className="text-xs text-gray-400">
            Data Storage: Browser Local Storage | All data is saved locally
          </p>
        </div>
      </div>
    </div>
  );
}