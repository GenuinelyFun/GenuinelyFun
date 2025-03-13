import classNames from 'classnames';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FC, FormEventHandler, useEffect, useState } from 'react';

import GenericButton from '../../../components/GenericButton';
import InfoBox from '../../../components/InfoBox';
import { Panel } from '../../../projects/feet/interfaces/feetJsonDataInterface.ts';
import { mapLoopAddressToExcel } from '../../../projects/feet/mappers/feet-address-report-utils.ts';
import { mapBoardToExcel } from '../../../projects/feet/mappers/feet-board-utils.ts';
import { mapControlGroupsToExcel } from '../../../projects/feet/mappers/feet-control-group-report-utils.ts';
import { mapToIOReportToExcel } from '../../../projects/feet/mappers/feet-io-report-utils.ts';
import { mapLoopToExcel } from '../../../projects/feet/mappers/feet-loop-utils.ts';
import { mapPanelToExcel } from '../../../projects/feet/mappers/feet-panel-utils.ts';
import {
  addSheetToWorkbook,
  feetLanguages,
  useSheetTranslate,
} from '../../../projects/feet/mappers/feet-utils.ts';
import { mapPanelsWithZones } from '../../../projects/feet/mappers/feet-zone-utils.ts';
import { File, useDataContext } from '../../../utils/data-utils.ts';
import { useLanguageContext } from '../../../utils/i18n/language-utils.ts';
import { useToast } from '../../../utils/useToast';
import FeetCheckboxWithInfobox from './FeetCheckboxWithInfobox.tsx';
import styles from './FeetExportForm.module.less';
import FeetPanelCheckbox from './FeetPanelCheckbox.tsx';

export interface FilterPanelType {
  [fileName: string]: { [panel: string]: boolean };
}

const FeetExportForm: FC = () => {
  const toast = useToast();
  const { translate, i18n } = useLanguageContext();
  const { files } = useDataContext();
  const { sheetTranslate, updateLanguage } = useSheetTranslate();
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
    updateLanguage(sheetLanguage);
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

    toast({ type: 'success', textKey: 'feet-export.started' });
    files.forEach((file) => {
      const panels = file.json.system.panels.filter((panel) => {
        if (filteredPanels[file.name] === undefined) {
          return true;
        }
        return filteredPanels[file.name][panel.name];
      });
      if (separateFiles) {
        panels.forEach((panel) => {
          exportToFiles(file, [panel]);
        });
      } else {
        exportToFiles(file, panels);
      }
    });
  };

  const exportToFiles = (file: File, panels: Panel[]) => {
    const { name, json } = file;
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
      aria-label={translate(`feet-export.settings.aria`)}
    >
      <h2>{translate('feet-export.title')}</h2>
      <label className={classNames(styles.select, styles.formOption)}>
        {translate('feet-export.language.select')}
        <select
          onChange={(e) => {
            setSheetLanguage(e.target.value);
            updateLanguage(e.target.value);
          }}
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
        {translate('feet-export.settings.sheet-list')}
      </label>
      <ul aria-labelledby={'sheet-checkbox-list'} className={styles.list}>
        <FeetCheckboxWithInfobox
          textKey={'selectall'}
          value={isAllSelected}
          setValue={toggleSelectAll}
        />
        <FeetCheckboxWithInfobox
          textKey={'zone'}
          value={zone}
          setValue={() => setZone(!zone)}
          disabled={!isZonesAvailable}
        />
        <FeetCheckboxWithInfobox
          textKey={'loop'}
          value={fireLoop}
          setValue={() => setFireLoop(!fireLoop)}
        />
        <FeetCheckboxWithInfobox
          textKey={'board'}
          value={ioBoard}
          setValue={() => setIoBoard(!ioBoard)}
        />
        <FeetCheckboxWithInfobox
          textKey={'address'}
          value={addressReport}
          setValue={() => setAddressReport(!addressReport)}
        />
        <FeetCheckboxWithInfobox
          textKey={'io'}
          value={ioReport}
          setValue={() => setIoReport(!ioReport)}
        />
        <FeetCheckboxWithInfobox
          textKey={'controlgroups'}
          value={controlGroupReport}
          setValue={() => setControlGroupReport(!controlGroupReport)}
        />
        <FeetCheckboxWithInfobox
          textKey={'panel'}
          value={firePanel}
          setValue={() => setFirePanel(!firePanel)}
        />
      </ul>
      <label id={'panels-checkbox-list'} className={styles.listLabel}>
        {translate('feet-export.filter.label')}
        <InfoBox
          messageContent={
            <>
              <p>{translate('feet-export.filter.infobox.description.1')}</p>
              <p>{translate('feet-export.filter.infobox.description.2')}</p>
              <p>{translate('feet-export.filter.infobox.description.3')}</p>
              <p>{translate('feet-export.filter.infobox.description.4')}</p>
            </>
          }
          header={translate('feet-export.filter.infobox.title')}
        />
      </label>
      {files.length === 0 ? (
        <p className={styles.emptyPanels}>
          {translate('feet-export.filter.empty')}
        </p>
      ) : (
        <FeetPanelCheckbox
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
        {translate('feet-export.separate.checkbox.label')}
      </label>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={disclaimer}
          onChange={() => {
            setDisclaimer(!disclaimer);
          }}
        />
        {translate('feet-export.disclaimer.checkbox.label')}
      </label>
      <GenericButton
        className={styles.button}
        disabled={files.length === 0 || isNoneSelected || !disclaimer}
        type={'submit'}
      >
        {translate('feet-export.download.button')}
      </GenericButton>
    </form>
  );
};

export default FeetExportForm;
