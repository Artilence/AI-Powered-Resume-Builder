import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, fetchUserProfile } from './authAPI';

// 1. Login Thunk (Triggers Login API and Fetch User Profile)
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials); // Call API to log in
      await fetchUserProfile(); // Fetch user after login to hydrate Redux state
      return response.data; // Return user data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

// 2. Fetch user profile (Get user from /me route)
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfile();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Unauthorized');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('persist:root'); // Clear persisted state
    },
  },
  extraReducers: (builder) => {
    builder
      // 3. Login Case
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      })
      // 4. Fetch User Case (After Login or Refresh)
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
