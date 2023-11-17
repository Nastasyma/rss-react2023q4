import { render, screen } from '@testing-library/react';
import CardsList from '../components/CardsList/CardsList';
import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { ICard } from '../utils/types';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mockCardsData } from '../utils/mockCards';

const mockStore = configureMockStore();

describe('CardsList component', () => {
  it('renders the specified number of cards', () => {
    const store = mockStore({
      cards: {
        cardsList: mockCardsData,
        isMainLoading: false,
        itemsPerPage: 10,
        page: 1,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardsList />
        </Provider>
      </BrowserRouter>
    );

    const cardElements = screen.getAllByTestId('card');
    expect(cardElements).toHaveLength(3);
  });

  it('displays appropriate message if no cards are present', () => {
    const mockCards: ICard[] = [];

    const store = mockStore({
      cards: {
        cardsList: mockCards,
        isMainLoading: false,
        itemsPerPage: 10,
        page: 1,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardsList />
        </Provider>
      </BrowserRouter>
    );

    const noResultsElement = screen.getByTestId('no-results');
    expect(noResultsElement).toBeInTheDocument();
  });
});
