import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface HeaderProps {
  defaultTheme?: Theme;
}

export interface ToggleButtonProps {
  initialTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

export interface TextContextType {
  text: string;
  setText: (text: string) => void;
  processedText: string;
  maxLength: number;
  setMaxLength: (length: number) => void;
  excludeSpaces: boolean;
  setExcludeSpaces: (length: boolean) => void;
}

export interface TextProviderProps {
  children: ReactNode;
}
