import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Root } from '../interfaces/jsonDataInterface';
import { useContextOrThrow } from './context-utils';
import { useToast } from './useToast';

export const shortenedFileName = (name: string) => {
  if (name.length <= 22) return name;
  return name.slice(0, 22) + '...';
};

type DataContextType = {
  files: { name: string; json: Root }[];
  removeFile: (name: string) => void;
  addFiles: (value: { name: string; json: Root }[]) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = (): DataContextType =>
  useContextOrThrow(DataContext);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useState<{ name: string; json: Root }[]>([]);
  const toast = useToast();
  const addFiles = (newFiles: { name: string; json: Root }[]) => {
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
