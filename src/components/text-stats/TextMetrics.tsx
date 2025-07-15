import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useText } from '../../hooks/useText';
import { LetterFrequency } from './LetterFrequency';

const TextMetrics = (): JSX.Element => {
  const [totalChar, setTotalChar] = useState<number>(0);
  const [wordCount] = useState<number>(0);
  const [sentenceCount] = useState<number>(0);
  const { text, processedText } = useText();

  console.log('text:', processedText, processedText.length);
  console.log('other text', text, text.length);

  useEffect(() => {
    setTotalChar(processedText.length);
  }, [processedText]);

  return (
    <div className="w-full px-4 py-3 md:px-8">
      <div>
        <section>
          <h2>{totalChar}</h2> <span>Total Characters</span>
        </section>
        <section>
          <h2>{wordCount}</h2> <span>Word Count</span>
        </section>
        <section>
          <h2>{sentenceCount}</h2> <span>Sentence Count</span>
        </section>
      </div>
      <LetterFrequency />
    </div>
  );
};

export { TextMetrics };
