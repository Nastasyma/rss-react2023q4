import { ICard } from '@/utils/types';
import { RootState } from '../store';

export const selectDetails = (state: RootState): ICard => state.details.detailedCard;
