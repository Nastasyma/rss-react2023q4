import { render, screen } from '@testing-library/react';
import CardsList from '../components/CardsList/CardsList';
import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { ICard } from '../utils/types';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from '../context/SearchContext';
import { CardsProvider } from '../context/CardsContext';
import { DetailedCardProvider } from '../context/DetailedCardContext';

describe('CardsList component', () => {
  it('renders the specified number of cards', () => {
    const cards: ICard[] = [
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
        <SearchProvider>
          <CardsProvider>
            <DetailedCardProvider>
              <CardsList cards={cards} />
            </DetailedCardProvider>
          </CardsProvider>
        </SearchProvider>
      </BrowserRouter>
    );

    const cardElements = screen.getAllByTestId('card');
    expect(cardElements).toHaveLength(3);
  });

  // it('displays appropriate message if no cards are present', () => {
  //   const cards: ICard[] = [];

  //   render(
  //     <BrowserRouter>
  //       <SearchProvider>
  //         <CardsProvider>
  //           <DetailedCardProvider>
  //             <CardsList cards={cards} />
  //           </DetailedCardProvider>
  //         </CardsProvider>
  //       </SearchProvider>
  //     </BrowserRouter>
  //   );

  //   const noResultsElement = screen.getByTestId('no-results');
  //   expect(noResultsElement).toBeInTheDocument();
  // });
});
