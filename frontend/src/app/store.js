import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import resumePreviewReducer from './resumePreviewSlice/resultPreviewSlice';
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
  whitelist: ['user'], // Persist only 'user' field, avoid persisting loading or errors
};

// 2. Combine reducers (Wrap authReducer with persistReducer)
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  resumePreview: resumePreviewReducer,
});

// 3. Configure the store with root reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // 4. Configure to ignore redux-persist actions during serializable check
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Persistor to persist store state across reloads
export const persistor = persistStore(store);

export default store;
