import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should have correct theme class on root element', () => {
    render(<App />);
    const htmlElement = document.documentElement;
    expect(htmlElement).not.toHaveClass('dark');
  });
  it('should render the app title component', () => {
    render(<App />);
    const title = screen.getByText('Analyze your text in real-time.');
    expect(title).toBeInTheDocument();
  });
});
