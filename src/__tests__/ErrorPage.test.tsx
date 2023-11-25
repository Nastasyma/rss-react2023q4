import { act, render, screen } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import '@testing-library/jest-dom';
import ErrorPage from '@/pages/404';
import App from '@/pages/_app';
import { Router } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('ErrorPage component', () => {
  it('renders ErrorPage component when navigating to an invalid route', async () => {
    const mockRouter = {
      route: '/invalid-route',
      pathname: '/invalid-route',
      query: {},
      asPath: '/invalid-route',
      push: vi.fn(),
    } as unknown as Router;

    useRouter.mockImplementation(() => ({
      asPath: '/invalid-route',
      events: {
        on: vi.fn(),
        off: vi.fn(),
        push: vi.fn(),
      },
    }));

    await act(async () => {
      render(
        <RouterContext.Provider value={mockRouter}>
          <App Component={ErrorPage} pageProps={{}} router={mockRouter} />
        </RouterContext.Provider>
      );
    });

    const errorPage = screen.getByTestId('error-page');

    expect(errorPage).toBeInTheDocument();
  });
});
