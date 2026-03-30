import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FC, FormEventHandler, useState } from 'react';

import GenericButton from '../../../components/GenericButton.tsx';
import { mapApetToSheets } from '../../../projects/apet/apet-utils.ts';
import { ApertFile, useDataContext } from '../../../utils/data-utils.ts';
import { addApetSheetsToWorkbook } from '../../../utils/excel-utils.ts';
import { useLanguageContext } from '../../../utils/i18n/language-utils.ts';
import { useToast } from '../../../utils/useToast.ts';
import styles from './ApetExportForm.module.less';

const ApetExportForm: FC = () => {
  const toast = useToast();
  const { translate } = useLanguageContext();
  const { apetFiles: files } = useDataContext();
  const [disclaimer, setDisclaimer] = useState<boolean>(false);

  const onExportButtonClicked: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    files.forEach((file) => {
      exportToFile(file);
    });
  };

  const exportToFile = (file: ApertFile) => {
    const { name, apet } = file;
    const workbook = new Workbook();
    const data = mapApetToSheets(apet);

    if (data.slyfe.length === 0) {
      toast({
        type: 'error',
        textKey: 'apet.export.no-data',
        textParams: { filename: name },
      });
      return;
    }

    addApetSheetsToWorkbook(workbook, data);

    const baseName = name.endsWith('.xml') ? name.slice(0, -4) : name;
    const fileName = 'AutroPrime ' + baseName + '.xlsx';
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, fileName);
    });
  };

  return (
    <form className={styles.container} onSubmit={onExportButtonClicked}>
      <h2>{translate('apet.export.title')}</h2>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={disclaimer}
          onChange={() => {
            setDisclaimer(!disclaimer);
          }}
        />
        {translate('apet.export.disclaimer.checkbox.label')}
      </label>
      <GenericButton
        className={styles.button}
        disabled={files.length === 0 || !disclaimer}
        type={'submit'}
      >
        {translate('apet.export.download.button')}
      </GenericButton>
    </form>
  );
};

export default ApetExportForm;
