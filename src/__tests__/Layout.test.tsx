import Layout from '@/components/Layout/Layout';
import { render, screen } from '@testing-library/react';
import { MockedFunction, beforeEach, expect, it, vi } from 'vitest';
import { describe } from 'node:test';
import { NextRouter } from 'next/router';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('Layout component', () => {
  let pushMock: MockedFunction<NextRouter['push']>;

  beforeEach(() => {
    pushMock = vi.fn();
    useRouter.mockReturnValue({
      push: pushMock,
      query: {
        page: '1',
        search: 'test',
        limit: '4',
        mushroom: '5',
      },
    });
  });

  it('renders children', () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    const childComponent = screen.getByTestId('home-page');
    expect(childComponent).toBeInTheDocument();
  });

  it('renders ErrorButton component', () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    const errorButtonComponent = screen.getByText('Click me!');
    expect(errorButtonComponent).toBeInTheDocument();
  });

  it('renders Search component', () => {
    render(
      <Layout>
        <div>Child Component</div>
      </Layout>
    );

    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });
});
