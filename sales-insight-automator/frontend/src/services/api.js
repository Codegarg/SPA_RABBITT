import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const generateSummary = async (file, email) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('email', email);

  const response = await apiClient.post('/summary/generate', formData);
  return response.data;
};

export const checkHealth = async () => {
  // Ensure we hit the root '/health' port 5000 rather than '/api/v1/health'
  const healthUrl = API_BASE_URL.replace('/api/v1', '') + '/health';
  const response = await axios.get(healthUrl);
  return response.data;
};

export default apiClient;
