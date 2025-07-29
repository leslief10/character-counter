import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextAnalyzer } from './TextAnalyzer';
import { TextOptions } from './TextOptions';
import { TextProvider } from '../../context/TextContext';

const wrapper = ({ children }: { children: React.ReactNode }) => <TextProvider>{children}</TextProvider>;

describe('TextOptions', () => {
  it('shows correct initial values', () => {
    render(<TextOptions />, { wrapper });

    expect(screen.getByRole('checkbox', { name: /exclude spaces/i })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: /set character limit/i })).not.toBeChecked();
    expect(screen.getByText(/approx\. reading time:/i)).toBeInTheDocument();
  });

  it('render exclude spaces checkbox and handles its state', () => {
    render(<TextOptions />, { wrapper });

    const excludeSpacesCheckbox = screen.getByRole('checkbox', { name: /exclude spaces/i });
    expect(excludeSpacesCheckbox).toBeInTheDocument();
    expect(excludeSpacesCheckbox).not.toBeChecked();

    fireEvent.click(excludeSpacesCheckbox);
    expect(excludeSpacesCheckbox).toBeChecked();

    fireEvent.click(excludeSpacesCheckbox);
    expect(excludeSpacesCheckbox).not.toBeChecked();
  });

  it('render character limit checkbox and handles its state', () => {
    render(<TextOptions />, { wrapper });

    const charLimitCheckbox = screen.getByRole('checkbox', { name: /set character limit/i });
    expect(charLimitCheckbox).toBeInTheDocument();
    expect(charLimitCheckbox).not.toBeChecked();

    // Check that number input is not shown initially
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();

    // Show number input when checkbox is checked
    fireEvent.click(charLimitCheckbox);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    // Hide number input when checkbox is unchecked
    fireEvent.click(charLimitCheckbox);
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
  });

  it('handles character limit input changes', () => {
    render(<TextOptions />, { wrapper });

    const charLimitCheckbox = screen.getByRole('checkbox', { name: /set character limit/i });
    fireEvent.click(charLimitCheckbox);

    const limitInput = screen.getByRole('spinbutton');
    expect(limitInput).toHaveValue(300); // Default value

    //Change limit
    fireEvent.change(limitInput, { target: { value: '500' } });
    expect(limitInput).toHaveValue(500);

    // Clear limit
    fireEvent.change(limitInput, { target: { value: '' } });
    expect(limitInput).toHaveValue(null);
  });

  it('calculates and display reading time', () => {
    render(<TextAnalyzer />, { wrapper });

    const textarea = screen.getByRole('textbox');

    // Initial state (no text)
    expect(screen.getByText('Approx. reading time: 0 minutes')).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'word '.repeat(238) } });
    expect(screen.getByText('Approx. reading time: 1 minute')).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'word '.repeat(476) } });
    expect(screen.getByText('Approx. reading time: 2 minutes')).toBeInTheDocument();
  });
});
