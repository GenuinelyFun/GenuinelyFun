import { FC } from 'react';
import { DataProvider } from '../../utils/DataProvider';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';
import FileList from './FileList';
import styles from './PdfPage.module.less';
import { useLanguageContext } from '../../utils/LanguageProvider';

const PdfPage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <DataProvider>
      <main className={styles.container}>
        <div className={styles.content}>
          <ImportForm />
          <aside>
            <ExportForm />
            <FileList />
          </aside>
        </div>
      </main>
    </DataProvider>
  );
};

export default PdfPage;
