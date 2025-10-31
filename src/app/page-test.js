'use client';

import { useEffect, useState } from 'react';

// ลองไม่ import component ก่อน เพื่อทดสอบ
// import { todoAPI } from '@/lib/api';
// import AddTodo from '@/components/AddTodo';
// import TodoList from '@/components/TodoList';
// import TodoStats from '@/components/TodoStats';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    console.log('=== Component mounted, starting API checks ===');
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
      
      // Local Storage จะมี success = true เสมอ
      if (result.success === true) {
        setTodos(result.data || []);
        setError(null);
        console.log('Loaded data from Local Storage:', result.data?.length, 'todos');
      } else {
        setTodos([]);
        setError('Failed to load todos from Local Storage');
      }
    } catch (err) {
      console.error('Load todos error:', err);
      setError('Failed to load todos from Local Storage.');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todo) => {
    try {
      console.log('Adding todo:', todo);
      const result = await todoAPI.createTodo(todo);
      console.log('Add todo result:', result);
      
      if (result.success) {
        // รีโหลดข้อมูลจาก Local Storage
        await loadTodos();
      } else {
        throw new Error(result.message || 'Failed to add todo');
      }
    } catch (err) {
      console.error('Add todo error:', err);
      alert('Failed to add todo: ' + err.message);
      throw err;
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      console.log('Updating todo:', id, updates);
      const result = await todoAPI.updateTodo(id, updates);
      console.log('Update todo result:', result);
      
      if (result.success) {
        // รีโหลดข้อมูลจาก Local Storage
        await loadTodos();
      } else {
        throw new Error(result.message || 'Failed to update todo');
      }
    } catch (err) {
      console.error('Update todo error:', err);
      alert('Failed to update todo: ' + err.message);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting todo:', id);
      const result = await todoAPI.deleteTodo(id);
      console.log('Delete todo result:', result);
      
      if (result.success) {
        // รีโหลดข้อมูลจาก Local Storage
        await loadTodos();
      } else {
        throw new Error(result.message || 'Failed to delete todo');
      }
    } catch (err) {
      console.error('Delete todo error:', err);
      alert('Failed to delete todo: ' + err.message);
      throw err;
    }
  };

  return (
    <div className="gradient-bg" style={{minHeight: '100vh', padding: '32px 16px'}}>
      <div style={{maxWidth: '1024px', margin: '0 auto'}}>
        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px'}}>
            <div style={{fontSize: '48px'}} className="animate-bounce">✨</div>
            <h1 style={{
              fontSize: '48px', 
              fontWeight: 'bold', 
              background: 'linear-gradient(to right, #667eea, #764ba2)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              My Todo List
            </h1>
            <div style={{fontSize: '48px'}} className="animate-bounce">📝</div>
          </div>
          <p style={{color: '#666', fontSize: '18px', marginBottom: '16px'}}>Organize your tasks beautifully</p>
          
          {/* API Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                        shadow-sm bg-white border-2 border-gray-200">
            <div style={{
              width: '12px', 
              height: '12px', 
              borderRadius: '50%',
              background: apiStatus === 'healthy' ? '#10b981' : 
                         apiStatus === 'unhealthy' ? '#ef4444' : '#f59e0b',
              animation: apiStatus === 'checking' ? 'pulse 2s infinite' : 'none'
            }} />
            <span style={{color: '#374151'}}>
              {apiStatus === 'healthy' ? '🟢 Local Storage Ready' :
               apiStatus === 'unhealthy' ? '🔴 Local Storage Error' :
               '🟡 Checking Local Storage...'}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card" style={{
            marginBottom: '24px', 
            background: apiStatus === 'healthy' ? '#f0f9ff' : '#fef2f2', 
            borderLeft: `4px solid ${apiStatus === 'healthy' ? '#3b82f6' : '#ef4444'}`
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span style={{fontSize: '24px'}}>{apiStatus === 'healthy' ? 'ℹ️' : '⚠️'}</span>
              <div>
                <p style={{color: apiStatus === 'healthy' ? '#1e40af' : '#991b1b', fontWeight: '500'}}>{error}</p>
                <button 
                  onClick={() => { 
                    console.log('=== Manual retry clicked ===');
                    checkHealth(); 
                    loadTodos(); 
                  }}
                  style={{
                    color: apiStatus === 'healthy' ? '#2563eb' : '#dc2626', 
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
                <div style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                  API Status: {apiStatus} | Current URL: {process.env.NEXT_PUBLIC_API_URL || 'https://flask-todo-cicd-el70.onrender.com/api'}
                </div>
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
        <div style={{marginTop: '48px', textAlign: 'center', color: '#6b7280', fontSize: '14px'}}>
          <p style={{marginBottom: '8px'}}>
            Made with <span style={{color: '#ef4444'}}>❤️</span> using Next.js + Local Storage
          </p>
          <p style={{fontSize: '12px', color: '#9ca3af'}}>
            Data Storage: Browser Local Storage | All data is saved locally
          </p>
        </div>
      </div>
    </div>
  );
}