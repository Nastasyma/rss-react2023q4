import { describe } from 'node:test';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi, expect, it } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainSection from '../components/MainSection/MainSection';
import CardPage from '../pages/CardPage/CardPage';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { store } from '../store/store';
import thunk from 'redux-thunk';
import { mockCardData } from '../utils/mockCards';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { apiSlice } from '../store/apiSlice';

setupListeners(store.dispatch);
const mockStore = configureMockStore([thunk]);

describe('DetailedCard component', () => {
  it('displays a loading indicator while fetching data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path={'/'} element={<MainSection />}>
              <Route path="" element={<CardPage />} />
            </Route>
          </Routes>
        </Provider>
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

  it('correctly displays the detailed card data', async () => {
    const detailsStore = mockStore({
      details: {
        cardDetailsId: 1,
        isLoading: false,
      },
    });

    vi.spyOn(apiSlice, 'useGetDetailedCardQuery').mockReturnValue({
      data: mockCardData,
      refetch: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Provider store={detailsStore}>
          <DetailedCard />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockCardData.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockCardData.title} image`)).toBeInTheDocument();
  });

  it('hides the component when close button is clicked', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path={'/'} element={<MainSection />}>
              <Route path="" element={<CardPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    );

    await waitFor(async () => {
      fireEvent.click(screen.getAllByTestId('card')[0]);
    });

    await waitFor(async () => {
      expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close'));
    });

    await waitFor(() => {
      expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
    });
  });
});
