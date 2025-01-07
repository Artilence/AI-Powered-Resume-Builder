import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
// Async thunk for submitting resume data
export const createUserProfile = createAsyncThunk(
  'profiles/create',
  async (resumeData, { rejectWithValue }) => {
    try {
      const refresh = await api.post('/refresh/');
      const response = await api.post('/profiles/create/', resumeData);
      console.log(response);

      console.log(response.data);
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

const initialState = {
  userProfiles: [],
  loading: false,
  error: null,
};

const userProfilesSlice = createSlice({
  name: 'userProfiles',
  initialState,
});

export default userProfilesSlice.reducer;
