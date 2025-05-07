import { FC } from 'react';

import PageHeading from '../../components/PageHeading';
import { DataProvider } from '../../utils/DataProvider';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import FweetExportForm from './export-form/FweetExportForm.tsx';
import FweetFileList from './FweetFileList.tsx';
import FweetImportForm from './FweetImportForm.tsx';
import styles from './fweetPage.module.less';

const FweetPage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <DataProvider>
      <main>
        <div className={styles.container}>
          <PageHeading className={styles.title}>
            {translate('fweet.page.title')}
          </PageHeading>
          <div className={styles.content}>
            <p>{translate('fweet.page.description.1')}</p>
            <p>{translate('fweet.page.description.2')}</p>
            <FweetImportForm />
          </div>
          <div className={styles.aside}>
            <FweetExportForm />
            <FweetFileList />
          </div>
        </div>
      </main>
    </DataProvider>
  );
};

export default FweetPage;
