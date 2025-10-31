// Test API connection script
const axios = require('axios');

const API_URL = 'https://flask-todo-cicd-el70.onrender.com/api';

console.log('Testing API connection to:', API_URL);

// Test health endpoint
axios.get(`${API_URL}/health`, {
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => {
  console.log('✅ Health check successful:');
  console.log('Status:', response.status);
  console.log('Data:', response.data);
  
  // Test todos endpoint
  return axios.get(`${API_URL}/todos`, {
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    }
  });
})
.then(response => {
  console.log('✅ Todos endpoint successful:');
  console.log('Status:', response.status);
  console.log('Data:', response.data);
})
.catch(error => {
  console.error('❌ API test failed:');
  console.error('Error message:', error.message);
  console.error('Error code:', error.code);
  console.error('Response status:', error.response?.status);
  console.error('Response data:', error.response?.data);
});