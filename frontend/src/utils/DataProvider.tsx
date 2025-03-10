import { FC, PropsWithChildren, useState } from 'react';

import { DataContext, File, shortenedFileName } from './data-utils.ts';
import { useToast } from './useToast';

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
