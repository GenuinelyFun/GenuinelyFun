import { FC } from 'react';

import PageHeading from '../../components/PageHeading';
import UploadBox from '../../components/UploadBox.tsx';
import { FileType } from '../../utils/data-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import FweetExportForm from './export-form/FweetExportForm.tsx';
import FweetFileList from './FweetFileList.tsx';
import styles from './fweetPage.module.less';

const FIREWIN_EXPLORER_VERSION = 'v4.15';

const FweetPage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <main>
      <div className={styles.container}>
        <PageHeading className={styles.title}>
          {translate('fweet.page.title')}
        </PageHeading>
        <div className={styles.content}>
          <p>{translate('fweet.page.description.1')}</p>
          <p>{translate('fweet.page.description.2')}</p>
          <UploadBox
            filetype={FileType.FWEET}
            versionNumber={FIREWIN_EXPLORER_VERSION}
            productName={'FireWin Explorer'}
            acceptFileType={'.fepx'}
          />
        </div>
        <div className={styles.aside}>
          <FweetExportForm />
          <FweetFileList />
        </div>
      </div>
    </main>
  );
};

export default FweetPage;
