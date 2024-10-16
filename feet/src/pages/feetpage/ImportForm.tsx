import React, {
  ChangeEvent,
  DragEventHandler,
  FC,
  useEffect,
  useState,
} from 'react';
import iconUpload from '../../assets/icons/upload.svg';
import iconWrongFileType from '../../assets/icons/upload-not-json.svg';
import { useLanguageContext } from '../../utils/LanguageProvider';
import { useToast } from '../../utils/useToast';
import { Root } from '../../interfaces/jsonDataInterface';
import { useDataContext } from '../../utils/DataProvider';
import GenericButton from '../../components/GenericButton';
import styles from './ImportForm.module.less';


const FIRE_EXPERT_VERSION = '24.5';

const ImportForm: FC = () => {
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

    let filesArray = Array.from(files).map((file) => {
      if (file === null) {
        toast({ type: 'error', textKey: 'upload.error-general' });
      }
      const fileReader = new FileReader();
      return new Promise<{ name: string; json: Root } | false>((resolve) => {
        fileReader.onload = () => {
          try {
            const json = JSON.parse(
              fileReader.result?.toString() || '',
            ) as Root;
            if (json.system === undefined) {
              toast({
                type: 'error',
                textKey: 'upload.error-root',
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
                textKey: 'upload.error-json',
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
        await Promise.all<{ name: string; json: Root } | false>(filesArray)
      ).filter((file) => file !== false) as { name: string; json: Root }[],
    );
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
    <section className={styles.container}>
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
        {isDragging && (
          <img
            alt={translate(
              isNotJson
                ? 'upload.error-icon.aria-label'
                : 'upload.icon.aria-label',
            )}
            src={isNotJson ? iconWrongFileType : iconUpload}
            className={styles.statusIcon}
          />
        )}
        <>
          {isDragging ? (
            <p>
              {translate(
                isNotJson ? 'upload.not.json' : 'upload.release.to.upload',
              )}
            </p>
          ) : (
            <>
              <p>{translate('upload.description')}</p>
              <p className={styles.paragraph}>{translate('upload.or')}</p>
            </>
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
            className={styles.uploadButton}
            onClick={() => document.getElementById('file-upload')?.click()}
            buttonText={translate('upload.button')}
          />
        </>
      </div>
      <p>{translate('supported-version') + FIRE_EXPERT_VERSION}</p>
    </section>
  );
};

export default ImportForm;
