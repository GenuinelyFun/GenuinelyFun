import { createContext } from 'react';

import { useContextOrThrow } from './context-utils.ts';

export enum Darkmode {
  Light = 'light',
  Dark = 'dark',
}

type DarkmodeContextType = {
  theme: Darkmode;
  toggleTheme(): void;
};

export const DarkmodeContext = createContext<DarkmodeContextType | undefined>(
  undefined
);

export const useDarkmodeContext = (): DarkmodeContextType =>
  useContextOrThrow(DarkmodeContext);
