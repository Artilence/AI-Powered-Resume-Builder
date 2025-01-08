import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Protected API instance with credentials
const protectedAPI = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Simple API (No auth required)
export const simpleAPI = axios.create({
  baseURL: '/api',
});

// Refresh logic
const refreshAuthLogic = async (failedRequest) => {
  try {
    const refreshResponse = await simpleAPI.post('/refresh/'); // Request refresh token
    if (refreshResponse.status === 200) {
      failedRequest.response.config._retry = true; // Retry the original request
      return Promise.resolve();
    }
  } catch (error) {
    // Redirect to login if refresh fails
    window.location.href = '/login';
    return Promise.reject(error);
  }
};

// Attach interceptor to retry on 401/403
createAuthRefreshInterceptor(protectedAPI, refreshAuthLogic, {
  statusCodes: [401, 403], // Trigger refresh for both 401 and 403
});

export { protectedAPI };
