import classNames from 'classnames';
import { useDataContext } from '../../utils/DataProvider';
import { useLanguageContext } from '../../utils/LanguageProvider';
import { Darkmode, useDarkmodeContext } from '../../utils/DarkmodeProvider';
import { default as FileIcon } from '../../assets/icons/file.svg';
import { default as CrossIcon } from '../../assets/icons/thick-cross.svg';
import styles from './FileList.module.less';

const FileList = () => {
  const { translate } = useLanguageContext();
  const { files, removeFile } = useDataContext();
  const { theme } = useDarkmodeContext();

  return (
    <ul
      className={styles.fileList}
      aria-label={translate('file-list.title.aria')}
    >
      {files.map(({ name, short }) => (
        <li className={styles.fileCard} key={short} aria-label={short}>
          <img
            src={FileIcon}
            alt={translate('file-list.document.aria')}
            className={classNames({
              [styles.icon]: theme === Darkmode.Dark,
            })}
          />
          <p>{short}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              removeFile(name);
            }}
          >
            <img
              src={CrossIcon}
              className={classNames({
                [styles.icon]: theme === Darkmode.Dark,
              })}
              alt={translate('file-list.remove-file.aria', {
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
