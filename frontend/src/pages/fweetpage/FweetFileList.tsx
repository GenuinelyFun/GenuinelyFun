import classNames from 'classnames';

import CrossIcon from '../../assets/icons/CrossIcon';
import FileIcon from '../../assets/icons/FileIcon';
import { useDataContext } from '../../utils/data-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import styles from './fweetFileList.module.less';

const FweetFileList = () => {
  const { translate } = useLanguageContext();
  const { fweetFiles, removeFile } = useDataContext();

  return (
    <ul
      className={styles.fileList}
      aria-label={translate('fweet.file-list.title.aria')}
    >
      {fweetFiles.map(({ name, short }) => (
        <li className={styles.fileCard} key={short} aria-label={short}>
          <FileIcon
            aria-label={translate('fweet.file-list.document.aria')}
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
              aria-label={translate('fweet.file-list.remove-file.aria', {
                file: short,
              })}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FweetFileList;
