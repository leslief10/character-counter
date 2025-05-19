import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render header component', () => {
    render(<App />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('should have correct theme class on root element', () => {
    render(<App />);
    const htmlElement = document.documentElement;
    expect(htmlElement).not.toHaveClass('dark');
  });
});
