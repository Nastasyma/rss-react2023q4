import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import ErrorButton from '../components/Error/ErrorButton/ErrorButton';

describe('ErrorButton component', () => {
  it('renders without error', () => {
    render(<ErrorButton title="Test ErrorButton" />);
    const buttonElement = screen.getByTitle('Click to throw error');
    expect(buttonElement).toBeInTheDocument();
  });
});
