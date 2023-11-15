import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../../utils/types';

type CardList = {
  cardsList: ICard[];
  isLoading: boolean;
};

const initialState: CardList = {
  cardsList: [],
  isLoading: false,
};

export const cardsListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    setCardsList: (state, action) => {
      const { cardsList } = action.payload;
      state.cardsList = cardsList;
    },
  },
});

export const { reducer: cardsListReducer } = cardsListSlice;

export const { setCardsList } = cardsListSlice.actions;
