import type { JSX } from 'react';
import { useText } from '../../hooks/useText';
import { LetterFrequency } from './LetterFrequency';

const TextMetrics = (): JSX.Element => {
  const { text, processedText, excludeSpaces } = useText();

  const totalChar = processedText.length;

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const sentenceCount = text.split(/[.!?]+(?:\s+|$)/).filter((sentence) => sentence.trim().length > 0).length;

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
