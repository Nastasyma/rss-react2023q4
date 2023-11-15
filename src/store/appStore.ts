import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { cardsListReducer } from './cardList/cardListSlice';
import { searchTextReducer } from './search/searchTextSlice';

export const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cards: cardsListReducer,
  search: searchTextReducer,
});
