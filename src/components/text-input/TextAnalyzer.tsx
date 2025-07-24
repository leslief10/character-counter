import type { ChangeEvent, JSX } from 'react';
import { useText } from '../../hooks/useText';
import { InfoIcon } from '../icons/InfoIcon';
import { TextOptions } from './TextOptions';

const TextAnalyzer = (): JSX.Element => {
  const { text, setText, processedText, maxLength } = useText();

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
  };

  return (
    <div className="w-full px-4 py-3 md:px-8">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="text-analyzer" />
        <textarea
          className="w-full min-h-50 p-5 text-xl text-gunmetal dark:text-bright-gray tracking-tight placeholder:tracking-tight rounded-xl border-2 border-bright-gray dark:border-dark-gunmetal bg-antiflash-white dark:bg-gunmetal placeholder:text-gunmetal dark:placeholder:text-bright-gray invalid:border invalid:border-sinopia dark:invalid:border-coral focus-within:outline-2 focus-within:outline-lavander-floral focus-visible:outline-2 focus-visible:outline-lavander-floral"
          id="text-analyzer"
          maxLength={maxLength}
          name="text-analyzer"
          onChange={handleTextChange}
          placeholder="Start typing here... (or paste your text)"
          spellCheck="false"
          value={text}
        />
        {processedText.length > maxLength ? (
          <div className="flex md:items-center gap-2">
            <InfoIcon className=" text-sinopia dark:text-coral mt-1 md:mb-0.5 md:mt-0" />
            <p className="text-base leading-snug text-sinopia dark:text-coral">
              Limit reached! Your text exceeds {maxLength} characters.
            </p>
          </div>
        ) : null}
        <TextOptions />
      </form>
    </div>
  );
};

export { TextAnalyzer };
