import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FC, FormEventHandler, useState } from 'react';

import CheckboxWithInfobox from '../../../components/CheckboxWithInfobox.tsx';
import GenericButton from '../../../components/GenericButton';
import LineBreak from '../../../components/LineBreak.tsx';
import { addFweetSheetToWorkbook } from '../../../projects/feet/utils/utils.ts';
import { addressReportMapper } from '../../../projects/fweet/address-report-utils.ts';
import { boardMapper } from '../../../projects/fweet/board-utils.ts';
import { getSiteName } from '../../../projects/fweet/database-utils.ts';
import { logbookMapper } from '../../../projects/fweet/logbook-utils.ts';
import { loopMapper } from '../../../projects/fweet/loop-utils.ts';
import { panelMapper } from '../../../projects/fweet/panel-utils.ts';
import {
  verifyAddrUnit,
  verifyCircuit,
  verifyLogbook,
  verifyPanels,
} from '../../../projects/fweet/verify-utils.ts';
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
  const [fireLoop, setFireLoop] = useState<boolean>(true);
  const [logbook, setLogbook] = useState<boolean>(true);
  const [addressReport, setAddressReport] = useState<boolean>(true);
  const [ioBoard, setIoBoard] = useState<boolean>(true);

  const onExportButtonClicked: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    toast({ type: 'success', textKey: 'fweet.export.started' });
    files.forEach((file) => {
      exportToFiles(file);
    });
  };

  const exportToFiles = (file: FweetFile) => {
    const { name, fepx } = file;
    const workbook = new Workbook();
    const siteName = getSiteName(fepx, toast);

    if (firePanel && verifyPanels(fepx, toast)) {
      addFweetSheetToWorkbook(workbook, panelMapper(fepx), 'Panel', siteName);
    }
    if (fireLoop && verifyAddrUnit(fepx, toast)) {
      addFweetSheetToWorkbook(workbook, loopMapper(fepx), 'Loop', siteName);
    }
    if (logbook && verifyLogbook(fepx, toast)) {
      logbookMapper(fepx);
      addFweetSheetToWorkbook(
        workbook,
        logbookMapper(fepx),
        'Logbook',
        siteName
      );
    }
    if (addressReport && verifyAddrUnit(fepx, toast)) {
      addFweetSheetToWorkbook(
        workbook,
        addressReportMapper(fepx, toast),
        'Address_report',
        siteName
      );
    }
    if (ioBoard && verifyCircuit(fepx, toast)) {
      addFweetSheetToWorkbook(
        workbook,
        boardMapper(fepx, toast),
        'Board',
        siteName
      );
    }

    const fileName = name.slice(0, name.indexOf('.fepx')) + '.xlsx';
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/octet-stream',
      });
      FileSaver.saveAs(blob, fileName);
    });
  };
  const isAllSelected = firePanel && fireLoop && logbook && addressReport;

  const toggleSelectAll = () => {
    setFirePanel(!isAllSelected);
    setFireLoop(!isAllSelected);
    setLogbook(!isAllSelected);
    setAddressReport(!isAllSelected);
    setIoBoard(!isAllSelected);
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
          textKey={'fweet.export.selectall'}
          value={isAllSelected}
          setValue={toggleSelectAll}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.panel'}
          value={firePanel}
          setValue={() => setFirePanel(!firePanel)}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.loop'}
          value={fireLoop}
          setValue={() => setFireLoop(!fireLoop)}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.logbook'}
          value={logbook}
          setValue={() => setLogbook(!logbook)}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.address'}
          value={addressReport}
          setValue={() => setAddressReport(!addressReport)}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.board'}
          value={ioBoard}
          setValue={() => setIoBoard(!ioBoard)}
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
