import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../../utils/types';

type CardList = {
  cardsList: ICard[];
  itemsPerPage: number;
  page: number;
  isMainLoading: boolean;
};

const initialState: CardList = {
  cardsList: [],
  itemsPerPage: 0,
  page: 0,
  isMainLoading: false,
};

export const cardsListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    setCardsList: (state, action) => {
      const { cardsList } = action.payload;
      state.cardsList = cardsList;
    },
    setIsMainLoading: (state, action) => {
      const { isMainLoading } = action.payload;
      state.isMainLoading = isMainLoading;
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

export const { setCardsList, setIsMainLoading, setItemsPerPage, setPage } = cardsListSlice.actions;
