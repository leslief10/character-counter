import { useState } from 'react';
import type { ChangeEvent, JSX } from 'react';
import { useText } from '../hooks/useText';

const TextOptions = (): JSX.Element => {
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [charLimit, setCharLimit] = useState(false);
  const [newCharLimit, setNewCharLimit] = useState(300);
  const { text, setTextWithoutSpaces, setMaxLength } = useText();

  const handleRemoveSpaces = (event: ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.checked ? text.replaceAll(' ', '') : text;
    console.log('newText', newText, newText.length);

    setExcludeSpaces(event.target.checked);
    setTextWithoutSpaces(newText);
  };

  const checkCharacterLimit = (event: ChangeEvent<HTMLInputElement>): void => {
    setCharLimit(event.target.checked);
  };

  const updateCharacterLimit = (event: ChangeEvent<HTMLInputElement>): void => {
    const newLimit = Number(event.target.value);
    setMaxLength(newLimit);
    setNewCharLimit(newLimit);
  };
  return (
    <div className="pt-2">
      <fieldset>
        <div className="flex flex-row gap-2.5 items-center text-base text-dark-black dark:text-bright-gray">
          <input
            id="spaces"
            name="spaces"
            type="checkbox"
            className="mb-0.5 accent-pale-violet"
            checked={excludeSpaces}
            onChange={handleRemoveSpaces}
          />
          <label htmlFor="spaces">Exclude Spaces</label>
        </div>
        <div className="flex flex-row gap-2.5 pt-2 items-center text-base text-dark-black dark:text-bright-gray">
          <input
            id="char-limit"
            name="char-limit"
            type="checkbox"
            className="mb-0.5 accent-pale-violet"
            checked={charLimit}
            onChange={checkCharacterLimit}
          />
          <label htmlFor="char-limit" className="flex-none">
            Set Character Limit
          </label>
          {charLimit ? (
            <div className="max-w-18">
              <label htmlFor="char-limit-amount" />
              <input
                id="char-limit-amount"
                name="char-limit-amount"
                type="number"
                className="w-full pl-3 text-base text-dark-black dark:text-bright-gray rounded-md border border-arsenic bg-antiflash-white dark:bg-dark-black"
                value={newCharLimit}
                onChange={updateCharacterLimit}
              />
            </div>
          ) : null}
        </div>
      </fieldset>
      <span>Approx. reading time: &gt; 1 min</span>
    </div>
  );
};

export { TextOptions };
