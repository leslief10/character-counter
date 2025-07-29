import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TextProvider } from './TextContext';
import { useText } from '../hooks/useText';

const wrapper = ({ children }: { children: React.ReactNode }) => <TextProvider>{children}</TextProvider>;

describe('TextContext', () => {
  it('should provide initial values', () => {
    const { result } = renderHook(() => useText(), { wrapper });

    expect(result.current.text).toBe('');
    expect(result.current.maxLength).toBe(300);
    expect(result.current.excludeSpaces).toBe(false);
  });

  it('should update text value', () => {
    const { result } = renderHook(() => useText(), { wrapper });

    act(() => {
      result.current.setText(`This should be a clever sentence to test text, but I'm not that clever`);
    });

    expect(result.current.text).toBe(`This should be a clever sentence to test text, but I'm not that clever`);
  });

  it('should process text correctly when excludeSpaces is true', () => {
    const { result } = renderHook(() => useText(), { wrapper });

    act(() => {
      result.current.setText(`Think I didn't see you? There were flashin' lights`);
      result.current.setExcludeSpaces(true);
    });

    expect(result.current.processedText).toBe(`ThinkIdidn'tseeyou?Therewereflashin'lights`);
  });

  it('should update maxLength', () => {
    const { result } = renderHook(() => useText(), { wrapper });

    act(() => {
      result.current.setMaxLength(1989);
    });

    expect(result.current.maxLength).toBe(1989);
  });

  it('should maintain text when toggling excludeSpaces', () => {
    const { result } = renderHook(() => useText(), { wrapper });
    const testText = `Can't use a super long text here`;

    act(() => {
      result.current.setText(testText);
    });

    expect(result.current.processedText).toBe(testText);

    act(() => {
      result.current.setExcludeSpaces(true);
    });

    expect(result.current.processedText).toBe(`Can'tuseasuperlongtexthere`);

    act(() => {
      result.current.setExcludeSpaces(false);
    });

    expect(result.current.processedText).toBe(testText);
  });
});
