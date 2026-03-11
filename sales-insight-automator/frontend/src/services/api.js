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
  try {
    // Construct health URL from base URL
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const healthUrl = baseUrl.replace('/api/v1', '') + '/health';
    
    const response = await axios.get(healthUrl);
    return response.data;
  } catch (error) {
    console.error('Health Check Failed:', error.message);
    throw error;
  }
};

export default apiClient;
