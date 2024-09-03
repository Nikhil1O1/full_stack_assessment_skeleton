import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import homesReducer from '../features/homes/homesSlice';
import { usersApi } from '../features/users/usersApi';
import { homesApi } from '../features/homes/homesApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    homes: homesReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [homesApi.reducerPath]: homesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, homesApi.middleware),
});

// setupListeners(store.dispatch)