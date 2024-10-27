import { useDataContext } from '../../utils/DataProvider';
import { ReactComponent as FileIcon } from '../../assets/icons/file.svg';
import { ReactComponent as CrossIcon } from '../../assets/icons/thick-cross.svg';
import styles from './FileList.module.less';

const FileList = () => {
  const { files, removeFile } = useDataContext();
  return (
    <ul className={styles.fileList}>
      {files.map(({ name }) => (
        <li className={styles.fileCard} key={name}>
          <div>
            <FileIcon />
            <p>{name}</p>
          </div>
          <button onClick={() => removeFile(name)}>
            <CrossIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
