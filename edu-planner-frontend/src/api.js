import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Zmień na swój backendowy URL, jeśli jest inny
});

export default api;