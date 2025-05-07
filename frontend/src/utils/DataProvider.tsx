import { FC, PropsWithChildren, useState } from 'react';

import {
  DataContext,
  FeetFile,
  FweetFile,
  isFeetFile,
  isFweetFile,
  shortenedFileName,
} from './data-utils.ts';
import { useToast } from './useToast';

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useState<FeetFile[]>([]);
  const toast = useToast();
  const addFiles = (newFiles: FeetFile[]) => {
    const filteredNewFiles = newFiles.filter(({ name }) => {
      const check = files.map((file) => file.name).includes(name);
      if (check) {
        toast({ type: 'info', textKey: 'feet-import.upload.duplicate' });
      }
      return !check;
    });

    setFiles([...files, ...filteredNewFiles]);
  };

  const removeFile = (name: string) => {
    toast({
      type: 'success',
      textKey: 'feet-file-list.remove-file.success',
      textParams: { file: shortenedFileName(name) },
    });
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  return (
    <DataContext.Provider
      value={{
        feetFiles: files
          .filter((file) => isFeetFile(file))
          .map((file) => file as FeetFile),
        fweetFiles: files
          .filter((file) => isFweetFile(file))
          .map((file) => file as FweetFile),
        addFiles,
        removeFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
