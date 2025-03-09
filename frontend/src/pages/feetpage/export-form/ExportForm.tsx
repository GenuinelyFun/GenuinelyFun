import classNames from 'classnames';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FC, FormEventHandler, useEffect, useState } from 'react';

import GenericButton from '../../../components/GenericButton';
import InfoBox from '../../../components/InfoBox';
import { Panel } from '../../../interfaces/jsonDataInterface';
import { mapLoopAddressToExcel } from '../../../mappers/address-report-utils';
import { mapBoardToExcel } from '../../../mappers/board-utils';
import { mapControlGroupsToExcel } from '../../../mappers/control-group-report-utils';
import { mapToIOReportToExcel } from '../../../mappers/io-report-utils';
import { mapLoopToExcel } from '../../../mappers/loop-utils';
import { mapPanelToExcel } from '../../../mappers/panel-utils';
import {
  addSheetToWorkbook,
  feetLanguages,
  useSheetTranslate,
} from '../../../mappers/utils';
import { mapPanelsWithZones } from '../../../mappers/zone-utils';
import { useDataContext } from '../../../utils/DataProvider';
import { useLanguageContext } from '../../../utils/i18n/language-utils.ts';
import { useToast } from '../../../utils/useToast';
import CheckboxWithInfobox from './CheckboxWithInfobox';
import styles from './ExportForm.module.less';
import PanelCheckbox from './PanelCheckbox';

export interface FilterPanelType {
  [fileName: string]: { [panel: string]: boolean };
}

const ExportForm: FC = () => {
  const toast = useToast();
  const { translate, i18n } = useLanguageContext();
  const { files } = useDataContext();
  const generateSheetTranslate = useSheetTranslate();
  const [zone, setZone] = useState<boolean>(true);
  const [fireLoop, setFireLoop] = useState<boolean>(true);
  const [ioBoard, setIoBoard] = useState<boolean>(true);
  const [addressReport, setAddressReport] = useState<boolean>(true);
  const [ioReport, setIoReport] = useState<boolean>(true);
  const [firePanel, setFirePanel] = useState<boolean>(true);
  const [filteredPanels, setFilteredPanels] = useState<FilterPanelType>({});
  const [controlGroupReport, setControlGroupReport] = useState<boolean>(true);
  const [disclaimer, setDisclaimer] = useState<boolean>(false);
  const [separateFiles, setSeparateFiles] = useState<boolean>(false);
  const [sheetLanguage, setSheetLanguage] = useState<
    keyof typeof feetLanguages
  >(i18n.language === 'no' ? 'nb' : 'en');
  const isZonesAvailable =
    files.length === 1 ? files[0].json.system.zones !== undefined : true;

  useEffect(() => {
    if (!isZonesAvailable) {
      setZone(false);
    }
    if (files.length !== 0) {
      const paneles: FilterPanelType = {};
      files.forEach((file) => {
        paneles[file.short] = file.json.system.panels.reduce(
          (acc, panel) => ({ ...acc, [panel.name]: true }),
          {}
        );
      });
      setFilteredPanels(paneles);
    }
  }, [files, isZonesAvailable]);

  const onExportButtonClicked: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    toast({ type: 'success', textKey: 'export.started' });
    files.forEach(({ name, json }) => {
      const panels = json.system.panels.filter((panel) => {
        if (filteredPanels[name] === undefined) {
          return true;
        }
        return filteredPanels[name][panel.name];
      });
      if (separateFiles) {
        panels.forEach((panel) => {
          exportToFiles([panel]);
        });
      } else {
        exportToFiles(panels);
      }
    });
  };

  const exportToFiles = (panels: Panel[]) => {
    const sheetTranslate = generateSheetTranslate(sheetLanguage);
    files.forEach(({ name, json }) => {
      const workbook = new Workbook();
      const zones = json.system.zones;

      if (firePanel) {
        addSheetToWorkbook(
          workbook,
          panels.map((panel) =>
            mapPanelToExcel(json.system, panel, sheetTranslate)
          ),
          'Panel',
          json,
          sheetTranslate
        );
      }
      if (zones !== undefined && zone) {
        addSheetToWorkbook(
          workbook,
          mapPanelsWithZones(panels, zones),
          'Zone',
          json,
          sheetTranslate
        );
      }
      if (fireLoop) {
        addSheetToWorkbook(
          workbook,
          panels.flatMap((panel) =>
            panel.loop_controllers.flatMap((loop_controller) =>
              mapLoopToExcel(loop_controller, panel.number, sheetTranslate)
            )
          ),
          'Loop',
          json,
          sheetTranslate
        );
      }
      if (ioBoard) {
        addSheetToWorkbook(
          workbook,
          mapBoardToExcel(panels),
          'Board',
          json,
          sheetTranslate
        );
      }
      if (addressReport) {
        addSheetToWorkbook(
          workbook,
          mapLoopAddressToExcel(panels, sheetTranslate),
          'Address_report',
          json,
          sheetTranslate
        );
      }
      if (ioReport) {
        addSheetToWorkbook(
          workbook,
          mapToIOReportToExcel(panels, sheetTranslate),
          'IO_report',
          json,
          sheetTranslate
        );
      }
      if (controlGroupReport) {
        addSheetToWorkbook(
          workbook,
          mapControlGroupsToExcel(panels, sheetTranslate),
          'Control group report',
          json,
          sheetTranslate
        );
      }
      let panelSuffix = '';
      if (separateFiles) {
        panelSuffix = `_${panels[0].name}`;
      }
      const fileName =
        name.slice(0, name.indexOf('.json')) + panelSuffix + '.xlsx';

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/octet-stream',
        });
        FileSaver.saveAs(blob, fileName);
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
  return (
    <form
      className={styles.container}
      onSubmit={onExportButtonClicked}
      aria-label={translate(`export.settings.aria`)}
    >
      <h2>{translate('export.title')}</h2>
      <label className={classNames(styles.select, styles.formOption)}>
        {translate('export.language.select')}
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
        <CheckboxWithInfobox
          textKey={'panel'}
          value={firePanel}
          setValue={() => setFirePanel(!firePanel)}
        />
      </ul>
      <label id={'panels-checkbox-list'} className={styles.listLabel}>
        {translate('export.filter.label')}
        <InfoBox
          messageContent={
            <>
              <p>{translate('export.filter.infobox.description.1')}</p>
              <p>{translate('export.filter.infobox.description.2')}</p>
              <p>{translate('export.filter.infobox.description.3')}</p>
              <p>{translate('export.filter.infobox.description.4')}</p>
            </>
          }
          header={translate('export.filter.infobox.title')}
        />
      </label>
      {files.length === 0 ? (
        <p className={styles.emptyPanels}>{translate('export.filter.empty')}</p>
      ) : (
        <PanelCheckbox
          setSubValues={setFilteredPanels}
          subValues={filteredPanels}
        />
      )}
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={separateFiles}
          onChange={() => {
            setSeparateFiles(!separateFiles);
          }}
        />
        {translate('export.separate.checkbox.label')}
      </label>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={disclaimer}
          onChange={() => {
            setDisclaimer(!disclaimer);
          }}
        />
        {translate('export.disclaimer.checkbox.label')}
      </label>
      <GenericButton
        className={styles.button}
        disabled={files.length === 0 || isNoneSelected || !disclaimer}
        type={'submit'}
      >
        {translate('export.download.button')}
      </GenericButton>
    </form>
  );
};

export default ExportForm;
