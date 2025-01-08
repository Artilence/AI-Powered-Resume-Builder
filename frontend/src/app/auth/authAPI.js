import { createAsyncThunk } from '@reduxjs/toolkit';
import { protectedAPI, simpleAPI } from '../api/api';

//login -> simpe Request -> recieves validated user credentials -> builder:saves them,persists user,change auth state -> Back to Parent Fufnction
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await simpleAPI.post('/login/', credentials);
      return response?.data?.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.detail || 'An unexpected error occurred'
      );
    }
  }
);

// logout -> protected Request -> blacklist_token(backend)->builder:sets user null -> back to Parent Function
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await protectedAPI.post('/logout/');
      return {}; // Empty object indicates successful logout
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.detail || 'Logout failed. Please try again.'
      );
    }
  }
);
