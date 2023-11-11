import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi, expect, it, describe } from 'vitest';
import Search from '../components/Search/Search';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchContext, SearchProvider } from '../context/SearchContext';

describe('Search component', () => {
  it('saves the entered value to local storage when clicking the search button', () => {
    render(
      <Router>
        <SearchContext.Provider value={{ searchText: '', setSearchText: vi.fn() }}>
          <Search />
        </SearchContext.Provider>
      </Router>
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
      <Router>
        <SearchContext.Provider value={{ searchText: '', setSearchText: vi.fn() }}>
          <Search />
        </SearchContext.Provider>
      </Router>
    );

    const inputElement = screen.getByPlaceholderText('Search') as HTMLInputElement;

    await waitFor(() => {
      expect(inputElement.value).toBe('test');
    });
  });

  it('clears the input value when clicking the clear button', () => {
    render(
      <Router>
        <SearchContext.Provider value={{ searchText: '', setSearchText: vi.fn() }}>
          <Search />
        </SearchContext.Provider>
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const clearButton = screen.getByTestId('clear-button');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(clearButton);

    expect(searchInput.value).toBe('');
  });
});

describe('SearchProvider', () => {
  it('renders children', () => {
    render(
      <SearchProvider>
        <div>Child Component</div>
      </SearchProvider>
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });
});
