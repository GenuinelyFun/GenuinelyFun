import { FC } from 'react';
import { DataProvider } from '../../utils/DataProvider';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';
import FileList from './FileList';
import styles from './FeetPage.module.less';
import { useLanguageContext } from '../../utils/LanguageProvider';

const FeetPage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <DataProvider>
      <main className={styles.container}>
        <h1>{translate('feet-page.title')}</h1>
        <p>{translate('feet-page.description')}</p>
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

export default FeetPage;
