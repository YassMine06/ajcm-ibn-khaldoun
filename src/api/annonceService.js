import apiClient from './apiClient';

/**
 * Annonce Service
 */
const annonceService = {
  getAll: () => apiClient.get('/annonces'),
  
  create: (data) => apiClient.post('/annonces', data),
  
  update: (id, data) => apiClient.put(`/annonces/${id}`, data),
  
  delete: (id) => apiClient.delete(`/annonces/${id}`),
};

export default annonceService;
