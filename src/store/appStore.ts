import { combineReducers } from '@reduxjs/toolkit';
import { CountriesSlice } from './countries/countriesSlice';
import { reactHookFormSlice } from './reactHookForm/reactHookFormSlice';

export const reducer = combineReducers({
  countries: CountriesSlice.reducer,
  reactHookForm: reactHookFormSlice.reducer,
});
