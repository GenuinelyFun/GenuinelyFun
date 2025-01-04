import { FC, FormEventHandler, useState } from 'react';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';

import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import { useToast } from '../../utils/useToast';
import { useDataContext } from '../../utils/DataProvider';
import InfoBox from '../../components/InfoBox';
import GenericButton from '../../components/GenericButton';
import { feetLanguages } from '../../mappers/utils';
import styles from './ExportForm.module.less';

const ExportForm: FC = () => {
  const toast = useToast();
  const { translate, i18n } = useLanguageContext();
  const { files } = useDataContext();

  const [disclaimer, setDisclaimer] = useState<boolean>(false);
  const [sheetLanguage, setSheetLanguage] = useState<
    keyof typeof feetLanguages
  >(i18n.language === 'no' ? 'nb' : 'en');

  const exportToExcel: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    toast({ type: 'success', textKey: 'export.started' });
    files.forEach(({ name, json }) => {
      const workbook = new Workbook();

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/octet-stream',
        });
        FileSaver.saveAs(blob, `${name.slice(0, name.indexOf('.json'))}.xlsx`);
      });
    });
  };

  const CheckboxWithInfobox: FC<{
    textKey: string;
    value: boolean;
    setValue: () => void;
    disabled?: boolean;
  }> = ({ textKey, value, setValue, disabled }) => (
    <li className={styles.checkboxContainer}>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={value}
          onChange={setValue}
          disabled={disabled}
        />
        {translate(`export.${textKey}.checkbox.label` as TranslateTextKey)}
      </label>
      <InfoBox
        message={translate(
          `export.${textKey}.infobox.description` as TranslateTextKey,
        )}
        header={translate(
          `export.${textKey}.infobox.title` as TranslateTextKey,
        )}
      />
    </li>
  );

  return (
    <form
      className={styles.container}
      onSubmit={exportToExcel}
      role={'form'}
      aria-label={translate(`export.settings.aria`)}
    >
      <h2>Export settings</h2>
      <label className={styles.select}>
        {translate(`export.title`)}
        <select
          onChange={(e) => setSheetLanguage(e.target.value)}
          value={sheetLanguage}
        >
          {Object.keys(feetLanguages).map((key) => (
            <option className={styles.select} value={key} key={key}>
              {feetLanguages[key]}
            </option>
          ))}
        </select>
      </label>
      <label id={'sheet-checkbox-list'} className={styles.listLabel}>
        {translate('export.settings.sheet-list')}
      </label>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={disclaimer}
          onChange={() => setDisclaimer(!disclaimer)}
        />
        {translate(`export.disclaimer.checkbox.label` as TranslateTextKey)}
      </label>
      <GenericButton
        className={styles.button}
        disabled={files.length === 0 || !disclaimer}
        role={'submit'}
      >
        {translate('export.download.button')}
      </GenericButton>
    </form>
  );
};

export default ExportForm;
