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

const ImportForm: FC<{ data?: Root; setData: (value: Root) => void }> = ({
  data,
  setData,
}) => {
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
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
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = (e) => {
      if (e.target?.result) {
        try {
          setData(JSON.parse(e.target.result.toString()));
        } catch (error) {
          if (error instanceof SyntaxError) {
            setError('json');
          }
        }
        setLoading(false);
      }
    };
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setError(false);
    setLoading(true);
    setIsDragging(false);
    setIsNotJson(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type !== 'application/json') {
      setIsNotJson(true);
      setLoading(false);
      return;
    }

    if (file) {
      handleUploadedFile(file);
    }
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setIsNotJson(false);

    const file = event.target.files?.[0];
    if (file && file.type !== 'application/json') {
      setIsNotJson(true);
      setLoading(false);
      return;
    }

    if (file) {
      handleUploadedFile(file);
    }
  };

  const errorText = () => {
    if (error === 'json') {
      return translate('upload.error-json');
    }
    return translate('upload.error');
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
          src={isWrongFileType ? iconWrongFileType : iconUpload}
          className={styles.draggingSvg}
        />
      )}
      {data && !isDragging && (
        <>
          <img src={iconSuccess} className={styles.draggingSvg} />
          <p>{translate('upload.success')}</p>
        </>
      )}
      <>
        {isDragging && isWrongFileType && <p>{translate('upload.not.json')}</p>}
        {isDragging && !isWrongFileType && (
          <p>{translate('upload.release.to.upload')}</p>
        )}
        {!isDragging && !data && (
          <>
            <p>
              {isWrongFileType
                ? translate('upload.not.json')
                : translate('upload.description')}
            </p>
            <p className={styles.paragraph}>{translate('upload.or')}</p>
          </>
        )}
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={onFileSelected}
        />
        <GenericButton
          className={styles.uploadButton}
          onClick={() => document.getElementById('file-upload')?.click()}
          buttonText={translate('upload.button')}
        />
      </>
      {error && <p className={styles.error}>{errorText()}</p>}
    </div>
  );
};

export default ImportForm;
