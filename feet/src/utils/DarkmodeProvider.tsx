import {
  createContext,
  FC,
  PropsWithChildren,
  Context,
  useContext,
} from 'react';
import useLocalStorage from 'use-local-storage';

export function useContextOrThrow<T>(context: Context<T | undefined>): T {
  const theContext = useContext(context);

  if (!theContext) {
    throw new Error(`The hook is not used within the context.`);
  }

  return theContext;
}

export enum Darkmode {
  Light = 'light',
  Dark = 'dark',
}

type DarkmodeContext = {
  theme: Darkmode;
  toggleTheme(): void;
};

const DarkmodeContext = createContext<DarkmodeContext | undefined>(undefined);

export const useDarkmodeContext = (): DarkmodeContext =>
  useContextOrThrow(DarkmodeContext);

export const DarkmodeProvider: FC<PropsWithChildren> = ({ children }) => {
  const defaultLight = !window.matchMedia('(prefers-color-scheme: dark)')
    .matches;
  const [theme, setTheme] = useLocalStorage<Darkmode>(
    'theme',
    defaultLight ? Darkmode.Light : Darkmode.Dark,
  );

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
