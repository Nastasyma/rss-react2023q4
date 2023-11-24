import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedFunction, beforeEach, expect, it, vi } from 'vitest';
import { describe } from 'node:test';
import Card from '../components/Card/Card';
import '@testing-library/jest-dom';
import MainSection from '../components/MainSection/MainSection';
import { mockCardData, mockData, mockRouter } from '../utils/mocks';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('Card component', () => {
  let pushMock: MockedFunction<NextRouter['push']>;

  beforeEach(() => {
    pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
      query: {
        page: '1',
        search: 'test',
        limit: '4',
        mushroom: '5',
      },
    });
  });

  it('card component renders the relevant card data', () => {
    const { getByText, getByAltText } = render(<Card data={mockCardData} />);

    expect(getByText('Mushroom')).toBeInTheDocument();
    expect(getByText('Edible')).toBeInTheDocument();
    expect(getByAltText('Mushroom image')).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <MainSection data={mockData} />
      </RouterContext.Provider>
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
});
