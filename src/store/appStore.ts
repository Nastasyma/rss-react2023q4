import { combineReducers } from '@reduxjs/toolkit';
import { CountriesSlice } from './countries/countriesSlice';

export const reducer = combineReducers({
  countries: CountriesSlice.reducer,
});
