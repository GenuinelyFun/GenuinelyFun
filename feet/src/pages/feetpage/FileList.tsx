import { useDataContext } from '../../utils/DataProvider';
import { useLanguageContext } from '../../utils/LanguageProvider';
import { default as FileIcon } from '../../assets/icons/file.svg';
import { default as CrossIcon } from '../../assets/icons/thick-cross.svg';
import styles from './FileList.module.less';

const FileList = () => {
  const { translate } = useLanguageContext();
  const { files, removeFile } = useDataContext();

  return (
    <ul
      className={styles.fileList}
      aria-label={translate('file-list.title.aria')}
    >
      {files.map(({ name }) => (
        <li
          className={styles.fileCard}
          key={name}
          aria-label={name.slice(0, 22)}
        >
          <div>
            <img src={FileIcon} alt={translate('file-list.document.aria')} />
            <p aria-label={name.slice(0, 22)}>{name}</p>
          </div>
          <button
            onClick={() => removeFile(name)}
            aria-label={translate('file-list.remove-file.aria')}
          >
            <img src={CrossIcon} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
