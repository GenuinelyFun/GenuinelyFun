import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FC, FormEventHandler, useState } from 'react';

import GenericButton from '../../components/GenericButton.tsx';
import { mapInnoFile } from '../../projects/inno-utils.ts';
import { InnoFile, useDataContext } from '../../utils/data-utils.ts';
import { addInnoSheetToWorkbook } from '../../utils/excel-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useToast } from '../../utils/useToast.ts';
import styles from './InnoExportForm.module.less';

const InnoExportForm: FC = () => {
  const toast = useToast();
  const { translate } = useLanguageContext();
  const { innoFiles: files } = useDataContext();
  const [disclaimer, setDisclaimer] = useState<boolean>(false);

  const onExportButtonClicked: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    files.forEach((file) => {
      exportToFiles(file);
    });
  };

  const exportToFiles = (file: InnoFile) => {
    const { name, inno } = file;
    const workbook = new Workbook();

    const data = mapInnoFile(inno);
    if (data.length === 0) {
      toast({
        type: 'error',
        textKey: 'inno.export.no-data',
        textParams: { filename: name },
      });
      return;
    }

    addInnoSheetToWorkbook(workbook, mapInnoFile(inno));

    const fileName =
      'Norik armaturliste ' + name.slice(0, name.indexOf('.pdf')) + '.xlsx';
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/octet-stream',
      });
      FileSaver.saveAs(blob, fileName);
    });
  };

  return (
    <form className={styles.container} onSubmit={onExportButtonClicked}>
      <h2>{translate('inno.export.title')}</h2>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={disclaimer}
          onChange={() => {
            setDisclaimer(!disclaimer);
          }}
        />
        {translate('inno.export.disclaimer.checkbox.label')}
      </label>
      <GenericButton
        className={styles.button}
        disabled={files.length === 0 || !disclaimer}
        type={'submit'}
      >
        {translate('inno.export.download.button')}
      </GenericButton>
    </form>
  );
};

export default InnoExportForm;
