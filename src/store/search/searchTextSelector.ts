import { RootState } from '../store';

export const selectSearchText = (state: RootState): string => state.search.searchText;
