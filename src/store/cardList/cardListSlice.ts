import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../utils/types";
import { HYDRATE } from "next-redux-wrapper";

type CardList = {
  cardsList: ICard[];
  totalPages: number;
  totalCount: number;
  isMainLoading: boolean;
};

const initialState: CardList = {
  cardsList: [],
  totalPages: 0,
  totalCount: 0,
  isMainLoading: false,
};

export const cardsListSlice = createSlice({
  name: "cardList",
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

export const { reducer: cardsListReducer } = cardsListSlice;

export const { setCardsList, setIsMainLoading, setTotalPages, setTotalCount } =
  cardsListSlice.actions;
