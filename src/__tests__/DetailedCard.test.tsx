import { describe } from 'node:test';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi, expect, it, MockedFunction, beforeEach } from 'vitest';
import { mockCardData, mockData, mockRouter } from '../utils/mocks';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { NextRouter, Router } from 'next/router';
import App from '@/pages/_app';
import Loading from '@/components/Loading/Loading';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import MainSection from '@/components/MainSection/MainSection';

const useRouter = vi.spyOn(require('next/router'), 'useRouter');

describe('DetailedCard component', () => {
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

  it('displays a loading indicator while fetching data', () => {
    const mockRouter = {
      query: {
        page: '1',
        search: 'test',
        limit: '4',
        mushroom: '5',
      },
    } as unknown as Router;
    const mockComponent = () => <div>Mock Component</div>;
    const mockProps = { pageProps: {} };

    render(<App Component={mockComponent} router={mockRouter} {...mockProps} />, {
      wrapper: Loading,
    });

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('correctly displays the detailed card data', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <DetailedCard data={mockCardData} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(mockCardData.title)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockCardData.title} image`)).toBeInTheDocument();
  });

  it('hides the component when close button is clicked', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <MainSection data={mockData} />
      </RouterContext.Provider>
    );

    await waitFor(async () => {
      fireEvent.click(screen.getAllByTestId('card')[0]);
    });

    await waitFor(async () => {
      expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Close'));
      setTimeout(() => {
        expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
      }, 100);
    });
  });
});
