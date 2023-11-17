import { createSlice } from '@reduxjs/toolkit';

type cardDetails = {
  cardDetailsId: number;
  isDetailsLoading: boolean;
};

const initialState: cardDetails = {
  cardDetailsId: 0,
  isDetailsLoading: false,
};

export const cardDetailsSlice = createSlice({
  name: 'cardDetails',
  initialState,
  reducers: {
    setCardDetailsId: (state, action) => {
      const { cardDetailsId } = action.payload;
      state.cardDetailsId = cardDetailsId;
    },
    setIsDetailsLoading: (state, action) => {
      const { isDetailsLoading } = action.payload;
      state.isDetailsLoading = isDetailsLoading;
    },
  },
});

export const { reducer: cardDetailsReducer } = cardDetailsSlice;

export const { setCardDetailsId, setIsDetailsLoading } = cardDetailsSlice.actions;
