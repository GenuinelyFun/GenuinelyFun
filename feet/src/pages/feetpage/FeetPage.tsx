import { FC } from 'react';
import { DataProvider } from '../../utils/DataProvider';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';
import FileList from './FileList';
import styles from './FeetPage.module.less';

const FeetPage: FC = () => {
  return (
    <DataProvider>
      <main className={styles.container}>
        <ImportForm />
        <aside>
          <ExportForm />
          <FileList />
        </aside>
      </main>
    </DataProvider>
  );
};

export default FeetPage;
