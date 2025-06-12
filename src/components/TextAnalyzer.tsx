import type { ChangeEvent, JSX } from 'react';
import { useText } from '../hooks/useText';
import { TextOptions } from './TextOptions';

const TextAnalyzer = (): JSX.Element => {
  const { text, setText, maxLength } = useText();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="w-full px-4 py-3 md:px-8">
        <form>
          <label htmlFor="text-analyzer" />
          <textarea
            id="text-analyzer"
            maxLength={maxLength}
            name="text-analyzer"
            onChange={handleChange}
            placeholder="Start typing here... (or paste your text)"
            className="w-full min-h-50 p-5 text-xl text-gunmetal dark:text-bright-gray tracking-tight placeholder:tracking-tight rounded-xl border-2 border-bright-gray dark:border-dark-gunmetal bg-antiflash-white dark:bg-gunmetal placeholder:text-gunmetal dark:placeholder:text-bright-gray"
            value={text}
          />
          <TextOptions />
        </form>
      </div>
    </>
  );
};

export { TextAnalyzer };
