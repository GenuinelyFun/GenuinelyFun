import { createContext, FC, PropsWithChildren, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import { useContextOrThrow } from './context-utils';

export enum Darkmode {
  Light = 'light',
  Dark = 'dark',
}

type DarkmodeContextType = {
  theme: Darkmode;
  toggleTheme(): void;
};

const DarkmodeContext = createContext<DarkmodeContextType | undefined>(
  undefined,
);

export const useDarkmodeContext = (): DarkmodeContextType =>
  useContextOrThrow(DarkmodeContext);

export const DarkmodeProvider: FC<PropsWithChildren> = ({ children }) => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage<Darkmode>(
    'theme',
    defaultDark ? Darkmode.Dark : Darkmode.Light,
  );

  useEffect(() => {
    if (defaultDark) {
      setTheme(theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === Darkmode.Light) {
      setTheme(Darkmode.Dark);
      document.documentElement.setAttribute('data-theme', Darkmode.Dark);
    } else {
      setTheme(Darkmode.Light);
      document.documentElement.setAttribute('data-theme', Darkmode.Light);
    }
  };

  return (
    <DarkmodeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkmodeContext.Provider>
  );
};
