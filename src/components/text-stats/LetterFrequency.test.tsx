import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextAnalyzer } from '../text-input/TextAnalyzer';
import { LetterFrequency } from './LetterFrequency';
import { TextProvider } from '../../context/TextContext';
import userEvent from '@testing-library/user-event';

const wrapper = ({ children }: { children: React.ReactNode }) => <TextProvider>{children}</TextProvider>;

describe('LetterFrequency', () => {
  it('displays initial message with no text', () => {
    render(<LetterFrequency />, { wrapper });

    const initialMessage = screen.getByText('No characters found. Start typing to see letter density.');
    expect(initialMessage).toBeInTheDocument();
  });

  it('calculates and display letter frequency correctly', async () => {
    render(
      <>
        <TextAnalyzer />
        <LetterFrequency />
      </>,
      { wrapper },
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'all');

    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();

    expect(screen.getByText('2 (66.67%)')).toBeInTheDocument();
    expect(screen.getByText('1 (33.33%)')).toBeInTheDocument();
  });

  it('sort letters by frequency in descending order', async () => {
    render(
      <>
        <TextAnalyzer />
        <LetterFrequency />
      </>,
      { wrapper },
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'hello');

    const frequencies = screen.getAllByText(/\d+\s\(\d+\.\d+%\)/);
    expect(frequencies[0].textContent).toBe('2 (40.00%)');
  });

  it('handles not-alphabetic characters and spaces', async () => {
    render(
      <>
        <TextAnalyzer />
        <LetterFrequency />
      </>,
      { wrapper },
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'hello! 123');

    expect(screen.queryByText('!')).not.toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('L')).toBeInTheDocument();
  });

  it('toggles between see more and see less', async () => {
    render(
      <>
        <TextAnalyzer />
        <LetterFrequency />
      </>,
      { wrapper },
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'abcdefghijklmnopqrstuvwxyz');

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveTextContent('See more');

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('See less');

    await userEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('See more');
  });

  it('updates when text changes', async () => {
    render(
      <>
        <TextAnalyzer />
        <LetterFrequency />
      </>,
      { wrapper },
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'hello');
    expect(screen.getByText('2 (40.00%)')).toBeInTheDocument();

    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'h');
    expect(screen.queryByText('2 (40.00%)')).not.toBeInTheDocument();
    expect(screen.getByText('1 (100.00%)')).toBeInTheDocument();
  });
});
