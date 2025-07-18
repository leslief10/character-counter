import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useText } from '../../hooks/useText';
import { LetterFrequency } from './LetterFrequency';

const TextMetrics = (): JSX.Element => {
  const [totalChar, setTotalChar] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [sentenceCount, setSentenceCount] = useState<number>(0);
  const { text, processedText, excludeSpaces } = useText();

  useEffect(() => {
    setTotalChar(processedText.length);
  }, [processedText]);

  useEffect(() => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  useEffect(() => {
    const sentences = text.split(/[.!?]+(?:\s+|$)/).filter((sentence) => sentence.trim().length > 0);
    setSentenceCount(sentences.length);
  }, [text]);

  return (
    <div className="w-full px-4 py-3 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <section className="w-full h-33 py-7 px-5 rounded-xl bg-pale-violet bg-[url('/src/assets/images/pattern-character-count.svg')] bg-no-repeat bg-position-[center_right_-3rem] md:h-38 md:py-6 md:px-3 md:bg-position-[center_right_-4rem]">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-dark-black md:text-6xl">{totalChar}</h2>
          <span
            className="flex flex-row gap-1 text-xl tracking-tight text-dark-black md:text-2xl md:flex-col md:gap-0"
            style={{
              fontSize: excludeSpaces ? '1.25rem' : '',
            }}
          >
            Total Characters {excludeSpaces ? <span>(no space)</span> : null}
          </span>
        </section>
        <section className="w-full h-33 py-7 px-5 rounded-xl bg-orange-peel bg-[url('/src/assets/images/pattern-word-count.svg')] bg-no-repeat bg-position-[center_right_-3rem] md:h-38 md:py-6 md:px-3 md:bg-position-[center_right_-4rem]">
          <h2 className="mb-2 text-4xl font-bold tracking-tight text-dark-black md:text-6xl">{wordCount}</h2>
          <span className="text-xl tracking-tight text-dark-black md:text-2xl">Word Count</span>
        </section>
        <section className="w-full h-33 py-7 px-5 rounded-xl bg-coral bg-[url('/src/assets/images/pattern-sentence-count.svg')] bg-no-repeat bg-position-[center_right_-3rem] md:h-38 md:py-6 md:px-3 md:bg-position-[center_right_-4rem]">
          <h2 className="mb-2  text-4xl font-bold tracking-tight text-dark-black md:text-6xl">{sentenceCount}</h2>
          <span className="text-xl tracking-tight text-dark-black md:text-2xl">Sentence Count</span>
        </section>
      </div>
      <LetterFrequency />
    </div>
  );
};

export { TextMetrics };
