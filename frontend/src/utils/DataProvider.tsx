import { FC, PropsWithChildren, useState } from 'react';

import {
  DataContext,
  DataFile,
  FeetFile,
  FweetFile,
  InnoFile,
  isFeetFile,
  isFweetFile,
  isInnoFile,
  shortenedFileName,
} from './data-utils.ts';
import { useToast } from './useToast';

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [files, setFiles] = useState<DataFile[]>([]);
  const toast = useToast();
  const addFiles = (newFiles: DataFile[]) => {
    const filteredNewFiles = newFiles.filter(({ name }) => {
      const check = files.map((file) => file.name).includes(name);
      if (check) {
        toast({ type: 'info', textKey: 'upload-box.error.duplicate' });
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
    <DataContext.Provider
      value={{
        allFiles: files,
        feetFiles: files
          .filter((file) => isFeetFile(file))
          .map((file) => file as FeetFile),
        fweetFiles: files
          .filter((file) => isFweetFile(file))
          .map((file) => file as FweetFile),
        innoFiles: files
          .filter((file) => isInnoFile(file))
          .map((file) => file as InnoFile),
        addFiles,
        removeFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
