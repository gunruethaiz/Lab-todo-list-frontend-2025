// Local Storage API - ไม่ต้องเชื่อมต่อ backend
const STORAGE_KEY = 'todo-list-data';

// Helper functions สำหรับ Local Storage
const getStoredTodos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const setStoredTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
};

// Simulate API delay สำหรับ realistic experience
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const todoAPI = {
  getTodos: async () => {
    console.log('Getting todos from localStorage...');
    await delay(300); // จำลอง network delay
    
    const todos = getStoredTodos();
    console.log('Retrieved todos:', todos);
    
    return {
      success: true,
      data: todos,
      count: todos.length,
      message: 'Data loaded from Local Storage'
    };
  },

  createTodo: async (todo) => {
    console.log('Creating todo in localStorage:', todo);
    await delay(500);
    
    const todos = getStoredTodos();
    const newTodo = {
      id: Date.now(), // ใช้ timestamp เป็น ID
      title: todo.title,
      description: todo.description || '',
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const updatedTodos = [...todos, newTodo];
    
    if (setStoredTodos(updatedTodos)) {
      console.log('Todo created successfully:', newTodo);
      return {
        success: true,
        data: newTodo,
        message: 'Todo saved to Local Storage'
      };
    } else {
      throw new Error('Failed to save todo to localStorage');
    }
  },

  updateTodo: async (id, updates) => {
    console.log('Updating todo in localStorage:', id, updates);
    await delay(400);
    
    const todos = getStoredTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    const updatedTodo = {
      ...todos[todoIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    
    if (setStoredTodos(updatedTodos)) {
      console.log('Todo updated successfully:', updatedTodo);
      return {
        success: true,
        data: updatedTodo,
        message: 'Todo updated in Local Storage'
      };
    } else {
      throw new Error('Failed to update todo in localStorage');
    }
  },

  deleteTodo: async (id) => {
    console.log('Deleting todo from localStorage:', id);
    await delay(300);
    
    const todos = getStoredTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    const updatedTodos = todos.filter(todo => todo.id !== id);
    
    if (setStoredTodos(updatedTodos)) {
      console.log('Todo deleted successfully:', id);
      return {
        success: true,
        data: { id },
        message: 'Todo deleted from Local Storage'
      };
    } else {
      throw new Error('Failed to delete todo from localStorage');
    }
  },

  healthCheck: async () => {
    console.log('Local Storage health check...');
    await delay(200);
    
    try {
      // ทดสอบการเข้าถึง localStorage
      const testKey = 'test-local-storage';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      
      return {
        status: 'healthy',
        available: true,
        storage: 'localStorage',
        message: 'Local Storage is working perfectly'
      };
    } catch (error) {
      return {
        status: 'error',
        available: false,
        storage: 'localStorage',
        message: 'Local Storage is not available',
        error: error.message
      };
    }
  },

  // เพิ่มฟังก์ชันสำหรับการจัดการข้อมูล
  clearAllTodos: async () => {
    console.log('Clearing all todos from localStorage...');
    await delay(300);
    
    if (setStoredTodos([])) {
      return {
        success: true,
        message: 'All todos cleared from Local Storage'
      };
    } else {
      throw new Error('Failed to clear todos from localStorage');
    }
  },

  exportTodos: () => {
    const todos = getStoredTodos();
    return {
      data: todos,
      exported_at: new Date().toISOString(),
      total: todos.length
    };
  },

  importTodos: async (todosData) => {
    console.log('Importing todos to localStorage:', todosData);
    await delay(500);
    
    if (Array.isArray(todosData)) {
      const importedTodos = todosData.map((todo, index) => ({
        ...todo,
        id: todo.id || Date.now() + index,
        created_at: todo.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      if (setStoredTodos(importedTodos)) {
        return {
          success: true,
          data: importedTodos,
          message: `${importedTodos.length} todos imported to Local Storage`
        };
      }
    }
    
    throw new Error('Failed to import todos');
  }
};