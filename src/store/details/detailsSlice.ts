import { ICard } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

type cardDetails = {
  detailedCard: ICard;
};

const initialState: cardDetails = {
  detailedCard: {
    id: 0,
    title: '',
    edibility: '',
    image: '',
    habitat: [],
    season: '',
    description: '',
  },
};

export const cardDetailsSlice = createSlice({
  name: 'cardDetails',
  initialState,
  reducers: {
    setDetailedCard: (state, action) => {
      const { detailedCard } = action.payload;
      state.detailedCard = detailedCard;
    },
  },
});

export const { reducer: cardDetailsReducer } = cardDetailsSlice;

export const { setDetailedCard } = cardDetailsSlice.actions;
