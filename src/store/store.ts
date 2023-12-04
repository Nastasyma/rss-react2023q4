import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './appStore';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
