import { FC, FormEventHandler, useEffect, useState } from 'react';
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
import { mapPanelToExcel } from '../../mappers/panel-utils';
import { mapPanelsWithZones } from '../../mappers/zone-utils';
import { mapLoopToExcel } from '../../mappers/loop-utils';
import { mapBoardToExcel } from '../../mappers/board-utils';
import { mapLoopAddressToExcel } from '../../mappers/address-report-utils';
import { mapToIOReportToExcel } from '../../mappers/io-report-utils';
import { mapControlGroupsToExcel } from '../../mappers/control-group-report-utils';
import { addSheetToWorkbook, feetLanguages } from '../../mappers/utils';
import styles from './ExportForm.module.less';

const ExportForm: FC = () => {
  const toast = useToast();
  const { translate, i18n } = useLanguageContext();
  const { files } = useDataContext();

  const [firePanel, setFirePanel] = useState<boolean>(true);
  const [zone, setZone] = useState<boolean>(true);
  const [fireLoop, setFireLoop] = useState<boolean>(true);
  const [ioBoard, setIoBoard] = useState<boolean>(true);
  const [addressReport, setAddressReport] = useState<boolean>(true);
  const [ioReport, setIoReport] = useState<boolean>(true);
  const [controlGroupReport, setControlGroupReport] = useState<boolean>(true);
  const [disclaimer, setDisclaimer] = useState<boolean>(false);
  const [sheetLanguage, setSheetLanguage] = useState<
    keyof typeof feetLanguages
  >(i18n.language === 'no' ? 'nb' : 'en');

  const isZonesAvailable =
    files.length === 1 ? files[0].json.system.zones !== undefined : true;

  useEffect(() => {
    if (!isZonesAvailable) {
      setZone(false);
    }
  }, [files]);

  const exportToExcel: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    toast({ type: 'success', textKey: 'export.started' });
    files.forEach(({ name, json }) => {
      const workbook = new Workbook();
      const panels = json.system.panels;
      const zones = json.system.zones;

      if (firePanel) {
        addSheetToWorkbook(
          workbook,
          panels.map((panel) =>
            mapPanelToExcel(json.system, panel, sheetLanguage),
          ),
          'Panel',
          json,
          sheetLanguage,
        );
      }
      if (zones !== undefined && zone) {
        addSheetToWorkbook(
          workbook,
          mapPanelsWithZones(panels, zones),
          'Zone',
          json,
          sheetLanguage,
        );
      }
      if (fireLoop) {
        addSheetToWorkbook(
          workbook,
          panels.flatMap((panel) =>
            panel.loop_controllers.flatMap((loop_controller) =>
              mapLoopToExcel(loop_controller, panel.number, sheetLanguage),
            ),
          ),
          'Loop',
          json,
          sheetLanguage,
        );
      }
      if (ioBoard) {
        addSheetToWorkbook(
          workbook,
          mapBoardToExcel(panels),
          'Board',
          json,
          sheetLanguage,
        );
      }
      if (addressReport) {
        addSheetToWorkbook(
          workbook,
          mapLoopAddressToExcel(panels, sheetLanguage),
          'Address_report',
          json,
          sheetLanguage,
        );
      }
      if (ioReport) {
        addSheetToWorkbook(
          workbook,
          mapToIOReportToExcel(panels, sheetLanguage),
          'IO_report',
          json,
          sheetLanguage,
        );
      }
      if (controlGroupReport) {
        addSheetToWorkbook(
          workbook,
          mapControlGroupsToExcel(panels, sheetLanguage),
          'Control group report',
          json,
          sheetLanguage,
        );
      }

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/octet-stream',
        });
        FileSaver.saveAs(blob, `${name.slice(0, name.indexOf('.json'))}.xlsx`);
      });
    });
  };

  const isAllSelected =
    firePanel &&
    (isZonesAvailable ? zone : true) &&
    fireLoop &&
    ioBoard &&
    addressReport &&
    ioReport &&
    controlGroupReport;

  const isNoneSelected =
    !firePanel &&
    !zone &&
    !fireLoop &&
    !ioBoard &&
    !addressReport &&
    !ioReport &&
    !controlGroupReport;

  const toggleSelectAll = () => {
    setFirePanel(!isAllSelected);
    if (isZonesAvailable) {
      setZone(!isAllSelected);
    }
    setFireLoop(!isAllSelected);
    setIoBoard(!isAllSelected);
    setAddressReport(!isAllSelected);
    setIoReport(!isAllSelected);
    setControlGroupReport(!isAllSelected);
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
      <ul aria-labelledby={'sheet-checkbox-list'} className={styles.list}>
        <CheckboxWithInfobox
          textKey={'selectall'}
          value={isAllSelected}
          setValue={toggleSelectAll}
        />
        <CheckboxWithInfobox
          textKey={'panel'}
          value={firePanel}
          setValue={() => setFirePanel(!firePanel)}
        />
        <CheckboxWithInfobox
          textKey={'zone'}
          value={zone}
          setValue={() => setZone(!zone)}
          disabled={!isZonesAvailable}
        />
        <CheckboxWithInfobox
          textKey={'loop'}
          value={fireLoop}
          setValue={() => setFireLoop(!fireLoop)}
        />
        <CheckboxWithInfobox
          textKey={'board'}
          value={ioBoard}
          setValue={() => setIoBoard(!ioBoard)}
        />
        <CheckboxWithInfobox
          textKey={'address'}
          value={addressReport}
          setValue={() => setAddressReport(!addressReport)}
        />
        <CheckboxWithInfobox
          textKey={'io'}
          value={ioReport}
          setValue={() => setIoReport(!ioReport)}
        />
        <CheckboxWithInfobox
          textKey={'controlgroups'}
          value={controlGroupReport}
          setValue={() => setControlGroupReport(!controlGroupReport)}
        />
      </ul>
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
        disabled={files.length === 0 || isNoneSelected || !disclaimer}
        role={'submit'}
      >
        {translate('export.download.button')}
      </GenericButton>
    </form>
  );
};

export default ExportForm;
