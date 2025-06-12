import { createContext, useState } from 'react';
import type { JSX } from 'react';
import type { TextContextType, TextProviderProps } from '../common/types';

const TextContext = createContext<TextContextType | undefined>(undefined);

const TextProvider = ({ children }: TextProviderProps): JSX.Element => {
  const [text, setText] = useState<string>('');
  const [maxLength, setMaxLength] = useState<number>(300);

  return <TextContext.Provider value={{ text, setText, maxLength, setMaxLength }}>{children}</TextContext.Provider>;
};

export { TextContext, TextProvider };
