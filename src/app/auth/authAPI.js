import { createAsyncThunk } from '@reduxjs/toolkit';
import { simpleAPI } from '../api';

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
