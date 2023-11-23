import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../../utils/types';
import { HYDRATE } from 'next-redux-wrapper';

type CardList = {
  cardsList: ICard[];
  totalPages: number;
  totalCount: number;
};

const initialState: CardList = {
  cardsList: [],
  totalPages: 0,
  totalCount: 0,
};

export const cardsListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    setCardsList: (state, action) => {
      const { cardsList } = action.payload;
      state.cardsList = cardsList;
    },
    setTotalPages: (state, action) => {
      const { totalPages } = action.payload;
      state.totalPages = totalPages;
    },
    setTotalCount: (state, action) => {
      const { totalCount } = action.payload;
      state.totalCount = totalCount;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cardsList,
      };
    },
  },
});

export const { reducer: cardsListReducer, actions } = cardsListSlice;

export const { setCardsList, setTotalPages, setTotalCount } = cardsListSlice.actions;
