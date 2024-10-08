import { FC, FormEventHandler, useState } from 'react';
import { utils, write } from 'xlsx';
import FileSaver from 'file-saver';

import { useLanguageContext } from '../../utils/LanguageProvider';

import { Root } from '../../interfaces/jsonDataInterface';
import { useModal } from '../../utils/useModal';
import styles from './ExportForm.module.less';
import GenericButton from '../../components/GenericButton';
import InfoBox from '../../components/InfoBox';
import { mapPanelToExcel } from '../../mappers/panel-utils';
import { mapPanelsWithZones } from '../../mappers/zone-utils';

const ExportForm: FC<{ data?: Root }> = ({ data }) => {
  const { translate } = useLanguageContext();
  const justAToolModal = useModal();
  const [fileName, setFileName] = useState<string>(
    translate('export.filename.placeholder'),
  );
  const [panel, setPanel] = useState<boolean>(false);
  const [zone, setZone] = useState<boolean>(false);

  const exportToExcel: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (data === undefined) return;

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

    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <form className={styles.container} onSubmit={exportToExcel}>
      <label>
        {translate('export.filename.label')}
        <input
          className={styles.input}
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </label>
      <div className={styles.checkboxContainer}>
        <InfoBox
          message={translate('infobox-checkbox-panel-text')}
          header={translate('infobox-checkbox-panel-title')}
          altText="Help Icon"
        />
        <label className={styles.label}>
          {translate('export.checkbox.panel')}
          <input
            type={'checkbox'}
            checked={panel}
            onChange={() => setPanel(!panel)}
          />
        </label>
      </div>
      <div className={styles.checkboxContainer}>
        <InfoBox
          message={translate('infobox-checkbox-zone-text')}
          header={translate('infobox-checkbox-zone-title')}
          altText="Help Icon"
        />
        <label className={styles.label}>
          {translate('export.checkbox.zone')}
          <input
            type={'checkbox'}
            checked={zone}
            onChange={() => setZone(!zone)}
          />
        </label>
      </div>
      <GenericButton
        disabled={data === undefined}
        buttonText={translate('export.download.button')}
        onClick={() => console.log('TODO NGHI check submitbutton')}
      />
    </form>
  );
};

export default ExportForm;
