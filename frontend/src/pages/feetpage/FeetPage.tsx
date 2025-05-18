import { FC } from 'react';

import PageHeading from '../../components/PageHeading';
import UploadBox from '../../components/UploadBox.tsx';
import { FileType } from '../../utils/data-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import FeetExportForm from './export-form/FeetExportForm.tsx';
import FeetFileList from './FeetFileList.tsx';
import styles from './FeetPage.module.less';

const FIRE_EXPERT_VERSION = 'MCU 24.11.6.g';

const FeetPage: FC = () => {
  const { translate } = useLanguageContext();

  return (
    <main>
      <div className={styles.container}>
        <PageHeading className={styles.title}>
          {translate('feet-page.title')}
        </PageHeading>
        <div className={styles.content}>
          <p>{translate('feet-page.description_part1')}</p>
          <p>{translate('feet-page.description_part2')}</p>
          <UploadBox
            filetype={FileType.FEET}
            productName={'Fire Expert'}
            versionNumber={FIRE_EXPERT_VERSION}
            acceptFileType={'application/json'}
          />
        </div>
        <div className={styles.aside}>
          <FeetExportForm />
          <FeetFileList />
        </div>
      </div>
    </main>
  );
};

export default FeetPage;
