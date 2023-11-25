import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, vi, MockedFunction, beforeEach } from 'vitest';
import Pagination from '../components/Pagination/Pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { NextRouter } from 'next/router';
import { mockRouter } from '@/utils/mocks';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('Pagination component', () => {
  let pushMock: MockedFunction<NextRouter['push']>;

  beforeEach(() => {
    pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });
  });

  it('when clicking on the "Next" button, updates URL query parameter', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination totalPages={5} currentPage={2} />
      </RouterContext.Provider>
    );

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);

    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { page: '3' },
      })
    );
  });

  it('when clicking on the "Prev" button, updates URL query parameter', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination totalPages={5} currentPage={2} />
      </RouterContext.Provider>
    );

    const prevPageButton = screen.getByText('Prev');
    fireEvent.click(prevPageButton);

    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { page: '1' },
      })
    );
  });
});
