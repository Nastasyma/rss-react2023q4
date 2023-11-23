import { createSlice } from '@reduxjs/toolkit';

type cardDetails = {
  cardDetailsId: number;
};

const initialState: cardDetails = {
  cardDetailsId: 0,
};

export const cardDetailsSlice = createSlice({
  name: 'cardDetails',
  initialState,
  reducers: {
    setCardDetailsId: (state, action) => {
      const { cardDetailsId } = action.payload;
      state.cardDetailsId = cardDetailsId;
    },
  },
});

export const { reducer: cardDetailsReducer } = cardDetailsSlice;

export const { setCardDetailsId } = cardDetailsSlice.actions;
