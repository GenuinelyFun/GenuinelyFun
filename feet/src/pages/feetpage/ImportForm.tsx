import { ChangeEvent, DragEventHandler, FC, useState } from 'react';
import { Root } from '../../interfaces/jsonDataInterface';
import { useLanguageContext } from '../../utils/LanguageProvider';
import styles from './ImportForm.module.less';
import GenericButton from '../../components/GenericButton';

const ImportForm: FC<{ data?: Root; setData: (value: Root) => void }> = ({
  data,
  setData,
}) => {
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);
  const { translate } = useLanguageContext();

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

    if (event.dataTransfer.files[0]) {
      handleUploadedFile(event.dataTransfer.files[0]);
    }
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);

    if (event.target.files?.[0]) {
      handleUploadedFile(event.target.files[0]);
    }
  };

  const errorText = () => {
    if (error === 'json') {
      return translate('upload-error-json');
    }
    return translate('upload-error');
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
      {error && <p className={styles.error}>{errorText()}</p>}
    </>
  );
};

export default ImportForm;
