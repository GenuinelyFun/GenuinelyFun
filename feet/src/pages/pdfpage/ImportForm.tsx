import { ChangeEvent, DragEventHandler, FC, useEffect, useState } from 'react';

import iconUpload from '../../assets/icons/upload.svg';
import iconWrongFileType from '../../assets/icons/upload-not-json.svg';
import { useLanguageContext } from '../../utils/LanguageProvider';
import { useToast } from '../../utils/useToast';
import GenericButton from '../../components/GenericButton';
import styles from './ImportForm.module.less';
import { useDataContext } from '../../utils/DataProvider';
import { Root } from '../../interfaces/jsonDataInterface';

const ImportForm: FC = () => {
  const toast = useToast();
  const { files, addFiles } = useDataContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isNotPdf, setIsNotPdf] = useState(false);
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

  const handleUploadedFiles = async (files: File) => {
    setIsDragging(false);
    setIsNotPdf(false);
    console.log(files);

    addFiles([{ name: files.name, json: {} as Root }]);

    const options = [
      'file:///C:/Users/nguye/OneDrive/Desktop/443%20N%C3%B8dlyssentral%201%20adresseliste.pdf',
      true, //true = json format, false text format
    ];

    /*  let filesArray = Array.from(files).map((file) => {
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
                                                                                                                                                                                                                                                                                                                                                                    setIsNotPdf(true);
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
                                                                                                                                                                                                                                                                                                                                                          });*/
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    handleUploadedFiles(event.dataTransfer.files[0]);
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      handleUploadedFiles(event.target.files[0]);
    }
    event.target.value = '';
  };

  if (files.length > 0 && files[0] !== undefined) {
    return <div>{files[0].name}</div>;
  }

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
          if (file && file.kind === 'file' && file.type !== 'application/pdf') {
            setIsNotPdf(true);
          } else {
            setIsNotPdf(false);
          }
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
            setIsNotPdf(false);
          }
        }}
      >
        {isDragging && (
          <img
            alt={translate(
              isNotPdf ? 'upload.error-icon.aria' : 'upload.icon.aria',
            )}
            src={isNotPdf ? iconWrongFileType : iconUpload}
            className={styles.statusIcon}
          />
        )}
        <>
          {isDragging ? (
            <p className={styles.paragraph}>
              {translate(
                isNotPdf ? 'upload.not.json' : 'upload.release.to.upload',
              )}
            </p>
          ) : (
            <p className={styles.textWithOr}>
              <span>{translate('upload.description')}</span>
              <span className={styles.paragraph}>{translate('upload.or')}</span>
            </p>
          )}
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            multiple={false}
            accept={'.pdf'}
            onChange={onFileSelected}
          />
          <GenericButton
            className={styles.uploadButton}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {translate('upload.button')}
          </GenericButton>
        </>
      </div>
    </section>
  );
};

export default ImportForm;
