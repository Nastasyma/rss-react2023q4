import { describe } from 'node:test';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DetailedCardContext, DetailedCardProvider } from '../context/DetailedCardContext';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { CardsContext } from '../context/CardsContext';
import MainSection from '../components/MainSection/MainSection';
import CardPage from '../pages/CardPage/CardPage';
import { mockCardData, mockCardsData } from '../utils/mockCards';

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

describe('DetailedCard', () => {
  it('displays a loading indicator while fetching data', async () => {
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

    await waitFor(() => {
      expect(screen.getAllByTestId('card')[0]).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByTestId('card')[0]);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-icon')).toBeInTheDocument();
    });
  });

  it('correctly displays the detailed card data', () => {
    render(
      <BrowserRouter>
        <DetailedCardContext.Provider value={{ card: mockCardData, setCard: vi.fn() }}>
          <DetailedCard />
        </DetailedCardContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(mockCardData.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockCardData.title} image`)).toBeInTheDocument();
  });

  it('hides the component when close button is clicked', async () => {
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
      fireEvent.click(screen.getAllByTestId('card')[0]);
    });

    expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
    });
  });
});
