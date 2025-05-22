import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FC, FormEventHandler, useEffect, useState } from 'react';

import CheckboxWithInfobox from '../../components/CheckboxWithInfobox.tsx';
import GenericButton from '../../components/GenericButton.tsx';
import LineBreak from '../../components/LineBreak.tsx';
import { addressReportMapper } from '../../projects/fweet/address-report-utils.ts';
import { assignedOutputGroupsMapper } from '../../projects/fweet/assigned-output-groups.ts';
import { boardMapper } from '../../projects/fweet/board-utils.ts';
import { getSiteName } from '../../projects/fweet/database-utils.ts';
import { eePromMapper } from '../../projects/fweet/eeProm-utils.ts';
import { ioReportMapper } from '../../projects/fweet/io-report-utils.ts';
import { logbookMapper } from '../../projects/fweet/logbook-utils.ts';
import { loopMapper } from '../../projects/fweet/loop-utils.ts';
import { groupMapper } from '../../projects/fweet/output-groups-utils.ts';
import { panelMapper } from '../../projects/fweet/panel-utils.ts';
import { propOpMapper } from '../../projects/fweet/propOp-utils.ts';
import {
  verifyAddEeProm,
  verifyAddrUnit,
  verifyAlZone,
  verifyCause,
  verifyCircuit,
  verifyDetToAlZone,
  verifyEffect,
  verifyFiles,
  verifyLogbook,
  verifyPanels,
  verifyPropOp,
  verifyZone,
} from '../../projects/fweet/verify-utils.ts';
import { FweetFile, useDataContext } from '../../utils/data-utils.ts';
import { addFweetSheetToWorkbook } from '../../utils/excel-utils.ts';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useToast } from '../../utils/useToast.ts';
import styles from './FweetExportForm.module.less';

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
  const [outputGroups, setOutputGroups] = useState<boolean>(true);
  const [ioReport, setIoReport] = useState<boolean>(true);
  const [assigned, setAssigned] = useState<boolean>(true);
  const [eeProm, setEeProm] = useState<boolean>(true);
  const [propOp, setPropOp] = useState<boolean>(true);

  const isPanelTableAvailable = verifyFiles(files, verifyPanels);
  const isAddEePromTableAvailable = verifyFiles(files, verifyAddEeProm);
  const isPropOpTableAvailable = verifyFiles(files, verifyPropOp);
  const isAddrUnitTableAvailable = verifyFiles(files, verifyAddrUnit);
  const isLogbookTableAvailable = verifyFiles(files, verifyLogbook);
  const isCircuitTableAvailable = verifyFiles(files, verifyCircuit);
  const isAlZoneTableAvailable = verifyFiles(files, verifyAlZone);
  const isCauseTableAvailable = verifyFiles(files, verifyCause);
  const isDetToAlZoneTableAvailable = verifyFiles(files, verifyDetToAlZone);
  const isEffectTableAvailable = verifyFiles(files, verifyEffect);
  const isZoneTableAvailable = verifyFiles(files, verifyZone);

  const isFirePanelDisabled = !isPanelTableAvailable;
  const isFireLoopDisabled = !isAddrUnitTableAvailable;
  const isIoBoardDisabled = !isCircuitTableAvailable;
  const isAddressReportDisabled = !isAddrUnitTableAvailable;
  const isIoReportDisabled =
    !isCircuitTableAvailable || !isAddrUnitTableAvailable;
  const isLogbookDisabled = !isLogbookTableAvailable;
  const isAssignedDisabled =
    !isAlZoneTableAvailable ||
    !isCauseTableAvailable ||
    !isDetToAlZoneTableAvailable ||
    !isEffectTableAvailable ||
    !isZoneTableAvailable ||
    !isCircuitTableAvailable;
  const isOutputGroupsDisabled = !isAlZoneTableAvailable;
  const isEePromDisabled = !isAddEePromTableAvailable;
  const isPropOpDisabled = !isPropOpTableAvailable;

  const isAllSelected =
    (isFirePanelDisabled ? true : firePanel) &&
    (isFireLoopDisabled ? true : fireLoop) &&
    (isLogbookDisabled ? true : logbook) &&
    (isAddressReportDisabled ? true : addressReport) &&
    (isIoBoardDisabled ? true : ioBoard) &&
    (isIoReportDisabled ? true : ioReport) &&
    (isOutputGroupsDisabled ? true : outputGroups) &&
    (isAssignedDisabled ? true : assigned) &&
    (isEePromDisabled ? true : eeProm) &&
    (isPropOpDisabled ? true : propOp);

  const toggleSelectAll = () => {
    if (!isFirePanelDisabled) {
      setFirePanel(!isAllSelected);
    }
    if (!isFireLoopDisabled) {
      setFireLoop(!isAllSelected);
    }
    if (!isLogbookDisabled) {
      setLogbook(!isAllSelected);
    }
    if (!isAddressReportDisabled) {
      setAddressReport(!isAllSelected);
    }
    if (!isIoBoardDisabled) {
      setIoBoard(!isAllSelected);
    }
    if (!isOutputGroupsDisabled) {
      setOutputGroups(!isAllSelected);
    }
    if (!isIoReportDisabled) {
      setIoReport(!isAllSelected);
    }
    if (!isAssignedDisabled) {
      setAssigned(!isAllSelected);
    }
    if (!isEePromDisabled) {
      setEeProm(!isAllSelected);
    }
    if (!isPropOpDisabled) {
      setPropOp(!isAllSelected);
    }
  };

  useEffect(() => {
    if (!isPanelTableAvailable) {
      setFirePanel(false);
    }
    if (!isAddrUnitTableAvailable) {
      setFireLoop(false);
      setAddressReport(false);
      setIoReport(false);
    }
    if (!isCircuitTableAvailable) {
      setIoBoard(false);
      setIoReport(false);
    }
    if (!isLogbookTableAvailable) {
      setLogbook(false);
    }
    if (!isAlZoneTableAvailable) {
      setAssigned(false);
      setOutputGroups(false);
    }
    if (!isCauseTableAvailable) {
      setAssigned(false);
    }
    if (!isDetToAlZoneTableAvailable) {
      setAssigned(false);
    }
    if (!isEffectTableAvailable) {
      setAssigned(false);
    }
    if (!isZoneTableAvailable) {
      setAssigned(false);
    }
    if (!isAddEePromTableAvailable) {
      setEeProm(false);
    }
    if (!isPropOpTableAvailable) {
      setPropOp(false);
    }
  }, [
    isPanelTableAvailable,
    isAddrUnitTableAvailable,
    isCircuitTableAvailable,
    isLogbookTableAvailable,
    isAlZoneTableAvailable,
    isCauseTableAvailable,
    isDetToAlZoneTableAvailable,
    isEffectTableAvailable,
    isZoneTableAvailable,
    isAddEePromTableAvailable,
    isPropOpTableAvailable,
    isAllSelected,
  ]);

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

    if (firePanel) {
      addFweetSheetToWorkbook(workbook, panelMapper(fepx), 'Panel', siteName);
    }
    if (fireLoop) {
      addFweetSheetToWorkbook(workbook, loopMapper(fepx), 'Loop', siteName);
    }
    if (ioBoard) {
      addFweetSheetToWorkbook(
        workbook,
        boardMapper(fepx, toast),
        'Board',
        siteName
      );
    }
    if (addressReport) {
      addFweetSheetToWorkbook(
        workbook,
        addressReportMapper(fepx, toast),
        'Address_report',
        siteName
      );
    }
    if (ioReport) {
      addFweetSheetToWorkbook(
        workbook,
        ioReportMapper(fepx, toast),
        'IO_report',
        siteName
      );
    }
    if (logbook) {
      logbookMapper(fepx);
      addFweetSheetToWorkbook(
        workbook,
        logbookMapper(fepx),
        'Logbook',
        siteName
      );
    }
    if (assigned) {
      addFweetSheetToWorkbook(
        workbook,
        assignedOutputGroupsMapper(fepx, toast),
        'Assigned_output_groups',
        siteName
      );
    }
    if (outputGroups) {
      addFweetSheetToWorkbook(
        workbook,
        groupMapper(fepx, toast),
        'Output_groups',
        siteName
      );
    }
    if (eeProm) {
      addFweetSheetToWorkbook(
        workbook,
        eePromMapper(fepx, toast),
        'Eeprom',
        siteName
      );
    }
    if (propOp) {
      addFweetSheetToWorkbook(
        workbook,
        propOpMapper(fepx, toast),
        'Panel_properties',
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
          disabled={isFirePanelDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.loop'}
          value={fireLoop}
          setValue={() => setFireLoop(!fireLoop)}
          disabled={isFireLoopDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.board'}
          value={ioBoard}
          setValue={() => setIoBoard(!ioBoard)}
          disabled={isIoBoardDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.address'}
          value={addressReport}
          setValue={() => setAddressReport(!addressReport)}
          disabled={isAddressReportDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.io'}
          value={ioReport}
          setValue={() => setIoReport(!ioReport)}
          disabled={isIoReportDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.logbook'}
          value={logbook}
          setValue={() => setLogbook(!logbook)}
          disabled={isLogbookDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.assigned'}
          value={assigned}
          setValue={() => setAssigned(!assigned)}
          disabled={isAssignedDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.groups'}
          value={outputGroups}
          setValue={() => setOutputGroups(!outputGroups)}
          disabled={isOutputGroupsDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.eeProm'}
          value={eeProm}
          setValue={() => setEeProm(!eeProm)}
          disabled={isEePromDisabled}
        />
        <CheckboxWithInfobox
          textKey={'fweet.export.propOp'}
          value={propOp}
          setValue={() => setPropOp(!propOp)}
          disabled={isPropOpDisabled}
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
