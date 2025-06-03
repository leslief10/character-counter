import type { JSX } from 'react';
import type { Theme } from './types/theme';
import { LogoIcon } from './icons/LogoIcon';
import { ToggleButton } from './ToggleButton';

interface HeaderProps {
  defaultTheme?: Theme;
}

const Header = ({ defaultTheme }: HeaderProps): JSX.Element => {
  return (
    <header className="flex flex-row justify-between items-center p-4 md:py-5 md:px-8 md:w-full md:max-w-4-half-xl lg:pt-8 lg:pb-0">
      <LogoIcon className="text-dark-black dark:text-bright-gray" />
      <ToggleButton initialTheme={defaultTheme} />
    </header>
  );
};

export { Header };
