import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextAnalyzer } from './TextAnalyzer';
import { TextProvider } from '../../context/TextContext';

const wrapper = ({ children }: { children: React.ReactNode }) => <TextProvider>{children}</TextProvider>;

describe('TextAnalyzer', () => {
  it('renders textarea with correct attributes', () => {
    render(<TextAnalyzer />, { wrapper });

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'text-analyzer');
    expect(textarea).toHaveAttribute('name', 'text-analyzer');
    expect(textarea).toHaveAttribute('spellCheck', 'false');
    expect(textarea).toHaveAttribute('placeholder', 'Start typing here... (or paste your text)');
  });

  it('updates text value when typing', () => {
    render(<TextAnalyzer />, { wrapper });

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Testing the textarea element' } });

    expect(textarea).toHaveValue('Testing the textarea element');
  });

  it('shows limit warning when text reaches maxLength', () => {
    render(<TextAnalyzer />, { wrapper });

    const textarea = screen.getByRole('textbox');
    const longText = 'a'.repeat(300);

    fireEvent.change(textarea, { target: { value: longText } });

    expect(screen.getByText(/Limit reached!/)).toBeInTheDocument();
    expect(screen.getByText(/Your text is exactly 300 characters./)).toBeInTheDocument();
  });

  it('shows warning when text exceeds maxLength', () => {
    render(<TextAnalyzer />, { wrapper });

    const textarea = screen.getByRole('textbox');
    const longerText = 'a'.repeat(301);

    fireEvent.change(textarea, { target: { value: longerText } });

    expect(screen.getByText(/Limit reached!/)).toBeInTheDocument();
    expect(screen.getByText(/Your text exceeds 300 characters./)).toBeInTheDocument();
  });

  it('does not show limmit warning for text under maxLength', () => {
    render(<TextAnalyzer />, { wrapper });

    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'Short text' } });

    expect(screen.queryByText(/Limit reached!/)).not.toBeInTheDocument();
  });
});
