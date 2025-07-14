import { useState } from 'react';
import type { ChangeEvent, JSX } from 'react';
import { useText } from '../../hooks/useText';

const TextOptions = (): JSX.Element => {
  const [excludeSpaces, setExcludeSpaces] = useState<boolean>(false);
  const [charLimit, setCharLimit] = useState<boolean>(false);
  const [newCharLimit, setNewCharLimit] = useState<number | null>(300);
  const { text, setText, initialText, setInitialText, setMaxLength } = useText();

  const handleRemoveSpaces = (event: ChangeEvent<HTMLInputElement>): void => {
    const newText = event.target.checked ? text.replaceAll(' ', '') : initialText;
    console.log('newText', newText, newText.length);

    setExcludeSpaces(event.target.checked);
    setInitialText(text);
    setText(newText);
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
          <input
            id="spaces"
            name="spaces"
            type="checkbox"
            className="mb-0.5 accent-pale-violet hover:cursor-pointer focus-within:outline-2 focus-within:outline-lavander-floral focus-visible:outline-2 focus-visible:outline-lavander-floral"
            checked={excludeSpaces}
            onChange={handleRemoveSpaces}
          />
          <label htmlFor="spaces">Exclude Spaces</label>
        </div>
        <div className="flex flex-row gap-2.5 min-h-10-half md:min-h-auto items-center text-base text-dark-black dark:text-bright-gray">
          <input
            id="char-limit"
            name="char-limit"
            type="checkbox"
            className="mb-0.5 accent-pale-violet hover:cursor-pointer focus-within:outline-2 focus-within:outline-lavander-floral focus-visible:outline-2 focus-visible:outline-lavander-floral"
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
      <span className="text-base text-dark-black dark:text-bright-gray">Approx. reading time: &gt; 0 min</span>
    </div>
  );
};

export { TextOptions };
