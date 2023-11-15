import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { cardsListReducer } from './cardList/cardListSlice';

export const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cards: cardsListReducer,
});
