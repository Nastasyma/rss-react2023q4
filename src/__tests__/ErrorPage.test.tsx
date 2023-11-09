import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom';
import AppRouter from '../router';

describe('ErrorPage component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <AppRouter />
      </MemoryRouter>
    );

    const error = screen.getByTestId('error-page');

    expect(error).toBeInTheDocument();
  });
});
