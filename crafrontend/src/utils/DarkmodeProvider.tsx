import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { useContextOrThrow } from './context-utils';
import { CookieConsents, isCookieSet } from './cookies';

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
  const localStorageTheme = localStorage.getItem('theme') as Darkmode;
  const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Darkmode.Dark
    : Darkmode.Light;
  const [theme, setTheme] = useState(localStorageTheme || defaultTheme);

  useEffect(() => {
    if (defaultTheme) {
      setTheme(theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Darkmode.Light ? Darkmode.Dark : Darkmode.Light;
    setTheme(newTheme);
    if (isCookieSet(CookieConsents.FUNCTIONAL)) {
      localStorage.setItem('theme', newTheme);
    }
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <DarkmodeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DarkmodeContext.Provider>
  );
};
