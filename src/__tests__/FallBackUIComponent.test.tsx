import { describe } from 'node:test';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import FallBackUIComponent from '../components/Error/FallBackUI/FallBackUIComponent';

describe('FallBackUIComponent', () => {
  it('renders error text', () => {
    const errorText = 'Test error';
    render(<FallBackUIComponent errorText={errorText} />);
    const errorTextElement = screen.getByText(errorText);
    expect(errorTextElement).toBeInTheDocument();
  });
});
