import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './appStore';
import { apiSlice } from './apiSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = () =>
  configureStore({
    reducer: reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(store, { debug: false });
