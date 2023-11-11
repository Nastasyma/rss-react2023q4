import { render, screen, fireEvent } from '@testing-library/react';
import { describe } from 'node:test';
import { expect, it } from 'vitest';
import ItemsPerPage from '../components/ItemsPerPage/ItemsPerPage';
import { BrowserRouter } from 'react-router-dom';

describe('ItemsPerPage component', () => {
  it('updates the search params when input changes', () => {
    render(
      <BrowserRouter>
        <ItemsPerPage count="10" />
      </BrowserRouter>
    );
    const inputElement = screen.getByRole('spinbutton', { name: 'Items per page:' });

    fireEvent.change(inputElement, { target: { value: '20' } });

    const searchParams = new URLSearchParams(window.location.search);

    expect(searchParams.get('page')).toBe('1');
    expect(searchParams.get('limit')).toBe('20');
  });
});
