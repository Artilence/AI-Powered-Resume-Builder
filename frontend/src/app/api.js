import axios from 'axios';

export const simpleAPI = axios.create({
  baseURL: '/api',
});
