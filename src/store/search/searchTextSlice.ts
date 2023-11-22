import { createSlice } from '@reduxjs/toolkit';

type Search = {
  searchText: string;
};

const isBrowser = typeof window !== 'undefined';

const initialState: Search = {
  searchText: isBrowser ? localStorage.getItem('search-text-mushrooms') || '' : '',
};

export const searchTextSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      const { searchText } = action.payload;
      state.searchText = searchText;
    },
  },
});

export const { reducer: searchTextReducer } = searchTextSlice;

export const { setSearchText } = searchTextSlice.actions;
