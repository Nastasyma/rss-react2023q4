import { DetailedCardProps } from '@/components/DetailedCard/DetailedCard';
import { ICard, IData } from './types';
import router, { NextRouter } from 'next/router';
import { vi } from 'vitest';

export const mockCardData: ICard = {
  title: 'Mushroom',
  edibility: 'Edible',
  image: '/mushroom.jpg',
  habitat: ['Forest'],
  season: 'Spring',
  description: 'A delicious mushroom',
  id: 1,
};

export const mockCardsData: ICard[] = [
  {
    id: 1,
    title: 'Card 1',
    edibility: 'Edible',
    image: '/card-image.jpg',
    habitat: [],
    season: 'June',
    description: 'Card description',
  },
  {
    id: 2,
    title: 'Card 2',
    edibility: 'Edible',
    image: '/card-image.jpg',
    habitat: [],
    season: 'June',
    description: 'Card description',
  },
  {
    id: 3,
    title: 'Card 3',
    edibility: 'Edible',
    image: '/card-image.jpg',
    habitat: [],
    season: 'June',
    description: 'Card description',
  },
];

export const mockData: IData = {
  cards: mockCardsData,
  detailedCard: mockCardData,
  totalCount: 10,
  totalPages: 1,
};

export const mockDetails: DetailedCardProps = {
  data: mockCardData,
};

export const mockRouter: NextRouter = {
  ...router,
  query: {},
  pathname: '',
  push: vi.fn(),
};
