import { useContext } from 'react';
import type { TextContextType } from '../common/types';
import { TextContext } from '../context/TextContext';

const useText = (): TextContextType => {
  const context = useContext(TextContext);

  if (context === undefined) {
    throw new Error('useText must be used within a TextContext');
  }
  return context;
};

export { useText };
