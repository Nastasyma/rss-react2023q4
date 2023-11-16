import { createSlice } from '@reduxjs/toolkit';

type cardDetails = {
  cardDetailsId: number;
  isLoading: boolean;
};

const initialState: cardDetails = {
  cardDetailsId: 0,
  isLoading: false,
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
      const { isLoading } = action.payload;
      state.isLoading = isLoading;
    },
  },
});

export const { reducer: cardDetailsReducer } = cardDetailsSlice;

export const { setCardDetailsId, setIsDetailsLoading } = cardDetailsSlice.actions;
