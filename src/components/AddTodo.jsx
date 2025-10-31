'use client';

import { useState } from 'react';

export default function AddTodo({ onAdd, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit clicked', { title, description }); // ← Debug log
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    setSubmitting(true);
    setError(null);
    
    try {
      console.log('Calling onAdd...'); // ← Debug log
      await onAdd({ 
        title: title.trim(), 
        description: description.trim() 
      });
      console.log('onAdd success'); // ← Debug log
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Submit error:', error); // ← Debug log
      setError('Failed to add todo. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#374151', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
        <span style={{fontSize: '32px'}}>➕</span>
        Add New Task
      </h2>
      
      {error && (
        <div style={{marginBottom: '16px', background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px', borderRadius: '6px'}}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {/* Title Input */}
        <div>
          <label style={{display: 'block', color: '#374151', fontWeight: '600', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
            Task Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              console.log('Title changed:', e.target.value);
              setTitle(e.target.value);
            }}
            placeholder="What do you need to do?"
            className="input"
            disabled={submitting || loading}
            autoFocus
          />
        </div>

        {/* Description Input */}
        <div>
          <label style={{display: 'block', color: '#374151', fontWeight: '600', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details..."
            rows="3"
            className="input"
            style={{resize: 'none'}}
            disabled={submitting || loading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || loading}
          className="btn-primary"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: submitting || loading ? 0.5 : 1,
            cursor: submitting || loading ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? (
            <>
              <div style={{width: '20px', height: '20px', border: '3px solid white', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'}} />
              Adding...
            </>
          ) : (
            <>
              <span style={{fontSize: '20px'}}>✨</span>
              Add Task
            </>
          )}
        </button>
        
        {/* Debug Info */}
        <div style={{fontSize: '12px', color: '#9ca3af', marginTop: '8px'}}>
          Debug: Title length = {title.length}, Submitting = {submitting ? 'true' : 'false'}
        </div>
      </form>
    </div>
  );
}