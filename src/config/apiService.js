// apiService.js or apiService.ts

import axios from 'axios';
import API_CONFIG from './apiConfig';

const apiService = axios.create({
  baseURL: API_CONFIG.baseURL,
  imageUrl: API_CONFIG.imageUrl,
});

export default apiService;
