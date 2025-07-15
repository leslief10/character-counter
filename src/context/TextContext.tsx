import { createContext, useState, useMemo } from 'react';
import type { JSX } from 'react';
import type { TextContextType, TextProviderProps } from '../common/types';

const TextContext = createContext<TextContextType | undefined>(undefined);

const TextProvider = ({ children }: TextProviderProps): JSX.Element => {
  const [text, setText] = useState<string>('');
  const [maxLength, setMaxLength] = useState<number>(300);
  const [excludeSpaces, setExcludeSpaces] = useState<boolean>(false);

  const processedText = useMemo(() => {
    return excludeSpaces ? text.replaceAll(' ', '') : text;
  }, [text, excludeSpaces]);

  return (
    <TextContext.Provider
      value={{ text, setText, processedText, maxLength, setMaxLength, excludeSpaces, setExcludeSpaces }}
    >
      {children}
    </TextContext.Provider>
  );
};

export { TextContext, TextProvider };
