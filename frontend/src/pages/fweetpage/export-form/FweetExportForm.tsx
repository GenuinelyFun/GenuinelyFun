import { Workbook } from 'exceljs';
import fweetFilesaver from 'file-saver';
import { FC, FormEventHandler, useState } from 'react';

import CheckboxWithInfobox from '../../../components/CheckboxWithInfobox.tsx';
import GenericButton from '../../../components/GenericButton';
import LineBreak from '../../../components/LineBreak.tsx';
import { addFweetSheetToWorkbook } from '../../../projects/feet/utils/utils.ts';
import { panelMapper } from '../../../projects/fweet/panel-utils.ts';
import { FweetFile, useDataContext } from '../../../utils/data-utils.ts';
import { useLanguageContext } from '../../../utils/i18n/language-utils.ts';
import { useToast } from '../../../utils/useToast';
import styles from './FweetExportForm.module.less';

export interface FilterPanelType {
  [fileName: string]: { [panel: string]: boolean };
}

const FweetExportForm: FC = () => {
  const toast = useToast();
  const { translate } = useLanguageContext();
  const { fweetFiles: files } = useDataContext();
  const [disclaimer, setDisclaimer] = useState<boolean>(false);

  const [firePanel, setFirePanel] = useState<boolean>(true);

  const onExportButtonClicked: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    toast({ type: 'success', textKey: 'fweet.export.started' });
    files.forEach((file) => {
      exportToFiles(file);
    });
  };

  const exportToFiles = (file: FweetFile) => {
    const { name } = file;
    const workbook = new Workbook();

    if (firePanel) {
      addFweetSheetToWorkbook(
        workbook,
        panelMapper(file.fepx),
        'Panel',
        'idkyet'
      );
    }

    const fileName = name.slice(0, name.indexOf('.fepx')) + '.xlsx';
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
      <label id={'sheet-checkbox-list'} className={styles.listLabel}>
        {translate('fweet.export.settings.sheet-list')}
      </label>
      <ul aria-labelledby={'sheet-checkbox-list'} className={styles.list}>
        <CheckboxWithInfobox
          textKey={'panel'}
          value={firePanel}
          setValue={() => setFirePanel(!firePanel)}
        />
      </ul>
      <LineBreak />
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
        disabled={files.length === 0 || !disclaimer}
        type={'submit'}
      >
        {translate('fweet.export.download.button')}
      </GenericButton>
      <p className={styles.footer}>{translate('fweet.export.language')}</p>
    </form>
  );
};

export default FweetExportForm;
