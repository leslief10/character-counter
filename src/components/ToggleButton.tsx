import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';
import type { ToggleButtonProps } from '../common/types';

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
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
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
      className="flex flex-row justify-center items-center w-8 h-8 rounded-md bg-antiflash-white dark:bg-gunmetal hover:cursor-pointer md:w-11 md:h-11"
    >
      {isDark ? <SunIcon className="w-5 h-5 text-white" /> : <MoonIcon className="w-5 h-5 text-dark-black" />}
    </button>
  );
};

export { ToggleButton };
