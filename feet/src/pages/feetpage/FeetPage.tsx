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
        <div className={styles.header}>
          <h1>{translate('feet-page.title')}</h1>
          <p>{translate('feet-page.description_part1')}</p>
          <p>{translate('feet-page.description_part2')}</p>
        </div>
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
