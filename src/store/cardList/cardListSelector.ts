import { ICard } from '../../utils/types';
import { RootState } from '../store';

export const selectCards = (state: RootState): ICard[] => state.cards.cardsList;
export const selectIsCardsLoading = (state: RootState): boolean => state.cards.isMainLoading;
export const selectItemsPerPage = (state: RootState): number => state.cards.itemsPerPage;
export const selectPage = (state: RootState): number => state.cards.page;
