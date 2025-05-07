import classNames from 'classnames';
import { type JSZipObject } from 'jszip';
import { ChangeEvent, DragEventHandler, FC, useState } from 'react';

import CrossCircleIcon from '../../assets/icons/CrossCircleIcon';
import UploadIcon from '../../assets/icons/UploadIcon';
import GenericButton from '../../components/GenericButton';
import { shortenedFileName, useDataContext } from '../../utils/data-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useNoDropZone } from '../../utils/useNoDropZone.ts';
import { useToast } from '../../utils/useToast';
import styles from './fweetImportForm.module.less';

const FIREWIN_EXPLORER_VERSION = 'v4.15';

const FweetImportForm: FC<{ className?: string }> = ({ className }) => {
  useNoDropZone();
  const toast = useToast();
  const { addFiles } = useDataContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isNotJson, setIsNotJson] = useState(false);
  const { translate } = useLanguageContext();
  const handleUploadedFiles = async (files: FileList) => {
    setIsDragging(false);
    setIsNotJson(false);

    const filesArray = Array.from(files).map((file) => {
      if (file === null) {
        toast({
          type: 'error',
          textKey: 'fweet.upload.error-general',
        });
      }
      const fileReader = new FileReader();
      return new Promise<
        { name: string; fepx: Record<string, unknown> } | false
      >((resolve) => {
        fileReader.onload = () => {
          try {
            const json = JSON.parse(fileReader.result?.toString() || '');
            if (json.system === undefined) {
              toast({
                type: 'error',
                textKey: 'fweet.upload.error-root',
              });
              resolve(false);
            } else {
              return resolve({
                name: file.name,
                fepx: JSON.parse(fileReader.result?.toString() || ''),
              });
            }
          } catch (error) {
            if (error instanceof SyntaxError) {
              setIsNotJson(true);
              toast({
                textKey: 'fweet.upload.error-fepx',
                type: 'error',
              });
              resolve(false);
            }
          }
        };

        fileReader.readAsText(file, 'UTF-8');
      });
    });
    addFiles(
      (
        (
          await Promise.all<
            { name: string; fepx: Record<string, unknown> } | false
          >(filesArray)
        ).filter((file) => file !== false) as {
          name: string;
          fepx: Record<string, unknown>;
        }[]
      ).map((file) => ({
        ...file,
        short: shortenedFileName(file.name),
      }))
    );

    toast({ type: 'success', textKey: 'fweet.upload.success' });
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
    event.target.value = '';
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
            file.type !== 'application/json'
          ) {
            setIsNotJson(true);
          } else {
            setIsNotJson(false);
          }
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
            setIsNotJson(false);
          }
        }}
      >
        {isDragging &&
          (isNotJson ? (
            <CrossCircleIcon
              aria-label={translate('fweet.upload.error-icon.aria')}
              className={styles.statusIcon}
            />
          ) : (
            <UploadIcon
              aria-label={translate('fweet.upload.icon.aria')}
              className={styles.statusIcon}
            />
          ))}
        <>
          {isDragging ? (
            <p className={styles.paragraph}>
              {translate(
                isNotJson
                  ? 'fweet.upload.not.fepx'
                  : 'fweet.upload.release.to.upload'
              )}
            </p>
          ) : (
            <p className={styles.textWithOr}>
              <span>{translate('fweet.upload.description')}</span>
              <span className={styles.paragraph}>
                {translate('fweet.upload.or')}
              </span>
            </p>
          )}
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            multiple={true}
            accept={'application/json'}
            onChange={onFileSelected}
          />
          <GenericButton
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {translate('fweet.upload.button')}
          </GenericButton>
        </>
      </div>
      <p>{translate('fweet.supported-version') + FIREWIN_EXPLORER_VERSION}</p>
    </section>
  );
};

export default FweetImportForm;

// @ts-expect-error wip
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tryToReadDatabaseFile = async (databaseFile: JSZipObject) => {
  return await databaseFile.async('string');
};

// @ts-expect-error wip
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hexToReadableAscii = (hexString: string): string => {
  let asciiString = '';
  for (let i = 0; i < hexString.length; i += 2) {
    const hexPair = hexString.substr(i, 2);
    const asciiChar = String.fromCharCode(parseInt(hexPair, 16));
    asciiString += asciiChar;
  }
  return asciiString;
};
