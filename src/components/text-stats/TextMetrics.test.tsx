import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextAnalyzer } from '../text-input/TextAnalyzer';
import { TextMetrics } from './TextMetrics';
import { TextProvider } from '../../context/TextContext';
import userEvent from '@testing-library/user-event';

const wrapper = ({ children }: { children: React.ReactNode }) => <TextProvider>{children}</TextProvider>;

describe('TextMetrics', () => {
  it('displays initial count of 00 with no text', () => {
    render(<TextMetrics />, { wrapper });

    const charCount = screen.getByTestId('char-count');
    const wordCount = screen.getByTestId('word-count');
    const sentenceCount = screen.getByTestId('sentence-count');

    expect(charCount).toBeInTheDocument();
    expect(wordCount).toBeInTheDocument();
    expect(sentenceCount).toBeInTheDocument();

    expect(charCount).toHaveTextContent(/^00$/);
    expect(wordCount).toHaveTextContent(/^00$/);
    expect(sentenceCount).toHaveTextContent(/^00$/);
  });

  it('displays single digit numbers with leading zero', async () => {
    render(
      <>
        <TextAnalyzer />
        <TextMetrics />
      </>,
      { wrapper },
    );

    const text = 'Hi';
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, text);

    const charCount = screen.getByTestId('char-count');
    const wordCount = screen.getByTestId('word-count');
    const sentenceCount = screen.getByTestId('sentence-count');

    expect(charCount).toBeInTheDocument();
    expect(wordCount).toBeInTheDocument();
    expect(sentenceCount).toBeInTheDocument();

    expect(charCount).toHaveTextContent(/^02$/);
    expect(wordCount).toHaveTextContent(/^01$/);
    expect(sentenceCount).toHaveTextContent(/^01$/);
  });

  it('displays correct character, word and sentence count with spaces', async () => {
    render(
      <>
        <TextAnalyzer />
        <TextMetrics />
      </>,
      { wrapper },
    );

    const text = `
    I am testing
    character count,
    word count
    and sentence count.
    All this without leading zeros.
    I still have
    4 sentences to go
    I guess
    I'll use
    spaces.
    `;
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, text);

    const charCount = screen.getByTestId('char-count');
    const wordCount = screen.getByTestId('word-count');
    const sentenceCount = screen.getByTestId('sentence-count');

    expect(charCount).toBeInTheDocument();
    expect(wordCount).toBeInTheDocument();
    expect(sentenceCount).toBeInTheDocument();

    expect(charCount).toHaveTextContent(/^194$/);
    expect(wordCount).toHaveTextContent(/^27$/);
    expect(sentenceCount).toHaveTextContent(/^10$/);
  });

  it('shows (no space) indicator when excludeSpaces is true', async () => {
    render(
      <>
        <TextAnalyzer />
        <TextMetrics />
      </>,
      { wrapper },
    );

    const textarea = screen.getByRole('textbox');
    const checkbox = screen.getByRole('checkbox', { name: /exclude spaces/i });
    await userEvent.type(textarea, 'This is a long sentence');
    await userEvent.click(checkbox);

    const noSpaceIndicator = screen.getByText('(no space)');
    const charCount = screen.getByTestId('char-count');

    expect(noSpaceIndicator).toBeInTheDocument();
    expect(charCount).toBeInTheDocument();
    expect(charCount).toHaveTextContent(/^19$/);
  });
});
