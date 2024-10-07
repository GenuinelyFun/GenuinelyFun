import { CSSProperties, FC, FormEventHandler, useState } from 'react';
import { utils, write } from 'xlsx';
import FileSaver from 'file-saver';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { useLanguageContext } from '../../utils/LanguageProvider';
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
    if (zone) {
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

  const toggleSelectAll = () => {
    const isAllSelected =
      panel && zone && loop && board && address && report && control;

    if (isAllSelected) {
      setPanel(false);
      setZone(false);
      setLoop(false);
      setBoard(false);
      setAddress(false);
      setReport(false);
      setControl(false);
    } else {
      setPanel(true);
      setZone(true);
      setLoop(true);
      setBoard(true);
      setAddress(true);
      setReport(true);
      setControl(true);
    }
  };

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
        <label>
          <input
            type={'checkbox'}
            checked={
              panel && zone && loop && board && address && report && control
            }
            onChange={toggleSelectAll}
          />
          Select all
        </label>
        <div className={styles.checkboxContainer}>
          <InfoBox
            message={translate('export.panel.infobox.description')}
            header={translate('export.panel.infobox.title')}
            altText="Help Icon"
          />
          <label className={styles.label}>
            {translate('export.panel.checkbox.label')}
            <input
              type={'checkbox'}
              checked={panel}
              onChange={() => setPanel(!panel)}
            />
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <InfoBox
            message={translate('export.zone.infobox.description')}
            header={translate('export.zone.infobox.title')}
            altText="Help Icon"
          />
          <label className={styles.label}>
            {translate('export.zone.checkbox.label')}
            <input
              type={'checkbox'}
              checked={zone}
              onChange={() => setZone(!zone)}
            />
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <InfoBox
            message={translate('export.loop.infobox.description')}
            header={translate('export.loop.infobox.title')}
            altText="Help Icon"
          />
          <label className={styles.label}>
            {translate('export.loop.checkbox.label')}
            <input
              type={'checkbox'}
              checked={loop}
              onChange={() => setLoop(!loop)}
            />
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <InfoBox
            message={translate('export.board.infobox.description')}
            header={translate('export.board.infobox.title')}
            altText="Help Icon"
          />
          <label className={styles.label}>
            {translate('export.board.checkbox.label')}
            <input
              type={'checkbox'}
              checked={board}
              onChange={() => setBoard(!board)}
            />
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <InfoBox
            message={translate('export.address.infobox.description')}
            header={translate('export.address.infobox.title')}
            altText="Help Icon"
          />
          <label className={styles.label}>
            {translate('export.address.checkbox.label')}
            <input
              type={'checkbox'}
              checked={address}
              onChange={() => setAddress(!address)}
            />
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <InfoBox
            message={translate('export.report.infobox.description')}
            header={translate('export.report.infobox.title')}
            altText="Help Icon"
          />
          <label className={styles.label}>
            {translate('export.report.checkbox.label')}
            <input
              type={'checkbox'}
              checked={report}
              onChange={() => setReport(!report)}
            />
          </label>
        </div>
        <div className={styles.checkboxContainer}>
          <InfoBox
            message={translate('export.control.infobox.description')}
            header={translate('export.control.infobox.title')}
            altText="Help Icon"
          />
          <label className={styles.label}>
            {translate('export.control.checkbox.label')}
            <input
              type={'checkbox'}
              checked={control}
              onChange={() => setControl(!control)}
            />
          </label>
        </div>
        <GenericButton
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
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p>Vennligst vent mens vi.. no morsomt no</p>
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
