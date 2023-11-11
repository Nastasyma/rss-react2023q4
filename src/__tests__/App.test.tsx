import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';

import { expect, it } from 'vitest';
import App from '../App';

describe('App component', () => {
  it('renders home page by default', () => {
    render(<App />);

    const homePageElement = screen.getByTestId('home-page');
    expect(homePageElement).toBeInTheDocument();
  });
});
