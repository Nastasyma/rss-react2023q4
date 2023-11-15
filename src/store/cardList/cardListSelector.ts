import { ICard } from '../../utils/types';
import { RootState } from '../store';

export const selectCards = (state: RootState): ICard[] => state.cards.cardsList;
