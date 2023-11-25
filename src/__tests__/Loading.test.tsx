import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { describe } from 'node:test';
import '@testing-library/jest-dom';
import Loading from '@/components/Loading/Loading';

describe('Loading component', () => {
  it('renders loading spinner', () => {
    const { getByAltText } = render(<Loading />);
    const spinnerElement = getByAltText('loading');

    expect(spinnerElement).toBeInTheDocument();
  });
});
