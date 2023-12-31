import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { cardsListReducer } from './cardList/cardListSlice';
import { cardDetailsReducer } from './details/detailsSlice';

export const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cards: cardsListReducer,
  details: cardDetailsReducer,
});
