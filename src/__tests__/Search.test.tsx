import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import Search from '../components/Search/Search';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { BrowserRouter } from 'react-router-dom';

describe('Search component', () => {
  it('saves the entered value to local storage when clicking the search button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText('Search');
    const button = screen.getByTestId('submit-button');

    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.click(button);

    expect(localStorage.getItem('search-text-mushrooms')).toBe('test');
  });

  it('retrieves the value from local storage upon mounting', async () => {
    localStorage.setItem('search-text-mushrooms', 'test');

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const inputElement = screen.getByPlaceholderText('Search') as HTMLInputElement;

    await waitFor(() => {
      expect(inputElement.value).toBe('test');
    });
  });

  it('clears the input value when clicking the clear button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const clearButton = screen.getByTestId('clear-button');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(clearButton);

    expect(searchInput.value).toBe('');
  });
});
