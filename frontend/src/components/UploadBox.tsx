import classNames from 'classnames';
import JSZip from 'jszip';
import { ChangeEvent, DragEventHandler, FC, useState } from 'react';

import CrossCircleIcon from '../assets/icons/CrossCircleIcon.tsx';
import UploadIcon from '../assets/icons/UploadIcon.tsx';
import { Root } from '../projects/feet/feetJsonDataInterface.ts';
import {
  DataFile,
  FileType,
  shortenedFileName,
  useDataContext,
} from '../utils/data-utils.ts';
import { IAmTryingOutSomeStuffOkaaaay } from '../utils/database-utils.ts';
import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import { useNoDropZone } from '../utils/useNoDropZone.ts';
import { useToast } from '../utils/useToast.ts';
import GenericButton from './GenericButton.tsx';
import styles from './UploadBox.module.less';

interface Props {
  versionNumber: string;
  className?: string;
  filetype: FileType;
  productName: string;
  acceptFileType: string;
}

const UploadBox: FC<Props> = ({
  versionNumber,
  className,
  filetype,
  productName,
  acceptFileType,
}) => {
  useNoDropZone();
  const toast = useToast();
  const { allFiles, addFiles } = useDataContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isNotParseable, setIsNotParseable] = useState(false);
  const { translate } = useLanguageContext();

  const handleUploadedFiles = async (files: FileList) => {
    setIsDragging(false);
    setIsNotParseable(false);

    const filesArray = Array.from(files).map(async (file) => {
      if (file === null) {
        toast({
          type: 'error',
          textKey: 'upload-box.error.general',
        });
        return;
      }
      const fileReader = new FileReader();
      return new Promise((resolve) => {
        const zip = new JSZip();
        fileReader.onload = () => {
          try {
            if (allFiles.find((f) => f.name === file.name)) {
              toast({
                type: 'error',
                textKey: 'upload-box.error.duplicate',
              });
              return resolve(false);
            }
            if (filetype === FileType.FEET) {
              const json = JSON.parse(
                fileReader.result?.toString() || ''
              ) as Root;
              if (json.system === undefined) {
                setIsNotParseable(true);
                toast({
                  type: 'error',
                  textKey: 'upload-box.error.format',
                  textParams: { filetype },
                });
                return resolve(false);
              }
              return resolve({
                name: file.name,
                short: shortenedFileName(file.name),
                feet: json,
              });
            } else if (filetype === FileType.FWEET) {
              const arrayBuffer = file.arrayBuffer();
              return zip.loadAsync(arrayBuffer).then(async (zip) => {
                const databaseFilename = Object.keys(zip.files).find((file) =>
                  file.includes('.sdb')
                );
                if (!databaseFilename) {
                  toast({
                    type: 'error',
                    textKey: 'upload-box.error.general',
                  });
                  return;
                }
                const databaseFile = zip.file(databaseFilename);

                if (!databaseFile) {
                  toast({
                    type: 'error',
                    textKey: 'upload-box.error.general',
                  });
                  return;
                }

                const dbFile = await databaseFile
                  .async('uint8array')
                  .then(async (file) => IAmTryingOutSomeStuffOkaaaay(file));

                return resolve({
                  name: file.name,
                  short: shortenedFileName(file.name),
                  fepx: dbFile,
                });
              });
            }
          } catch (error) {
            if (error instanceof SyntaxError) {
              setIsNotParseable(true);
              toast({
                textKey: 'upload-box.error.format',
                type: 'error',
                textParams: { filetype },
              });
              resolve(false);
            }
          }
        };

        fileReader.readAsText(file, 'UTF-8');
      });
    });

    const uploadedFiles: DataFile[] = (await Promise.all(filesArray)).filter(
      (file) => file !== false
    ) as DataFile[];

    if (uploadedFiles.length !== 0) {
      addFiles(uploadedFiles);
      toast({ type: 'success', textKey: 'upload-box.success' });
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    handleUploadedFiles(event.dataTransfer.files);
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      handleUploadedFiles(event.target.files);
    }
  };

  return (
    <section className={classNames(styles.container, className)}>
      <div
        className={styles.uploadContainer}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isDragging) {
            setIsDragging(true);
          }
          const file = e.dataTransfer.items[0];
          if (
            file &&
            file.kind === 'file' &&
            file.type !== '' &&
            file.type !== acceptFileType
          ) {
            setIsNotParseable(true);
          } else {
            setIsNotParseable(false);
          }
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
            setIsNotParseable(false);
          }
        }}
      >
        {isDragging &&
          (isNotParseable ? (
            <CrossCircleIcon
              aria-label={translate('upload-box.error-icon.aria')}
              className={styles.statusIcon}
            />
          ) : (
            <UploadIcon
              aria-label={translate('upload-box.upload-icon.aria')}
              className={styles.statusIcon}
            />
          ))}
        <>
          {isDragging ? (
            <p className={styles.paragraph}>
              {translate(
                isNotParseable
                  ? 'upload-box.error.filetype'
                  : 'upload-box.release-upload'
              )}
            </p>
          ) : (
            <>
              <p className={styles.textWithOr}>
                <span>{translate('upload-box.description', { filetype })}</span>
                <span className={styles.paragraph}>
                  {translate('upload-box.or')}
                </span>
              </p>
              <GenericButton
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {translate('upload-box.button')}
              </GenericButton>
            </>
          )}
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            multiple={true}
            accept={acceptFileType}
            onChange={onFileSelected}
          />
        </>
      </div>
      <p>
        {translate('upload-box.supported-version') +
          productName +
          ' ' +
          versionNumber}
      </p>
    </section>
  );
};
export default UploadBox;

/*
const tryToReadDatabaseFile = async (databaseFile: JSZip.JSZipObject) => {
  return await databaseFile.async('string');
};


const hexToReadableAscii = (hexString: string): string => {
  let asciiString = '';
  for (let i = 0; i < hexString.length; i += 2) {
    const hexPair = hexString.substr(i, 2);
    const asciiChar = String.fromCharCode(parseInt(hexPair, 16));
    asciiString += asciiChar;
  }
  return asciiString;
};
*/