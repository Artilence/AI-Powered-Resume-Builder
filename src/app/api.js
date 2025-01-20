// api.js
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Simple API (No auth required)
export const simpleAPI = axios.create({
  baseURL: '/api',
  // withCredentials: true, // Uncomment if needed
});

// Protected API (Requires auth)
export const protectedAPI = axios.create({
  baseURL: '/api',
  withCredentials: true, // Sends cookies with requests
});

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) => {
  return axios
    .post('/api/refresh/', {}, { withCredentials: true })
    .then((response) => {
      // If tokens are stored in cookies, no need to set them manually
      // If you have any in-memory tokens, update them here

      // Optionally, you can log the successful refresh
      console.log('Token refreshed');

      return Promise.resolve();
    })
    .catch((error) => {
      console.error('Refresh token failed:', error);
      // Optionally, redirect to login
      // window.location.href = '/login';
      return Promise.reject(error);
    });
};

// Instantiate the interceptor (attach to protectedAPI)
createAuthRefreshInterceptor(protectedAPI, refreshAuthLogic, {
  statusCodes: [401, 403],
});
