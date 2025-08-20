import { FC } from 'react';

import Alert from '../../components/Alert.tsx';
import FileList from '../../components/FileList.tsx';
import PageHeading from '../../components/PageHeading.tsx';
import UploadBox from '../../components/UploadBox.tsx';
import { ImportExportPageType } from '../../utils/data-utils.ts';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/i18n/language-utils.ts';
import FeetExportForm from './feetpage/FeetExportForm.tsx';
import FweetExportForm from './fweetpage/FweetExportForm.tsx';
import styles from './ImportExportPage.module.less';
import InnoExportForm from './innopage/InnoExportForm.tsx';

const FIRE_EXPERT_VERSION = 'MCU 24.11.6.g';
const FIREWIN_EXPLORER_VERSION = 'v4.16';
const INTEGRATOR_APP_VERSION = '2025.3';

const importExportPageVariables = (pageType: ImportExportPageType) => {
  switch (pageType) {
    case ImportExportPageType.FEET:
      return {
        versionNumber: FIRE_EXPERT_VERSION,
        productName: 'Fire Expert',
        acceptFileType: '.json',
        maxFileSize: '1 MB',
        maxNumberOfFiles: 10,
        exportForm: <FeetExportForm />,
      };
    case ImportExportPageType.FWEET:
      return {
        versionNumber: FIREWIN_EXPLORER_VERSION,
        productName: 'FireWin Explorer',
        acceptFileType: '.fepx',
        maxFileSize: '3500 kB',
        maxNumberOfFiles: 2,
        exportForm: <FweetExportForm />,
      };
    case ImportExportPageType.INNO:
      return {
        versionNumber: INTEGRATOR_APP_VERSION,
        productName: 'Integrator',
        acceptFileType: '.pdf',
        maxFileSize: '2 MB',
        maxNumberOfFiles: 10,
        exportForm: <InnoExportForm />,
      };
  }
};

const ImportExportPage: FC<{
  pageType: ImportExportPageType;
}> = ({ pageType }) => {
  const { translate } = useLanguageContext();
  const {
    versionNumber,
    productName,
    acceptFileType,
    exportForm,
    maxFileSize,
    maxNumberOfFiles,
  } = importExportPageVariables(pageType)!;
  return (
    <main>
      <div className={styles.container}>
        <PageHeading className={styles.title}>
          {translate(`${pageType}.page.title` as TranslateTextKey)}
        </PageHeading>
        <div className={styles.content}>
          <p>
            {translate(`${pageType}.page.description.1` as TranslateTextKey)}
          </p>
          {pageType === ImportExportPageType.INNO && (
            <div className={styles.alertInno}>
              <Alert
                variant="info"
                title={'alert-inno.title'}
                showCloseButton={false}
              >
                {translate('alert-inno.description')}
              </Alert>
            </div>
          )}
          <p>
            {translate(`${pageType}.page.description.2` as TranslateTextKey)}
          </p>

          <UploadBox
            filetype={pageType}
            versionNumber={versionNumber}
            productName={productName}
            acceptFileType={acceptFileType}
            maxFileSize={maxFileSize}
            maxNumberOfFiles={maxNumberOfFiles}
          />
        </div>
        <div className={styles.aside}>
          {exportForm}
          <FileList fileType={pageType} />
        </div>
      </div>
    </main>
  );
};

export default ImportExportPage;
