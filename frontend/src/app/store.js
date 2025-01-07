// src/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import resumePreviewReducer from './resumePreviewSlice/resultPreviewSlice';
import { authAPI } from './auth/authAPI';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// 1. Define persist configuration for the auth slice
const authPersistConfig = {
  key: 'auth', // Key in storage
  storage, // Storage engine (localStorage)
  whitelist: ['user'], // Only persist the 'user' field
};

// 2. Combine your reducers, wrapping authReducer with persistReducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // Persisted auth slice
  resumePreview: resumePreviewReducer, // Non-persisted resume preview slice
  [authAPI.reducerPath]: authAPI.reducer, // RTK Query's authAPI reducer
});

// 3. Configure the store with the persisted root reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 4. Configure serializableCheck middleware to ignore redux-persist actions
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authAPI.middleware), // Add RTK Query's middleware
});

// 5. Create a persistor linked to the store
export const persistor = persistStore(store);

export default store;
