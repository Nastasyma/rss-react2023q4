import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, vi, beforeEach, MockedFunction } from 'vitest';
import Search from '../components/Search/Search';
import { NextRouter } from 'next/router';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('Search component', () => {
  let pushMock: MockedFunction<NextRouter['push']>;

  beforeEach(() => {
    pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
      query: {
        search: 'search',
      },
    });
  });

  it('updates the URL query parameter after clicking the submit button', () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(submitButton);

    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: {
          page: '1',
          search: 'test',
        },
      })
    );
  });

  it('clears the input value when clicking the clear button', () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const clearButton = screen.getByTestId('clear-button');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(clearButton);

    expect(searchInput.value).toBe('');
  });
});
