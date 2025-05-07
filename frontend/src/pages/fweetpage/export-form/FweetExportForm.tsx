import classNames from 'classnames';
import { Workbook } from 'exceljs';
import fweetFilesaver from 'file-saver';
import { FC, FormEventHandler, useState } from 'react';

import GenericButton from '../../../components/GenericButton';
import InfoBox from '../../../components/InfoBox';
import { FweetFile, useDataContext } from '../../../utils/data-utils.ts';
import {
  Language,
  useLanguageContext,
} from '../../../utils/i18n/language-utils.ts';
import { useToast } from '../../../utils/useToast';
import styles from './fweetExportForm.module.less';

export interface FilterPanelType {
  [fileName: string]: { [panel: string]: boolean };
}

const FweetExportForm: FC = () => {
  const toast = useToast();
  const { translate, i18n } = useLanguageContext();
  const { fweetFiles } = useDataContext();
  const [disclaimer, setDisclaimer] = useState<boolean>(false);
  const [separatefweetFiles, setSeparatefweetFiles] = useState<boolean>(false);
  const [sheetLanguage, setSheetLanguage] = useState<Language>(
    i18n.language === 'no' ? Language.NO : Language.EN
  );

  const onExportButtonClicked: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (fweetFiles.length === 0) return;

    toast({ type: 'success', textKey: 'fweet.export.started' });
    fweetFiles.forEach((file) => {
      exportTofweetFiles(file);
    });
  };

  const exportTofweetFiles = (file: FweetFile) => {
    const { name } = file;
    const workbook = new Workbook();

    const fileName = name.slice(0, name.indexOf('.json')) + '.xlsx';
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/octet-stream',
      });
      fweetFilesaver.saveAs(blob, fileName);
    });
  };

  return (
    <form
      className={styles.container}
      onSubmit={onExportButtonClicked}
      aria-label={translate(`fweet.export.settings.aria`)}
    >
      <h2>{translate('fweet.export.title')}</h2>
      <label className={classNames(styles.select, styles.formOption)}>
        {translate('fweet.export.language.select')}
        <select
          onChange={(e) => {
            setSheetLanguage(e.target.value as Language);
          }}
          value={sheetLanguage}
        >
          {Object.keys(typeof Language).map((key) => (
            <option className={styles.select} value={key} key={key}>
              {key}
            </option>
          ))}
        </select>
      </label>
      <label id={'sheet-checkbox-list'} className={styles.listLabel}>
        {translate('fweet.export.settings.sheet-list')}
      </label>
      <label id={'panels-checkbox-list'} className={styles.listLabel}>
        {translate('fweet.export.filter.label')}
        <InfoBox
          messageContent={
            <>
              <p>{translate('fweet.export.filter.infobox.description.1')}</p>
              <p>{translate('fweet.export.filter.infobox.description.2')}</p>
              <p>{translate('fweet.export.filter.infobox.description.3')}</p>
              <p>{translate('fweet.export.filter.infobox.description.4')}</p>
            </>
          }
          header={translate('fweet.export.filter.infobox.title')}
        />
      </label>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={separatefweetFiles}
          onChange={() => {
            setSeparatefweetFiles(!separatefweetFiles);
          }}
        />
        {translate('fweet.export.separate.checkbox.label')}
      </label>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={disclaimer}
          onChange={() => {
            setDisclaimer(!disclaimer);
          }}
        />
        {translate('fweet.export.disclaimer.checkbox.label')}
      </label>
      <GenericButton
        className={styles.button}
        disabled={fweetFiles.length === 0 || !disclaimer}
        type={'submit'}
      >
        {translate('fweet.export.download.button')}
      </GenericButton>
    </form>
  );
};

export default FweetExportForm;
