import { combineReducers } from '@reduxjs/toolkit';
import { CountriesSlice } from './countries/countriesSlice';
import { formSlice } from './form/formSlice';

export const reducer = combineReducers({
  countries: CountriesSlice.reducer,
  form: formSlice.reducer,
});
