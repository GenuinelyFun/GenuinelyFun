import classNames from 'classnames';
import JSZip from 'jszip';
import {
  ChangeEvent,
  DragEventHandler,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import initSqlJs from 'sql.js';
import { extractText, getDocumentProxy } from 'unpdf';

import CrossCircleIcon from '../assets/icons/CrossCircleIcon.tsx';
import UploadIcon from '../assets/icons/UploadIcon.tsx';
import { Root } from '../projects/feet/feetJsonDataInterface.ts';
import {
  DataFile,
  ImportExportPageType,
  shortenedFileName,
  useDataContext,
} from '../utils/data-utils.ts';
import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import { parseFileSize } from '../utils/parseFileSize';
import { useNoDropZone } from '../utils/useNoDropZone.ts';
import { useToast } from '../utils/useToast.ts';
import GenericButton from './GenericButton.tsx';
import LineBreak from './LineBreak.tsx';
import styles from './UploadBox.module.less';

interface Props {
  versionNumber?: string;
  className?: string;
  filetype: ImportExportPageType;
  productName?: string;
  acceptFileType: string;
  maxFileSize: string;
  maxNumberOfFiles: number;
}

const ACCEPTED_MIMES: Record<ImportExportPageType, string[]> = {
  [ImportExportPageType.FEET]: ['application/json', 'text/json'],
  [ImportExportPageType.FWEET]: [
    'application/zip',
    'application/x-zip-compressed',
    'application/x-zip',
  ],
  [ImportExportPageType.INNO]: ['application/pdf'],
  [ImportExportPageType.APET]: ['application/xml', 'text/xml'],
};

const baseMimeType = (type: string) => type.split(';')[0].trim().toLowerCase();

const isDraggedFileWrong = (
  items: { type: string; kind: string }[],
  filetype: ImportExportPageType
): boolean => {
  const accepted = ACCEPTED_MIMES[filetype];
  return items.some(
    ({ kind, type }) =>
      kind === 'file' && !accepted.includes(baseMimeType(type))
  );
};

const UploadBox: FC<Props> = ({
  versionNumber,
  className,
  filetype,
  productName,
  acceptFileType,
  maxFileSize,
  maxNumberOfFiles,
}) => {
  useNoDropZone();
  const toast = useToast();
  const { feetFiles, fweetFiles, innoFiles, apetFiles, addFiles } =
    useDataContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isNotParseable, setIsNotParseable] = useState(false);
  const { translate } = useLanguageContext();
  const dragLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (dragLeaveTimeoutRef.current)
        clearTimeout(dragLeaveTimeoutRef.current);
    };
  }, []);

  const cancelDragLeave = () => {
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current);
      dragLeaveTimeoutRef.current = null;
    }
  };

  const handleUploadedFiles = async (files: FileList) => {
    setIsDragging(false);
    setIsNotParseable(false);

    if (files.length > maxNumberOfFiles) {
      toast({
        type: 'error',
        textKey: 'upload-box.error.too-many-files',
        textParams: {
          maxNumberOfFiles: maxNumberOfFiles.toString(),
          acceptFileType,
        },
      });
      setIsNotParseable(true);
      return;
    }

    const maxBytes = parseFileSize(maxFileSize);

    const currentPageFiles: DataFile[] =
      {
        [ImportExportPageType.FEET]: feetFiles,
        [ImportExportPageType.FWEET]: fweetFiles,
        [ImportExportPageType.INNO]: innoFiles,
        [ImportExportPageType.APET]: apetFiles,
      }[filetype] ?? [];

    const filesArray = Array.from(files).map(async (file) => {
      if (file === null) {
        toast({ type: 'error', textKey: 'upload-box.error.general' });
        return undefined;
      }

      if (file.size > maxBytes) {
        toast({
          type: 'error',
          textKey: 'upload-box.error.file-too-large',
          textParams: { maxFileSize },
        });
        return undefined;
      }

      const fileExt = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
      if (fileExt !== acceptFileType) {
        setIsNotParseable(true);
        toast({
          type: 'error',
          textKey: 'upload-box.error.format',
          textParams: { filetype },
        });
        return undefined;
      }

      if (currentPageFiles.some((f) => f.name === file.name)) {
        toast({ type: 'error', textKey: 'upload-box.error.duplicate' });
        return undefined;
      }

      const fileReader = new FileReader();
      return new Promise<DataFile | false>((resolve) => {
        const zip = new JSZip();

        fileReader.onload = async () => {
          try {
            switch (filetype) {
              case ImportExportPageType.FEET: {
                const json = JSON.parse(
                  fileReader.result?.toString() ?? ''
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
              }

              case ImportExportPageType.FWEET: {
                return zip
                  .loadAsync(file.arrayBuffer())
                  .then(async (archive) => {
                    const dbFilename = Object.keys(archive.files).find((f) =>
                      f.includes('.sdb')
                    );
                    if (!dbFilename) {
                      toast({
                        type: 'error',
                        textKey: 'upload-box.error.general',
                      });
                      return resolve(false);
                    }

                    const dbEntry = archive.file(dbFilename);
                    if (!dbEntry) {
                      toast({
                        type: 'error',
                        textKey: 'upload-box.error.general',
                      });
                      return resolve(false);
                    }

                    const SQL = await initSqlJs({
                      locateFile: (f) => `/${f}`,
                    });
                    const data = await dbEntry.async('uint8array');
                    return resolve({
                      name: file.name,
                      short: shortenedFileName(file.name),
                      fepx: new SQL.Database(data),
                    });
                  })
                  .catch(() => {
                    setIsNotParseable(true);
                    toast({
                      type: 'error',
                      textKey: 'upload-box.error.format',
                      textParams: { filetype },
                    });
                    return resolve(false);
                  });
              }

              case ImportExportPageType.INNO: {
                const buffer = await file.arrayBuffer();
                const pdf = getDocumentProxy(new Uint8Array(buffer));
                const { text } = await extractText(await pdf, {
                  mergePages: false,
                });
                return resolve({
                  name: file.name,
                  short: shortenedFileName(file.name),
                  inno: text,
                });
              }

              case ImportExportPageType.APET: {
                const xml = fileReader.result?.toString() ?? '';
                const doc = new DOMParser().parseFromString(
                  xml,
                  'application/xml'
                );
                const rootTag = doc.documentElement.tagName;
                if (rootTag !== 'AUTRO_SAFE' && rootTag !== 'AFS_BS200') {
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
                  apet: xml,
                });
              }

              default:
                return resolve(false);
            }
          } catch {
            setIsNotParseable(true);
            toast({
              type: 'error',
              textKey: 'upload-box.error.format',
              textParams: { filetype },
            });
            resolve(false);
          }
        };

        fileReader.readAsText(file, 'UTF-8');
      });
    });

    const uploadedFiles = (await Promise.all(filesArray)).filter(
      (file): file is DataFile => !!file
    );

    if (uploadedFiles.length !== 0) {
      addFiles(uploadedFiles);
      toast({ type: 'success', textKey: 'upload-box.success' });
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    cancelDragLeave();
    handleUploadedFiles(event.dataTransfer.files);
  };

  const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      handleUploadedFiles(event.target.files);
    }
  };

  return (
    <section className={classNames(styles.container, className)}>
      <LineBreak />
      <h2 className={styles.uploadBoxTitle}>{translate('upload-box.title')}</h2>
      <p className={styles.uploadBoxCriteria}>
        {translate('upload-box.upload-criteria')}
      </p>
      <ul className={styles.uploadBoxList}>
        <li>
          {translate('upload-box.supported-file-types')}
          {acceptFileType}
        </li>
        <li>
          {translate('upload-box.max-file-size')}
          {maxFileSize}
        </li>
        <li>
          {translate('upload-box.number-of-files')}
          {maxNumberOfFiles}
        </li>
        <li>
          {translate('upload-box.supported-version') +
            productName +
            ' ' +
            versionNumber}
        </li>
      </ul>
      <div
        className={styles.uploadContainer}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          cancelDragLeave();
          if (!isDragging) setIsDragging(true);

          const items: { type: string; kind: string }[] = [];
          for (const item of e.dataTransfer.items)
            items.push({ type: item.type, kind: item.kind });

          setIsNotParseable(isDraggedFileWrong(items, filetype));
        }}
        onDragLeave={() => {
          dragLeaveTimeoutRef.current = setTimeout(() => {
            setIsDragging(false);
            setIsNotParseable(false);
          }, 50);
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
    </section>
  );
};
export default UploadBox;
