import classNames from 'classnames';
import { Workbook } from 'exceljs';
import FileSaver from 'file-saver';
import { FC, FormEventHandler, useEffect, useState } from 'react';

import CheckboxWithInfobox from '../../../components/CheckboxWithInfobox.tsx';
import GenericButton from '../../../components/GenericButton.tsx';
import InfoBox from '../../../components/InfoBox.tsx';
import LineBreak from '../../../components/LineBreak.tsx';
import { Panel } from '../../../projects/feet/feetJsonDataInterface.ts';
import { mapLoopAddressToExcel } from '../../../projects/feet/utils/address-report-utils.ts';
import { mapBoardToExcel } from '../../../projects/feet/utils/board-utils.ts';
import { mapControlGroupsToExcel } from '../../../projects/feet/utils/control-group-report-utils.ts';
import { mapToIOReportToExcel } from '../../../projects/feet/utils/io-report-utils.ts';
import { mapLoopToExcel } from '../../../projects/feet/utils/loop-utils.ts';
import { mapPanelToExcel } from '../../../projects/feet/utils/panel-utils.ts';
import { mapSummaryToExcel } from '../../../projects/feet/utils/summary-utils.ts';
import {
  feetLanguages,
  useSheetTranslate,
} from '../../../projects/feet/utils/utils.ts';
import { mapPanelsWithZones } from '../../../projects/feet/utils/zone-utils.ts';
import { FeetFile, useDataContext } from '../../../utils/data-utils.ts';
import { addFeetSheetToWorkbook } from '../../../utils/excel-utils.ts';
import { useLanguageContext } from '../../../utils/i18n/language-utils.ts';
import styles from './FeetExportForm.module.less';
import PanelCheckbox from './PanelCheckbox.tsx';

export interface FilterPanelType {
  [fileName: string]: { [panel: string]: boolean };
}

const FeetExportForm: FC = () => {
  const { translate, i18n } = useLanguageContext();
  const { feetFiles } = useDataContext();
  const { sheetTranslate, updateLanguage } = useSheetTranslate();
  const [summary, setSummary] = useState<boolean>(true);
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
    feetFiles.length === 1
      ? feetFiles[0].feet.system.zones !== undefined
      : true;

  useEffect(() => {
    updateLanguage(sheetLanguage);
    if (!isZonesAvailable) {
      setZone(false);
    }
    if (feetFiles.length !== 0) {
      const paneles: FilterPanelType = {};
      feetFiles.forEach((file) => {
        paneles[file.short] = file.feet.system.panels.reduce(
          (acc, panel: Panel) => ({
            ...acc,
            [`${panel.number}. ${panel.name}`]: true,
          }),
          {}
        );
      });
      setFilteredPanels(paneles);
    }
  }, [feetFiles, isZonesAvailable, sheetLanguage]);

  const onExportButtonClicked: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (feetFiles.length === 0) return;

    feetFiles.forEach((file) => {
      const panels = file.feet.system.panels.filter((panel) => {
        if (filteredPanels[file.name] === undefined) {
          return true;
        }
        return filteredPanels[file.name][`${panel.number}. ${panel.name}`];
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

  const exportToFiles = (file: FeetFile, panels: Panel[]) => {
    const { name, feet } = file;
    const workbook = new Workbook();
    const zones = feet.system.zones;
    if (summary) {
      addFeetSheetToWorkbook(
        workbook,
        mapSummaryToExcel(panels, sheetTranslate),
        'Summary',
        feet,
        sheetTranslate
      );
    }
    if (firePanel) {
      addFeetSheetToWorkbook(
        workbook,
        panels.map((panel) =>
          mapPanelToExcel(feet.system, panel, sheetTranslate)
        ),
        'Panel',
        feet,
        sheetTranslate
      );
    }
    if (zones !== undefined && zone) {
      addFeetSheetToWorkbook(
        workbook,
        mapPanelsWithZones(panels, zones),
        'Zone',
        feet,
        sheetTranslate
      );
    }
    if (fireLoop) {
      addFeetSheetToWorkbook(
        workbook,
        panels.flatMap((panel) =>
          panel.loop_controllers.flatMap((loop_controller) =>
            mapLoopToExcel(loop_controller, panel.number, sheetTranslate)
          )
        ),
        'Loop',
        feet,
        sheetTranslate
      );
    }
    if (ioBoard) {
      addFeetSheetToWorkbook(
        workbook,
        mapBoardToExcel(panels),
        'Board',
        feet,
        sheetTranslate
      );
    }
    if (addressReport) {
      addFeetSheetToWorkbook(
        workbook,
        mapLoopAddressToExcel(panels, sheetTranslate),
        'Address_report',
        feet,
        sheetTranslate
      );
    }
    if (ioReport) {
      addFeetSheetToWorkbook(
        workbook,
        mapToIOReportToExcel(panels, sheetTranslate),
        'IO_report',
        feet,
        sheetTranslate
      );
    }
    if (controlGroupReport) {
      addFeetSheetToWorkbook(
        workbook,
        mapControlGroupsToExcel(panels, sheetTranslate),
        'Control group report',
        feet,
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
    summary &&
    firePanel &&
    (isZonesAvailable ? zone : true) &&
    fireLoop &&
    ioBoard &&
    addressReport &&
    ioReport &&
    controlGroupReport;

  const isNoneSelected =
    !summary &&
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
    setSummary(!isAllSelected);
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
        <CheckboxWithInfobox
          textKey={'feet-export.selectall'}
          value={isAllSelected}
          setValue={toggleSelectAll}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.summary'}
          value={summary}
          setValue={() => setSummary(!summary)}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.panel'}
          value={firePanel}
          setValue={() => setFirePanel(!firePanel)}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.zone'}
          value={zone}
          setValue={() => setZone(!zone)}
          disabled={!isZonesAvailable}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.loop'}
          value={fireLoop}
          setValue={() => setFireLoop(!fireLoop)}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.board'}
          value={ioBoard}
          setValue={() => setIoBoard(!ioBoard)}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.address'}
          value={addressReport}
          setValue={() => setAddressReport(!addressReport)}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.io'}
          value={ioReport}
          setValue={() => setIoReport(!ioReport)}
        />
        <CheckboxWithInfobox
          textKey={'feet-export.controlgroups'}
          value={controlGroupReport}
          setValue={() => setControlGroupReport(!controlGroupReport)}
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
      {feetFiles.length === 0 ? (
        <p className={styles.emptyPanels}>
          {translate('feet-export.filter.empty')}
        </p>
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
        {translate('feet-export.separate.checkbox.label')}
      </label>
      <LineBreak />
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
        disabled={feetFiles.length === 0 || isNoneSelected || !disclaimer}
        type={'submit'}
      >
        {translate('feet-export.download.button')}
      </GenericButton>
    </form>
  );
};

export default FeetExportForm;
