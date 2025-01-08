import { createAsyncThunk } from '@reduxjs/toolkit';
import { protectedAPI } from '../api/api';

export const createUserProfile = createAsyncThunk(
  'profiles/create',
  async (newProfileData, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.post(
        '/profiles/create/',
        newProfileData
      );
      return response.data;
    } catch (error) {
      // Check if the error is from the server
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
