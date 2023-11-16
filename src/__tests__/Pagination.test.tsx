import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import Pagination from '../components/Pagination/Pagination';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Pagination component', () => {
  it('when clicking on the "Next" button, updates URL query parameter', () => {
    const setSearchParamsMock = vi.fn();

    render(
      <Provider store={store}>
        <Pagination totalPages={5} currentPage={2} setSearchParams={setSearchParamsMock} />
      </Provider>
    );

    const nextPageButton = screen.getByText('Next');

    fireEvent.click(nextPageButton);

    expect(setSearchParamsMock).toHaveBeenCalled();
    expect(setSearchParamsMock.mock.calls[0][0](new URLSearchParams()).get('page')).toBe('3');
  });

  it('when clicking on the "Prev" button, updates URL query parameter', () => {
    const setSearchParamsMock = vi.fn();

    render(
      <Provider store={store}>
        <Pagination totalPages={5} currentPage={2} setSearchParams={setSearchParamsMock} />
      </Provider>
    );

    const prevPageButton = screen.getByText('Prev');

    fireEvent.click(prevPageButton);

    expect(setSearchParamsMock).toHaveBeenCalled();
    expect(setSearchParamsMock.mock.calls[0][0](new URLSearchParams()).get('page')).toBe('1');
  });
});
