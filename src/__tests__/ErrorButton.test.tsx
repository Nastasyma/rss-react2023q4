import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import ErrorButton from '../components/Error/ErrorButton/ErrorButton';
import ErrorBoundary from '../components/Error/ErrorBoundary';

describe('ErrorButton component', () => {
  it('renders without error', () => {
    render(<ErrorButton title="Test ErrorButton" />);
    const buttonElement = screen.getByTitle('Click to throw error');
    expect(buttonElement).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton title="Test ErrorButton" />
      </ErrorBoundary>
    );
    const buttonElement = screen.getByTitle('Click to throw error');

    fireEvent.click(buttonElement);

    expect(
      screen.getByText('Error: Too much caffeine injected into the system!')
    ).toBeInTheDocument();
  });
});
