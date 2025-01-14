import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const userPersistConfig = {
  key: 'user',
  storage,
  version: 1,
  whitelist: ['currentUser'], // whitelist specific fields to persist. Only persist currentUser, not loading and error states
};

// Persists individual reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Combine the persisted reducers
const rootReducer = combineReducers({
  user: persistedUserReducer,
});

// config store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types from serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
