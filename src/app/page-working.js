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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #fdf2f8 50%, #dbeafe 100%)',
      padding: '32px 16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              fontSize: '48px',
              animation: 'bounce 2s infinite'
            }}>✨</div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              My Todo List
            </h1>
            <div style={{
              fontSize: '48px',
              animation: 'bounce 2s infinite 0.5s'
            }}>📝</div>
          </div>
          <p style={{
            color: '#6b7280',
            fontSize: '18px',
            marginBottom: '16px'
          }}>
            Organize your tasks beautifully
          </p>
          
          {/* API Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: apiStatus === 'healthy' ? '#10b981' :
                              apiStatus === 'unhealthy' ? '#ef4444' : '#f59e0b',
              animation: apiStatus === 'checking' ? 'pulse 2s infinite' : 'none'
            }} />
            <span style={{color: '#374151'}}>
              {apiStatus === 'healthy' ? '🟢 Local Storage Connected' :
               apiStatus === 'unhealthy' ? '🔴 Local Storage Error' :
               '🟡 Checking Local Storage...'}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            marginBottom: '24px',
            backgroundColor: '#fef2f2',
            borderLeft: '4px solid #ef4444',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{fontSize: '24px'}}>⚠️</span>
              <div>
                <p style={{
                  color: '#991b1b',
                  fontWeight: '500',
                  margin: 0
                }}>
                  {error}
                </p>
                <button 
                  onClick={() => { checkHealth(); loadTodos(); }}
                  style={{
                    color: '#dc2626',
                    textDecoration: 'underline',
                    fontSize: '14px',
                    marginTop: '4px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
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
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          <p style={{marginBottom: '8px'}}>
            Made with <span style={{
              color: '#ef4444',
              animation: 'pulse 2s infinite'
            }}>❤️</span> using Next.js + Local Storage
          </p>
          <p style={{
            fontSize: '12px',
            color: '#9ca3af'
          }}>
            Data Storage: Browser Local Storage | All data is saved locally
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}