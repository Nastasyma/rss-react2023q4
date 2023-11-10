import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage/HomePage';
import { BrowserRouter } from 'react-router-dom';

describe('HomePage component', () => {
  it('renders main section with nested components', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const mainSection = screen.getByRole('main');
    expect(mainSection).toBeInTheDocument();

    const search = screen.getByPlaceholderText('Search');
    expect(search).toBeInTheDocument();

    const errorButton = screen.getByRole('button', { name: 'Click me!' });
    expect(errorButton).toBeInTheDocument();
  });
});
