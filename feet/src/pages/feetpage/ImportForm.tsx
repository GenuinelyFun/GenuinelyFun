import React, {
  ChangeEvent,
  DragEventHandler,
  FC,
  useEffect,
  useState,
} from 'react';
import { Root } from '../../interfaces/jsonDataInterface';
import { useLanguageContext } from '../../utils/LanguageProvider';
import GenericButton from '../../components/GenericButton';
import iconUpload from '../../assets/icons/upload.svg';
import iconWrongFileType from '../../assets/icons/upload-not-json.svg';
import iconSuccess from '../../assets/icons/upload-success.svg';
import styles from './ImportForm.module.less';

import { useToast } from '../../utils/useToast';

const ImportForm: FC<{
  data?: Record<string, Root>;
  setData: (value: Record<string, Root>) => void;
}> = ({ data, setData }) => {
  const toast = useToast();

    const [error, setError] = useState<string | boolean>(false);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isWrongFileType, setIsNotJson] = useState(false);
    const { translate } = useLanguageContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isWrongFileType, setIsNotJson] = useState(false);
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

  const handleUploadedFile = (file: File) => {
    if (file === null) {
      toast({ type: 'error', textKey: 'upload.error-general' });
    }
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = (e) => {
      if (e.target?.result) {
        try {
          const json = JSON.parse(e.target.result.toString()) as Root;
          if (json.system === undefined) {
            toast({
              type: 'error',
              textKey: 'upload.error-root',
            });
          } else {
            setData({ [file.name]: json });
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            toast({
              textKey: 'upload.error-json',
              type: 'error',
            });
          }
        }
      }
    };
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setIsNotJson(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type !== 'application/json') {
      setIsNotJson(true);
      return;
    }

    if (file) {
      handleUploadedFile(file);
    }
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsNotJson(false);

    const file = event.target.files?.[0];
    if (file && file.type !== 'application/json') {
      setIsNotJson(true);
      return;
    }

    if (file) {
      handleUploadedFile(file);
    }
  };

  return (
    <div
      className={styles.container}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isDragging) {
          setIsDragging(true);
        }
        const file = e.dataTransfer.items[0];
        if (file && file.kind === 'file' && file.type !== 'application/json') {
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
            isWrongFileType
              ? 'upload.error-icon.aria-label'
              : 'upload.icon.aria-label',
          )}
          src={isWrongFileType ? iconWrongFileType : iconUpload}
          className={styles.draggingSvg}
        />
      )}
      {data && !isDragging && (
        <>
          <img
            src={iconSuccess}
            alt={translate('upload.success-icon.aria-label')}
            className={styles.draggingSvg}
          />
          <p>{translate('upload.success')}</p>
        </>
      )}
      <>
        {isDragging && (
          <p>
            {translate(
              isWrongFileType ? 'upload.not.json' : 'upload.release.to.upload',
            )}
          </p>
        )}
        {!isDragging && !data && (
          <>
            <p>
              {translate(
                isWrongFileType ? 'upload.not.json' : 'upload.description',
              )}
            </p>
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
  );
};

export default ImportForm;
