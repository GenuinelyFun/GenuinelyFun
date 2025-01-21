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

  const shortenedFileName = (name: string) => {
    if (name.length <= 22) return name;
    return name.slice(0, 22) + '...';
  };

  return (
    <ul
      className={styles.fileList}
      aria-label={translate('file-list.title.aria')}
    >
      {files.map(({ name }) => (
        <li
          className={styles.fileCard}
          key={shortenedFileName(name)}
          aria-label={shortenedFileName(name)}
        >
          <img
            src={FileIcon}
            alt={translate('file-list.document.aria')}
            className={classNames({
              [styles.icon]: theme === Darkmode.Dark,
            })}
          />
          <p>{shortenedFileName(name)}</p>
          <button onClick={() => removeFile(name)}>
            <img
              src={CrossIcon}
              className={classNames({
                [styles.icon]: theme === Darkmode.Dark,
              })}
              alt={
                translate('file-list.remove-file.aria') +
                ' ' +
                shortenedFileName(name)
              }
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
