import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleButton } from './ToggleButton';
import type { Theme } from '../common/types';

describe('ToggleButton', () => {
  beforeEach(() => {
    // Reset the DOM between tests
    document.documentElement.classList.remove('dark');
  });

  it('should render with light theme by default', () => {
    render(<ToggleButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('should respect initialTheme prop', () => {
    const initialTheme: Theme = 'dark';
    render(<ToggleButton initialTheme={initialTheme} />);
    expect(document.documentElement).toHaveClass('dark');
  });

  it('should toggle theme when clicked', () => {
    render(<ToggleButton />);
    const button = screen.getByRole('button');

    expect(document.documentElement).not.toHaveClass('dark');
    fireEvent.click(button);
    expect(document.documentElement).toHaveClass('dark');
    fireEvent.click(button);
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('should call onThemeChange callback when theme changes', () => {
    const onThemeChange = vi.fn();
    render(<ToggleButton onThemeChange={onThemeChange} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(onThemeChange).toHaveBeenCalledWith('dark');
    fireEvent.click(button);
    expect(onThemeChange).toHaveBeenCalledWith('light');
  });

  it('should update aria-label based on current theme', () => {
    render(<ToggleButton />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});
