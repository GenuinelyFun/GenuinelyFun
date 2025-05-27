import { createContext } from 'react';
import { Database } from 'sql.js';

import { Root } from '../projects/feet/feetJsonDataInterface.ts';
import { useContextOrThrow } from './context-utils.ts';

export const shortenedFileName = (name: string) => {
  if (name.length <= 22) return name;
  return name.slice(0, 22) + '...';
};

export interface FeetFile {
  name: string;
  feet: Root;
  short: string;
}

export interface FweetFile {
  name: string;
  fepx: Database;
  short: string;
}

export interface InnoFile {
  name: string;
  inno: string[];
  short: string;
}

export type DataFile = FweetFile | FeetFile | InnoFile;

export enum ImportExportPageType {
  FEET = 'feet',
  FWEET = 'fweet',
  INNO = 'inno',
}

export function isFeetFile(file: DataFile): file is FeetFile {
  return (file as FeetFile).feet !== undefined;
}

export function isFweetFile(file: DataFile): file is FweetFile {
  return (file as FweetFile).fepx !== undefined;
}

export function isInnoFile(file: DataFile): file is InnoFile {
  return (file as InnoFile).inno !== undefined;
}

type DataContextType = {
  allFiles: DataFile[];
  feetFiles: FeetFile[];
  fweetFiles: FweetFile[];
  innoFiles: InnoFile[];
  removeFile: (name: string) => void;
  addFiles: (value: DataFile[]) => void;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const useDataContext = (): DataContextType =>
  useContextOrThrow(DataContext);
