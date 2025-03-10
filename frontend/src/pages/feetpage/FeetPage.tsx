import { FC } from 'react';

import PageHeading from '../../components/PageHeading';
import { DataProvider } from '../../utils/DataProvider';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import ExportForm from './export-form/ExportForm';
import styles from './FeetPage.module.less';
import FileList from './FileList';
import ImportForm from './ImportForm';

const FeetPage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <DataProvider>
      <main>
        <div className={styles.container}>
          <PageHeading className={styles.title}>
            {translate('feet-page.title')}
          </PageHeading>
          <div className={styles.content}>
            <p>{translate('feet-page.description_part1')}</p>
            <p>{translate('feet-page.description_part2')}</p>
            <ImportForm />
          </div>
          <div className={styles.aside}>
            <ExportForm />
            <FileList />
          </div>
        </div>
      </main>
    </DataProvider>
  );
};

export default FeetPage;
