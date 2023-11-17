import { render, screen, fireEvent } from '@testing-library/react';
import { describe } from 'node:test';
import { expect, it } from 'vitest';
import ItemsPerPage from '../components/ItemsPerPage/ItemsPerPage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('ItemsPerPage component', () => {
  it('updates the search params when input changes', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ItemsPerPage count="10" />
        </Provider>
      </BrowserRouter>
    );
    const inputElement = screen.getByRole('spinbutton', { name: 'Items per page:' });

    fireEvent.change(inputElement, { target: { value: '20' } });

    const searchParams = new URLSearchParams(window.location.search);

    expect(searchParams.get('page')).toBe('1');
    expect(searchParams.get('limit')).toBe('20');
  });
});
