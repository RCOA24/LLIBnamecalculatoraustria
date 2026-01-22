import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  getAll: async () => {
    const response = await apiClient.get('/calculations');
    return response.data;
  },
  
  create: async (fullName) => {
    const response = await apiClient.post('/calculations', { full_name: fullName });
    return response.data;
  },

  update: async (id, fullName) => {
    const response = await apiClient.put(`/calculations/${id}`, { full_name: fullName });
    return response.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/calculations/${id}`);
  }
};
