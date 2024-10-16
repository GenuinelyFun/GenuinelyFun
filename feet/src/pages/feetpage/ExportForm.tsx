import { FC, FormEventHandler, useEffect, useState } from 'react';
import { utils, write } from 'xlsx';
import FileSaver from 'file-saver';

import {
  TranslateTextKeyType,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import { useToast } from '../../utils/useToast';
import InfoBox from '../../components/InfoBox';
import GenericButton from '../../components/GenericButton';
import { mapPanelToExcel } from '../../mappers/panel-utils';
import { mapPanelsWithZones } from '../../mappers/zone-utils';
import { mapLoopToExcel } from '../../mappers/loop-utils';
import { mapBoardToExcel } from '../../mappers/board-utils';
import { mapLoopAddressToExcel } from '../../mappers/address-utils';
import { mapToIOReportToExcel } from '../../mappers/io-report-utils';
import { mapControlGroupsToExcel } from '../../mappers/controlgroup-utils';
import { useDataContext } from '../../utils/DataProvider';
import styles from './ExportForm.module.less';

const ExportForm: FC = () => {
  const toast = useToast();
  const { translate } = useLanguageContext();
  const { files } = useDataContext();

  const [panel, setPanel] = useState<boolean>(true);
  const [zone, setZone] = useState<boolean>(true);
  const [loop, setLoop] = useState<boolean>(true);
  const [board, setBoard] = useState<boolean>(true);
  const [address, setAddress] = useState<boolean>(true);
  const [report, setReport] = useState<boolean>(true);
  const [control, setControl] = useState<boolean>(true);
  const [disclaimer, setDisclaimer] = useState<boolean>(false);

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
      const workbook = utils.book_new();
      const panels = json.system.panels;
      const zones = json.system.zones;

      if (panel) {
        utils.book_append_sheet(
          workbook,
          utils.json_to_sheet(
            panels.map((panel) => mapPanelToExcel(json.system, panel)),
          ),
          'Panel',
        );
      }
      if (zones !== undefined && zone) {
        utils.book_append_sheet(
          workbook,
          utils.json_to_sheet(mapPanelsWithZones(panels, zones)),
          'Zone',
        );
      }
      if (loop) {
        utils.book_append_sheet(
          workbook,
          utils.json_to_sheet(
            panels.flatMap((panel) =>
              panel.loop_controllers.flatMap((loop_controller) =>
                mapLoopToExcel(loop_controller, panel.number),
              ),
            ),
          ),
          'Loop',
        );
      }
      if (board) {
        utils.book_append_sheet(
          workbook,
          utils.json_to_sheet(mapBoardToExcel(panels)),
          'Board',
        );
      }
      if (address) {
        utils.book_append_sheet(
          workbook,
          utils.json_to_sheet(mapLoopAddressToExcel(panels)),
          'Address',
        );
      }
      if (report) {
        utils.book_append_sheet(
          workbook,
          utils.json_to_sheet(mapToIOReportToExcel(panels)),
          'IO Report',
        );
      }
      if (control) {
        utils.book_append_sheet(
          workbook,
          utils.json_to_sheet(mapControlGroupsToExcel(panels)),
          'Control Groups',
        );
      }

      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream',
      });
      FileSaver.saveAs(blob, `${name.slice(0, name.indexOf('.json'))}.xlsx`);
    });
  };

  const isAllSelected =
    panel &&
    (isZonesAvailable ? zone : true) &&
    loop &&
    board &&
    address &&
    report &&
    control;

  const isNoneSelected =
    !panel && !zone && !loop && !board && !address && !report && !control;

  const toggleSelectAll = () => {
    setPanel(!isAllSelected);
    if (isZonesAvailable) {
      setZone(!isAllSelected);
    }
    setLoop(!isAllSelected);
    setBoard(!isAllSelected);
    setAddress(!isAllSelected);
    setReport(!isAllSelected);
    setControl(!isAllSelected);
  };

  const CheckboxWithInfobox: FC<{
    textKey: string;
    value: boolean;
    setValue: () => void;
    disabled?: boolean;
  }> = ({ textKey, value, setValue, disabled }) => (
    <li className={styles.checkboxContainer}>
      <label>
        <input
          type={'checkbox'}
          checked={value}
          onChange={setValue}
          disabled={disabled}
        />
        {translate(`export.${textKey}.checkbox.label` as TranslateTextKeyType)}
      </label>
      <InfoBox
        message={translate(
          `export.${textKey}.infobox.description` as TranslateTextKeyType,
        )}
        header={translate(
          `export.${textKey}.infobox.title` as TranslateTextKeyType,
        )}
      />
    </li>
  );

  return (
    <form className={styles.container} onSubmit={exportToExcel}>
      <ul className={styles.list}>
        <CheckboxWithInfobox
          textKey={'selectall'}
          value={isAllSelected}
          setValue={toggleSelectAll}
        />
        <CheckboxWithInfobox
          textKey={'panel'}
          value={panel}
          setValue={() => setPanel(!panel)}
        />
        <CheckboxWithInfobox
          textKey={'zone'}
          value={zone}
          setValue={() => setZone(!zone)}
          disabled={!isZonesAvailable}
        />
        <CheckboxWithInfobox
          textKey={'loop'}
          value={loop}
          setValue={() => setLoop(!loop)}
        />
        <CheckboxWithInfobox
          textKey={'board'}
          value={board}
          setValue={() => setBoard(!board)}
        />
        <CheckboxWithInfobox
          textKey={'address'}
          value={address}
          setValue={() => setAddress(!address)}
        />
        <CheckboxWithInfobox
          textKey={'io'}
          value={report}
          setValue={() => setReport(!report)}
        />
        <CheckboxWithInfobox
          textKey={'controlgroups'}
          value={control}
          setValue={() => setControl(!control)}
        />
        <li className={styles.checkboxContainer}>
          <label>
            <input
              type={'checkbox'}
              checked={disclaimer}
              onChange={() => setDisclaimer(!disclaimer)}
            />
            {translate(
              `export.disclaimer.checkbox.label` as TranslateTextKeyType,
            )}
          </label>
        </li>
      </ul>

      <GenericButton
        className={styles.button}
        disabled={files.length === 0 || isNoneSelected || !disclaimer}
        role={'submit'}
        buttonText={translate('export.download.button')}
      />
    </form>
  );
};

export default ExportForm;
