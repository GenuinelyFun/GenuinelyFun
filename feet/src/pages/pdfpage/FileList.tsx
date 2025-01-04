import { useDataContext } from '../../utils/DataProvider';
import { useLanguageContext } from '../../utils/LanguageProvider';
import { default as FileIcon } from '../../assets/icons/file.svg';
import { default as CrossIcon } from '../../assets/icons/thick-cross.svg';
import styles from './FileList.module.less';

const FileList = () => {
  const { translate } = useLanguageContext();
  const { files, removeFile } = useDataContext();

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
          <div>
            <img src={FileIcon} alt={translate('file-list.document.aria')} />
            <p aria-label={shortenedFileName(name)}>
              {shortenedFileName(name)}
            </p>
          </div>
          <button
            onClick={() => removeFile(name)}
            aria-label={
              translate('file-list.remove-file.aria') +
              ' ' +
              shortenedFileName(name)
            }
          >
            <img src={CrossIcon} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
