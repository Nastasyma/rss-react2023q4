import { RootState } from '../store';

export const selectDetailsId = (state: RootState): number => state.details.cardDetailsId;
