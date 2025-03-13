import { FC } from 'react';

import PageHeading from '../../components/PageHeading';
import { DataProvider } from '../../utils/DataProvider';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import FeetExportForm from './export-form/FeetExportForm.tsx';
import FeetFileList from './FeetFileList.tsx';
import FeetImportForm from './FeetImportForm.tsx';
import styles from './FeetPage.module.less';

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
            <FeetImportForm />
          </div>
          <div className={styles.aside}>
            <FeetExportForm />
            <FeetFileList />
          </div>
        </div>
      </main>
    </DataProvider>
  );
};

export default FeetPage;
