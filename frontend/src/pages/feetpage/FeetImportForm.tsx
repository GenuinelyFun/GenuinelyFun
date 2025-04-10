import classNames from 'classnames';
import { ChangeEvent, DragEventHandler, FC, useEffect, useState } from 'react';

import CrossCircleIcon from '../../assets/icons/CrossCircleIcon';
import UploadIcon from '../../assets/icons/UploadIcon';
import GenericButton from '../../components/GenericButton';
import { Root } from '../../projects/feet/feetJsonDataInterface.ts';
import { shortenedFileName, useDataContext } from '../../utils/data-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useToast } from '../../utils/useToast';
import styles from './FeetImportForm.module.less';

const FIRE_EXPERT_VERSION = 'MCU 24.11.6.g';

const FeetImportForm: FC<{ className?: string }> = ({ className }) => {
  const toast = useToast();
  const { addFiles } = useDataContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isNotJson, setIsNotJson] = useState(false);
  const { translate } = useLanguageContext();
  /* Prevent browser from loading a drag-and-dropped file */
  useEffect(() => {
    const noDropZone = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener('dragover', noDropZone, false);
    window.addEventListener('drop', noDropZone, false);

    return () => {
      window.removeEventListener('dragover', noDropZone, false);
      window.removeEventListener('drop', noDropZone, false);
    };
  }, []);

  const handleUploadedFiles = async (files: FileList) => {
    setIsDragging(false);
    setIsNotJson(false);

    const filesArray = Array.from(files).map((file) => {
      if (file === null) {
        toast({
          type: 'error',
          textKey: 'feet-import.upload.error-general',
        });
      }
      const fileReader = new FileReader();
      return new Promise<{ name: string; json: Root } | false>((resolve) => {
        fileReader.onload = () => {
          try {
            const json = JSON.parse(
              fileReader.result?.toString() || ''
            ) as Root;
            if (json.system === undefined) {
              toast({
                type: 'error',
                textKey: 'feet-import.upload.error-root',
              });
              resolve(false);
            } else {
              return resolve({
                name: file.name,
                json: JSON.parse(fileReader.result?.toString() || '') as Root,
              });
            }
          } catch (error) {
            if (error instanceof SyntaxError) {
              setIsNotJson(true);
              toast({
                textKey: 'feet-import.upload.error-json',
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
          await Promise.all<{ name: string; json: Root } | false>(filesArray)
        ).filter((file) => file !== false) as { name: string; json: Root }[]
      ).map((file) => ({
        ...file,
        short: shortenedFileName(file.name),
      }))
    );

    toast({ type: 'success', textKey: 'feet-import.upload.success' });
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
              aria-label={translate('feet-import.upload.error-icon.aria')}
              className={styles.statusIcon}
            />
          ) : (
            <UploadIcon
              aria-label={translate('feet-import.upload.icon.aria')}
              className={styles.statusIcon}
            />
          ))}
        <>
          {isDragging ? (
            <p className={styles.paragraph}>
              {translate(
                isNotJson
                  ? 'feet-import.upload.not.json'
                  : 'feet-import.upload.release.to.upload'
              )}
            </p>
          ) : (
            <p className={styles.textWithOr}>
              <span>{translate('feet-import.upload.description')}</span>
              <span className={styles.paragraph}>
                {translate('feet-import.upload.or')}
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
            {translate('feet-import.upload.button')}
          </GenericButton>
        </>
      </div>
      <p>{translate('feet-import.supported-version') + FIRE_EXPERT_VERSION}</p>
    </section>
  );
};

export default FeetImportForm;
