import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import type { Theme } from '../common/types';

describe('Header', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('should render with default theme', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('should render with specified theme', () => {
    const defaultTheme: Theme = 'dark';
    render(<Header defaultTheme={defaultTheme} />);
    expect(document.documentElement).toHaveClass('dark');
  });
});
