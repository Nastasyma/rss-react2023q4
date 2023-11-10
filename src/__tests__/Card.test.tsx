import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { describe } from 'node:test';
import Card from '../components/Card/Card';
import { ICard } from '../utils/types';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DetailedCardProvider } from '../context/DetailedCardContext';
import { CardsContext } from '../context/CardsContext';
import '@testing-library/jest-dom';
import CardPage from '../pages/CardPage/CardPage';
import MainSection from '../components/MainSection/MainSection';
import { fetchDetailedCard } from '../utils/api';

const mockCardsData: ICard[] = [
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

describe('Card component', () => {
  it('card component renders the relevant card data', () => {
    const mockCardData: ICard = {
      title: 'Mushroom',
      edibility: 'Edible',
      image: 'mushroom.jpg',
      habitat: ['Forest'],
      season: 'Spring',
      description: 'A delicious mushroom',
      id: 1,
    };

    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <DetailedCardProvider>
          <Card data={mockCardData} />
        </DetailedCardProvider>
      </BrowserRouter>
    );

    expect(getByText('Mushroom')).toBeInTheDocument();
    expect(getByText('Edible')).toBeInTheDocument();
    expect(getByAltText('Mushroom image')).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(
      <BrowserRouter>
        <CardsContext.Provider value={{ cards: mockCardsData, setCards: vi.fn() }}>
          <DetailedCardProvider>
            <Routes>
              <Route path={'/'} element={<MainSection />}>
                <Route path="" element={<CardPage />} />
              </Route>
            </Routes>
          </DetailedCardProvider>
        </CardsContext.Provider>
      </BrowserRouter>
    );

    await waitFor(async () => {
      const cardElement = screen.getAllByTestId('card')[0];
      fireEvent.click(cardElement);
    });

    await waitFor(() => {
      const detailedCardElement = screen.queryByTestId('detailed-card');
      expect(detailedCardElement).toBeInTheDocument();
    });
  });

  vi.mock('../utils/api', () => ({
    fetchCards: vi.fn().mockResolvedValue([
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
    ]),
    fetchDetailedCard: vi.fn().mockImplementation(async () => {
      const data = {
        id: 1,
        title: 'Card 1',
        edibility: 'Edible',
        image: 'card-image.jpg',
        habitat: [],
        season: 'June',
        description: 'Card description',
      };
      return data;
    }),
  }));

  it('clicking on a card triggers an additional API call to fetch detailed information', async () => {
    render(
      <BrowserRouter>
        <CardsContext.Provider value={{ cards: mockCardsData, setCards: vi.fn() }}>
          <DetailedCardProvider>
            <Routes>
              <Route path={'/'} element={<MainSection />}>
                <Route path="" element={<CardPage />} />
              </Route>
            </Routes>
          </DetailedCardProvider>
        </CardsContext.Provider>
      </BrowserRouter>
    );

    await waitFor(async () => {
      const cardElement = screen.getAllByTestId('card')[0];
      fireEvent.click(cardElement);
    });

    expect(fetchDetailedCard).toBeCalled();
  });
});
