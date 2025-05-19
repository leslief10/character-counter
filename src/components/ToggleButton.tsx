import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';
import type { Theme } from './types/theme';

interface ToggleButtonProps {
  initialTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

const ToggleButton = ({ initialTheme, onThemeChange }: ToggleButtonProps = {}): JSX.Element => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (initialTheme) return initialTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent): void => {
      const newTheme = event.matches;
      setIsDark(newTheme);
      onThemeChange?.(newTheme ? 'dark' : 'light');
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, [onThemeChange]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => {
        setIsDark((prev) => {
          const newTheme = !prev;
          onThemeChange?.(newTheme ? 'dark' : 'light');
          return newTheme;
        });
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex flex-row justify-center items-center w-8 h-8 rounded-md bg-antiflash-white dark:bg-gunmetal hover:cursor-pointer"
    >
      {isDark ? <SunIcon className="w-5 h-5 text-white" /> : <MoonIcon className="w-5 h-5 text-dark-black" />}
    </button>
  );
};

export { ToggleButton };
