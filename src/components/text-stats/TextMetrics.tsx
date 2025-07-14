import type { JSX } from 'react';
import { LetterFrequency } from './LetterFrequency';

const TextMetrics = (): JSX.Element => {
  return (
    <>
      <div>Analysis</div>
      <LetterFrequency />
    </>
  );
};

export { TextMetrics };
