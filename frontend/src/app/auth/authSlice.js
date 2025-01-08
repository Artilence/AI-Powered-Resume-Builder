import { createSlice } from '@reduxjs/toolkit';
import { logoutUser, loginUser } from './authAPI';
//Auth Logic
//login -> user logins -> user persisted->isauthenticated will be refreshed to false everytime user came back
//or refreshes.
//our protected route is based on isauthenticated

//logout -> blacklist token at backend -> reset all persisted state ->navigated to login
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Successful login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      // Login failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Handle successful logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
