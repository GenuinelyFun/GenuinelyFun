import { createContext } from 'react';

import { Root } from '../projects/feet/feetJsonDataInterface.ts';
import { useContextOrThrow } from './context-utils.ts';

export const shortenedFileName = (name: string) => {
  if (name.length <= 22) return name;
  return name.slice(0, 22) + '...';
};

export interface FeetFile {
  name: string;
  json: Root;
  short: string;
}

export interface FweetFile {
  name: string;
  fepx: Record<string, unknown>; //TODO Nghi: Fepx type does not exist yet.
  short: string;
}

type File = FweetFile | FeetFile;

export function isFeetFile(file: File): file is FeetFile {
  return (file as FeetFile).json !== undefined;
}

export function isFweetFile(file: File): file is FweetFile {
  return (file as FweetFile).fepx !== undefined;
}

type DataContextType = {
  feetFiles: FeetFile[];
  fweetFiles: FweetFile[];
  removeFile: (name: string) => void;
  addFiles: (value: File[]) => void;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const useDataContext = (): DataContextType =>
  useContextOrThrow(DataContext);
