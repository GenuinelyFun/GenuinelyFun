import { ChangeEvent, DragEventHandler, FC, useState } from 'react';
import { Root } from '../../interfaces/jsonDataInterface';
import { useLanguageContext } from '../../utils/LanguageProvider';
import styles from './ImportForm.module.less';
import GenericButton from '../../components/GenericButton';

const ImportForm: FC<{ data?: Root; setData: (value: Root) => void }> = ({
  data,
  setData,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { translate } = useLanguageContext();

  const handleUploadedFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setData(JSON.parse(e.target.result.toString()));
        setLoading(false);
      } else {
        setError(true);
      }
    };
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setError(false);
    setLoading(true);
    handleUploadedFile(event.dataTransfer.files[0]);
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    if (event.target.files?.[0]) {
      handleUploadedFile(event.target.files[0]);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div
        className={styles.container}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <>
          {data ? (
            <p>{translate('import-upload-success')}</p>
          ) : (
            <>
              <p>{translate('import-upload-description')}</p>
              <p>{translate('import-upload-or')}</p>
            </>
          )}
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={onFileSelected}
          />
          <GenericButton
            onClick={() => document.getElementById('file-upload')?.click()}
            buttonText={translate('upload-button')}
          />
        </>
      </div>
      {error && <p className={styles.error}>{translate('upload-error')}</p>}
    </>
  );
};

export default ImportForm;
