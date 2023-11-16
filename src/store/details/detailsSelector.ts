import { RootState } from '../store';

export const selectDetailsId = (state: RootState): number => state.details.cardDetailsId;
export const selectIsDetailsLoading = (state: RootState): boolean => state.details.isLoading;
