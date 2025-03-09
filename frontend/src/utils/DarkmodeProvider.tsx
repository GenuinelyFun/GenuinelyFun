import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { CookieConsents, isCookieSet } from './cookies';
import { Darkmode, DarkmodeContext } from './darkmode-utils.ts';

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
  }, [defaultTheme, theme]);

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
