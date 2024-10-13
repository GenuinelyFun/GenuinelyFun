import { FC } from 'react';
import { DataProvider } from '../../utils/DataProvider';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';
import FileList from './FileList';
import styles from './FeetPage.module.less';

const FeetPage: FC = () => {
  return (
    <DataProvider>
      <section className={styles.container}>
        <aside>
          <ExportForm />
          <FileList />
        </aside>
        <ImportForm />
      </section>
    </DataProvider>
  );
};

export default FeetPage;
