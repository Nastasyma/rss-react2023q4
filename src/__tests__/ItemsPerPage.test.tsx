import { render, screen, fireEvent } from '@testing-library/react';
import { describe } from 'node:test';
import { MockedFunction, beforeEach, expect, it, vi } from 'vitest';
import ItemsPerPage from '../components/ItemsPerPage/ItemsPerPage';
import { NextRouter } from 'next/router';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('ItemsPerPage component', () => {
  let pushMock: MockedFunction<NextRouter['push']>;

  beforeEach(() => {
    pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
      query: { limit: '4' },
    });
  });

  it('updates the search params when input changes', () => {
    render(<ItemsPerPage count={10} />);
    const inputElement = screen.getByRole('spinbutton', { name: 'Items per page:' });

    fireEvent.change(inputElement, { target: { value: '20' } });

    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { page: '1', limit: '20' },
      })
    );
  });
});
