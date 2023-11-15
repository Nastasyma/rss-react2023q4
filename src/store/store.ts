import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './appStore';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
