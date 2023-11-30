import { RootState } from '../store';

export const selectCountries = (state: RootState): string[] => state.countries.countries;
