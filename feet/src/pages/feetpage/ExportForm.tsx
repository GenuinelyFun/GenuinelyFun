import {
  CSSProperties,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { utils, write } from 'xlsx';
import FileSaver from 'file-saver';
import PacmanLoader from 'react-spinners/PacmanLoader';

import {
  TranslateTextKeyType,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import GenericButton from '../../components/GenericButton';
import { Root } from '../../interfaces/jsonDataInterface';
import InfoBox from '../../components/InfoBox';
import { mapPanelToExcel } from '../../mappers/panel-utils';
import { mapPanelsWithZones } from '../../mappers/zone-utils';
import { mapLoopToExcel } from '../../mappers/loop-utils';
import { mapBoardToExcel } from '../../mappers/board-utils';
import { mapLoopAddressToExcel } from '../../mappers/address-utils';
import { mapToIOReportToExcel } from '../../mappers/io-report-utils';
import styles from './ExportForm.module.less';
import { mapControlGroupsToExcel } from '../../mappers/controlgroup-utils';

const ExportForm: FC<{ data?: Root; filename?: string }> = ({
  data,
  filename,
}) => {
  const { translate } = useLanguageContext();
  const [fileName, setFileName] = useState<string>(
    filename || translate('export.filename.placeholder'),
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(true);
  const [panel, setPanel] = useState<boolean>(true);
  const [zone, setZone] = useState<boolean>(true);
  const [loop, setLoop] = useState<boolean>(true);
  const [board, setBoard] = useState<boolean>(true);
  const [address, setAddress] = useState<boolean>(true);
  const [report, setReport] = useState<boolean>(true);
  const [control, setControl] = useState<boolean>(true);

  const isZonesAvailable =
    data !== undefined ? data.system.zones !== undefined : true;

  useEffect(() => {
    if (data !== undefined) {
      if (data.system.zones === undefined) {
        setZone(false);
      }
    }
  }, [data]);
  const exportToExcel: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (data === undefined) return;
    setLoading(true);
    const workbook = utils.book_new();

    const panels = data.system.panels;
    const zones = data.system.zones;

    if (panel) {
      utils.book_append_sheet(
        workbook,
        utils.json_to_sheet(panels.map((panel) => mapPanelToExcel(panel))),
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
        'IOReport',
      );
    }
    if (control) {
      utils.book_append_sheet(
        workbook,
        utils.json_to_sheet(mapControlGroupsToExcel(panels)),
        'Control Groups Detailed',
      );
    }

    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    setLoading(false);
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  };
  const isAllSelected =
    panel &&
    (isZonesAvailable ? zone : true) &&
    loop &&
    board &&
    address &&
    report &&
    control;

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
      <InfoBox
        message={translate(
          `export.${textKey}.infobox.description` as TranslateTextKeyType,
        )}
        header={translate(
          `export.${textKey}.infobox.title` as TranslateTextKeyType,
        )}
        altText="Help Icon"
      />
      <label className={styles.label}>
        {translate(`export.${textKey}.checkbox.label` as TranslateTextKeyType)}
        <input
          type={'checkbox'}
          checked={value}
          onChange={setValue}
          disabled={disabled}
        />
      </label>
    </li>
  );

  return (
    <>
      <form className={styles.container} onSubmit={exportToExcel}>
        <label>
          {translate('export.filename.label')}
          <input
            className={styles.input}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </label>
        <ul className={styles.list}>
          <li>
            <label className={styles.selectAll}>
              Select all
              <input
                type={'checkbox'}
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </label>
          </li>
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
        </ul>
        <GenericButton
          className={styles.button}
          disabled={data === undefined}
          buttonText={translate('export.download.button')}
        />
      </form>
      {error && <p>Something went wrong</p>}
      <PacmanLoader
        color={'#00573f'}
        loading={!loading}
        size={24}
        cssOverride={spinnerStyling}
        aria-label={translate('loadig.aria-label')}
      />
      <p>{translate('loading.description')}</p>
    </>
  );
};

export default ExportForm;

const spinnerStyling: CSSProperties = {
  display: 'block',
  margin: '24px auto',
  height: '24px',
  left: '-16px',
};
