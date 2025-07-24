import type { JSX } from 'react';
import { useText } from '../../hooks/useText';

const LetterFrequency = (): JSX.Element => {
  const { processedText } = useText();

  const letterFrequencyMap = new Map<string, number>();
  const sanitizedText: string = processedText
    .replaceAll(' ', '')
    .replaceAll(/[^a-zA-Z ]/g, '')
    .toLowerCase();

  const calculateLetterFrequency = (): Map<string, number> => {
    letterFrequencyMap.clear();

    for (let i = 0; i < sanitizedText.length; i++) {
      const currentLetter = sanitizedText[i];
      const currentCount = letterFrequencyMap.get(currentLetter) || 0;
      letterFrequencyMap.set(currentLetter, currentCount + 1);
    }

    return letterFrequencyMap;
  };

  const sortLetterFrequency: [string, number, string][] = Array.from(calculateLetterFrequency().entries())
    .sort((a, b) => b[1] - a[1])
    .map(([letter, count]) => [letter, count, `${((count / sanitizedText.length) * 100).toFixed(2)}%`]);

  console.log(sortLetterFrequency);

  return (
    <div className="w-full px-4 md:px-8">
      <h3 className="mb-5 text-2xl font-bold tracking-tight text-dark-black dark:text-bright-gray">Letter Density</h3>
      {!processedText.length ? (
        <p className="text-base tracking-tight text-arsenic dark:text-bright-gray">
          No characters found. Start typing to see letter density.
        </p>
      ) : (
        <div>
          {sortLetterFrequency.map(([letter, count, percentage]) => (
            <div key={letter}>
              {letter}: {count} {percentage}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { LetterFrequency };
