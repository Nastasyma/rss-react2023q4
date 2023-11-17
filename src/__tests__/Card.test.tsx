import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { describe } from 'node:test';
import Card from '../components/Card/Card';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import CardPage from '../pages/CardPage/CardPage';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import MainSection from '../components/MainSection/MainSection';
import { mockCardData, mockCardsData } from '../utils/mockCards';
import { apiSlice } from '../store/apiSlice';

describe('Card component', () => {
  it('card component renders the relevant card data', () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Card data={mockCardData} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Mushroom')).toBeInTheDocument();
    expect(getByText('Edible')).toBeInTheDocument();
    expect(getByAltText('Mushroom image')).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<MainSection />}>
              <Route path="" element={<CardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
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

  it('clicking on a card triggers an additional API call to fetch detailed information', async () => {
    vi.spyOn(apiSlice, 'useGetCardsQuery').mockReturnValue({
      data: {
        cards: mockCardsData,
        totalCount: mockCardsData.length,
      },
      refetch: vi.fn(),
    });

    vi.spyOn(apiSlice, 'useGetDetailedCardQuery').mockReturnValue({
      data: mockCardData,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<MainSection />}>
              <Route path="" element={<CardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const cardElement = screen.getAllByTestId('card')[0];
      fireEvent.click(cardElement);
    });

    await waitFor(() => expect(apiSlice.useGetDetailedCardQuery).toHaveBeenCalled());
  });
});
