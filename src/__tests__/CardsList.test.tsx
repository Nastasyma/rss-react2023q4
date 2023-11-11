import { render, screen } from '@testing-library/react';
import CardsList from '../components/CardsList/CardsList';
import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';
import { ICard } from '../utils/types';
import { BrowserRouter } from 'react-router-dom';
import { CardsContext } from '../context/CardsContext';
import { DetailedCardProvider } from '../context/DetailedCardContext';

describe('CardsList component', () => {
  it('renders the specified number of cards', () => {
    const mockCards: ICard[] = [
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
      {
        id: 3,
        title: 'Card 3',
        edibility: 'Edible',
        image: 'card-image.jpg',
        habitat: [],
        season: 'June',
        description: 'Card description',
      },
    ];

    render(
      <BrowserRouter>
        <CardsContext.Provider value={{ cards: mockCards, setCards: vi.fn() }}>
          <DetailedCardProvider>
            <CardsList />
          </DetailedCardProvider>
        </CardsContext.Provider>
      </BrowserRouter>
    );

    const cardElements = screen.getAllByTestId('card');
    expect(cardElements).toHaveLength(3);
  });

  it('displays appropriate message if no cards are present', () => {
    const mockCards: ICard[] = [];

    render(
      <BrowserRouter>
        <CardsContext.Provider value={{ cards: mockCards, setCards: vi.fn() }}>
          <DetailedCardProvider>
            <CardsList />
          </DetailedCardProvider>
        </CardsContext.Provider>
      </BrowserRouter>
    );

    const noResultsElement = screen.getByTestId('no-results');
    expect(noResultsElement).toBeInTheDocument();
  });
});
