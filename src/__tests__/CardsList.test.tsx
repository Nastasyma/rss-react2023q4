import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { MockedFunction, beforeEach, expect, it, vi } from 'vitest';
import { mockCardsData } from '../utils/mocks';
import CardsList from '@/components/CardsList/CardsList';
import { NextRouter } from 'next/router';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('CardsList component', () => {
  let pushMock: MockedFunction<NextRouter['push']>;

  beforeEach(() => {
    pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });
  });

  it('renders the specified number of cards', () => {
    render(<CardsList cards={mockCardsData} />);

    const cardElements = screen.getAllByTestId('card');
    expect(cardElements).toHaveLength(3);
  });

  it('displays appropriate message if no cards are present', () => {
    render(<CardsList cards={[]} />);

    const noResultsElement = screen.getByTestId('no-results');
    expect(noResultsElement).toBeInTheDocument();
  });
});
