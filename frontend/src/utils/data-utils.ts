import { createContext } from 'react';

import { Root } from '../interfaces/jsonDataInterface.ts';
import { useContextOrThrow } from './context-utils.ts';

export const shortenedFileName = (name: string) => {
  if (name.length <= 22) return name;
  return name.slice(0, 22) + '...';
};

export interface File {
  name: string;
  json: Root;
  short: string;
}

type DataContextType = {
  files: File[];
  removeFile: (name: string) => void;
  addFiles: (value: File[]) => void;
};
export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const useDataContext = (): DataContextType =>
  useContextOrThrow(DataContext);
