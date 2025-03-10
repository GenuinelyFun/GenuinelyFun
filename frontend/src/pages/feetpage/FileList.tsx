import classNames from 'classnames';

import CrossIcon from '../../assets/icons/CrossIcon';
import FileIcon from '../../assets/icons/FileIcon';
import { useDataContext } from '../../utils/data-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import styles from './FileList.module.less';

const FileList = () => {
  const { translate } = useLanguageContext();
  const { files, removeFile } = useDataContext();

  return (
    <ul
      className={styles.fileList}
      aria-label={translate('file-list.title.aria')}
    >
      {files.map(({ name, short }) => (
        <li className={styles.fileCard} key={short} aria-label={short}>
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
            <CrossIcon
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
