import { useDataContext } from '../../utils/DataProvider';
import { ReactComponent as FileIcon } from '../../assets/icons/file.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
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
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
