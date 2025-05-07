import classNames from 'classnames';
import { FC } from 'react';

import CrossHollowIcon from '../assets/icons/CrossHollowIcon.tsx';
import FileIcon from '../assets/icons/FileIcon';
import { ImportExportPageType, useDataContext } from '../utils/data-utils.ts';
import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import styles from './FileList.module.less';

const FileList: FC<{ fileType: ImportExportPageType }> = ({ fileType }) => {
  const { translate } = useLanguageContext();
  const { removeFile, ...data } = useDataContext();

  const fileTypeString = () => {
    switch (fileType) {
      case ImportExportPageType.FEET:
        return 'JSON';
      case ImportExportPageType.FWEET:
        return '.FEPX';
      case ImportExportPageType.INNO:
        return 'PDF';
    }
  };
  let files = [];
  switch (fileType) {
    case ImportExportPageType.FEET:
      files = data.feetFiles;
      break;
    case ImportExportPageType.FWEET:
      files = data.fweetFiles;
      break;
    case ImportExportPageType.INNO:
      files = data.innoFiles;
      break;
  }

  return (
    <ul
      className={styles.fileList}
      aria-label={translate('file-list.title.aria', {
        filetype: fileTypeString(),
      })}
    >
      {files.map(({ name, short }, index) => (
        <li className={styles.fileCard} key={index + short} aria-label={short}>
          <FileIcon
            aria-label={translate('file-list.document.aria')}
            className={classNames(styles.icon)}
          />
          <p>{short}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              removeFile(name);
            }}
          >
            <CrossHollowIcon
              className={classNames(styles.icon, styles.crossIcon)}
              aria-label={translate('file-list.remove-file.aria', {
                file: short,
              })}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
