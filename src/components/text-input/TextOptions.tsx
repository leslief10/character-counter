import { useState } from 'react';
import type { ChangeEvent, JSX } from 'react';
import { useText } from '../../hooks/useText';

const TextOptions = (): JSX.Element => {
  const [charLimit, setCharLimit] = useState<boolean>(false);
  const [newCharLimit, setNewCharLimit] = useState<number | null>(300);
  const { text, setMaxLength, excludeSpaces, setExcludeSpaces } = useText();

  const wordsLength = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  // 238WPM is the average silent reading speed per a study shared in https://thereadtime.com/
  const minutes = Math.ceil(wordsLength / 238);
  const readingTime = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;

  const handleRemoveSpaces = (event: ChangeEvent<HTMLInputElement>): void => {
    setExcludeSpaces(event.target.checked);
  };

  const checkCharacterLimit = (event: ChangeEvent<HTMLInputElement>): void => {
    setCharLimit(event.target.checked);
  };

  const updateCharacterLimit = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = event.target.value;

    if (newLimit === '') {
      setNewCharLimit(null);
      setMaxLength(0);
    } else {
      setMaxLength(Number(newLimit));
      setNewCharLimit(Number(newLimit));
    }
  };

  return (
    <div className="flex flex-col pt-2 md:flex-row md:justify-between">
      <fieldset className="flex flex-col md:flex-row md:gap-6">
        <div className="flex flex-row gap-2.5 items-center text-base text-dark-black dark:text-bright-gray">
          <label htmlFor="spaces" className="label-checkbox hover:cursor-pointer">
            <input id="spaces" name="spaces" type="checkbox" checked={excludeSpaces} onChange={handleRemoveSpaces} />
            Exclude Spaces
          </label>
        </div>
        <div className="flex flex-row gap-2.5 min-h-10-half md:min-h-auto items-center text-base text-dark-black dark:text-bright-gray">
          <label htmlFor="char-limit" className="label-checkbox hover:cursor-pointer">
            <input
              id="char-limit"
              name="char-limit"
              type="checkbox"
              checked={charLimit}
              onChange={checkCharacterLimit}
            />
            Set Character Limit
          </label>
          {charLimit ? (
            <div className="max-w-18">
              <label htmlFor="char-limit-amount" />
              <input
                id="char-limit-amount"
                min={0}
                name="char-limit-amount"
                type="number"
                className="w-full pl-3 text-base text-dark-black dark:text-bright-gray rounded-md border border-arsenic bg-antiflash-white dark:bg-dark-black focus-within:outline-2 focus-within:outline-lavander-floral focus-visible:outline-2 focus-visible:outline-lavander-floral"
                value={newCharLimit === null ? '' : newCharLimit}
                onChange={updateCharacterLimit}
              />
            </div>
          ) : null}
        </div>
      </fieldset>
      <span className="text-base text-dark-black dark:text-bright-gray">Approx. reading time: {readingTime}</span>
    </div>
  );
};

export { TextOptions };
