import { createContext, FC, PropsWithChildren, useState } from 'react';

import { Root } from '../interfaces/jsonDataInterface';
import { useContextOrThrow } from './context-utils';
import { useToast } from './useToast';

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

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = (): DataContextType =>
  useContextOrThrow(DataContext);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]);
  const toast = useToast();
  const addFiles = (newFiles: File[]) => {
    const filteredNewFiles = newFiles.filter(({ name }) => {
      const check = files.map((file) => file.name).includes(name);
      if (check) {
        toast({ type: 'info', textKey: 'upload.duplicate' });
      }
      return !check;
    });

    setFiles([...files, ...filteredNewFiles]);
  };

  const removeFile = (name: string) => {
    toast({
      type: 'success',
      textKey: 'file-list.remove-file.success',
      textParams: { file: shortenedFileName(name) },
    });
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  return (
    <DataContext.Provider value={{ files, addFiles, removeFile }}>
      {children}
    </DataContext.Provider>
  );
};
