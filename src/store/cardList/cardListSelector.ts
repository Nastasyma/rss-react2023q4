import { ICard } from '../../utils/types';
import { RootState } from '../store';

export const selectCards = (state: RootState): ICard[] => state.cards.cardsList;
export const selectTotalCount = (state: RootState): number => state.cards.totalCount;
export const selectTotalPages = (state: RootState): number => state.cards.totalPages;
