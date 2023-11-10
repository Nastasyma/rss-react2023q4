import { ICard } from './types';

export const mockCardData: ICard = {
  title: 'Card 1',
  edibility: 'Edible',
  image: 'mushroom.jpg',
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
    image: 'card-image.jpg',
    habitat: [],
    season: 'June',
    description: 'Card description',
  },
  {
    id: 2,
    title: 'Card 2',
    edibility: 'Edible',
    image: 'card-image.jpg',
    habitat: [],
    season: 'June',
    description: 'Card description',
  },
];
