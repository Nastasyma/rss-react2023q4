import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import '@testing-library/jest-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

describe('ErrorPage component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    const invalidRoute = '/invalid-route';

    const route = {
      path: invalidRoute,
      element: <ErrorPage />,
    };

    const config = {
      initialEntries: [invalidRoute],
    };

    const router = createMemoryRouter([route], config);

    render(<RouterProvider router={router} />);

    const errorHeading = screen.getByText('No results found');

    expect(errorHeading).toBeInTheDocument();
  });
});
