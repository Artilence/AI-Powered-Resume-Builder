// store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'; // Adjust the path as necessary
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

// Persist configuration for the 'auth' slice
const persistConfig = {
  key: 'auth', // The key for localStorage
  storage,
  whitelist: ['user'], // Only persist the 'user' field
};

// Persisted reducer for 'auth' slice
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Combine reducers (add other reducers if you have them)
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  // Add other reducers here
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for Redux Persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

        // Alternatively, ignore specific paths
        ignoredPaths: [],
      },
    }),
});

// Create a persistor linked to the store
const persistor = persistStore(store);

// Export both the store and persistor
export { store, persistor };
