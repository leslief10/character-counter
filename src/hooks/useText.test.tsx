import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useText } from './useText';
import { TextProvider } from '../context/TextContext';

const wrapper = ({ children }: { children: React.ReactNode }) => <TextProvider>{children}</TextProvider>;

describe('useText', () => {
  it('should trow an error when used outside TextProvider', () => {
    expect(() => {
      renderHook(() => useText());
    }).toThrow('useText must be used within a TextContext');
  });

  it('should return context when used within TextProvider', () => {
    const { result } = renderHook(() => useText(), { wrapper });

    expect(result.current).toHaveProperty('text');
    expect(result.current).toHaveProperty('setText');
    expect(result.current).toHaveProperty('processedText');
    expect(result.current).toHaveProperty('maxLength');
    expect(result.current).toHaveProperty('setMaxLength');
    expect(result.current).toHaveProperty('excludeSpaces');
    expect(result.current).toHaveProperty('setExcludeSpaces');
  });
});
