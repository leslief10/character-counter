import { useState } from 'react';
import type { JSX } from 'react';
import { useText } from '../../hooks/useText';
import { ArrowIcon } from '../icons/ArrowIcon';

const LetterFrequency = (): JSX.Element => {
  const [displayFullList, setDisplayFullList] = useState(false);
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
    .map(([letter, count]) => [letter, count, `${((count / sanitizedText.length) * 100).toFixed(2)}`]);

  return (
    <div className="w-full px-4 md:px-8">
      <h3 className="mb-5 text-2xl font-bold tracking-tight text-dark-black dark:text-bright-gray">Letter Density</h3>
      {!processedText.length ? (
        <p className="text-base tracking-tight text-arsenic dark:text-bright-gray">
          No characters found. Start typing to see letter density.
        </p>
      ) : (
        <div>
          <ul
            className="flex flex-col gap-4 w-full"
            style={{
              maxHeight: !displayFullList ? '11.5rem' : '',
              overflow: !displayFullList ? 'hidden' : '',
            }}
          >
            {sortLetterFrequency.map(([letter, count, percentage]) => (
              <li key={letter} className="flex flex-row items-center gap-4">
                <span className="w-4 text-base tracking-tight text-arsenic dark:text-bright-gray">
                  {letter.toUpperCase()}
                </span>
                <progress max="100" value={percentage} className="bg-antiflash-white dark:bg-dark-gunmetal">
                  {percentage}
                </progress>
                <span className="min-w-18 flex-none text-base text-end tracking-tight text-arsenic dark:text-bright-gray">
                  {count} ({percentage}%)
                </span>
              </li>
            ))}
          </ul>
          <button
            className="flex flex-row items-center gap-2 mt-5 text-xl tracking-tight cursor-pointer text-dark-black dark:text-bright-gray rounded-lg button-outline"
            onClick={() => setDisplayFullList((displayFullList) => !displayFullList)}
          >
            {!displayFullList ? 'See more' : 'See less'}
            <ArrowIcon
              className={
                'mt-1 text-dark-black dark:text-bright-gray ' +
                (displayFullList ? 'transform-[matrix(-1,0,0,-1,0,0)]' : '')
              }
            />
          </button>
        </div>
      )}
    </div>
  );
};

export { LetterFrequency };
