import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../../utils/types';

type CardList = {
  cardsList: ICard[];
  itemsPerPage: number;
  page: number;
  isLoading: boolean;
};

const initialState: CardList = {
  cardsList: [],
  itemsPerPage: 0,
  page: 0,
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
    setIsCardsLoading: (state, action) => {
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },
    setItemsPerPage: (state, action) => {
      const { itemsPerPage } = action.payload;
      state.itemsPerPage = itemsPerPage;
    },
    setPage: (state, action) => {
      const { page } = action.payload;
      state.page = page;
    },
  },
});

export const { reducer: cardsListReducer } = cardsListSlice;

export const { setCardsList, setIsCardsLoading, setItemsPerPage, setPage } = cardsListSlice.actions;
