import apiClient from './apiClient';

/**
 * User Service
 */
const userService = {
  getAll: () => apiClient.get('/users'),

  getById: (id) => apiClient.get(`/users/${id}`),

  create: (userData) => apiClient.post('/users', userData),

  update: (id, userData) => apiClient.put(`/users/${id}`, userData),

  delete: (id) => apiClient.delete(`/users/${id}`)
};

export default userService;
