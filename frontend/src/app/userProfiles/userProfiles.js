import { createSlice } from '@reduxjs/toolkit';
import { createUserProfile } from './userProfilesAPI';
const initialState = {
  userProfiles: [],
  loading: false,
  error: null,
};

const userProfilesSlice = createSlice({
  name: 'userProfiles',
  initialState,
  reducers: {
    // Define synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(createUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfiles.push(action.payload);
      })
      // Handle rejected state
      .addCase(createUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create profile';
      });
  },
});

export default userProfilesSlice.reducer;
