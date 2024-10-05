import { FC, useState } from 'react';
import { utils, write } from 'xlsx';
import FileSaver from 'file-saver';

import { useLanguageContext } from '../../utils/LanguageProvider';

import { Root } from '../../interfaces/jsonDataInterface';
import styles from './ExportForm.module.less';
import GenericButton from '../../components/GenericButton';

const ExportForm: FC<{ data?: Root }> = ({ data }) => {
  const { translate } = useLanguageContext();
  const [fileName, setFileName] = useState<string>(
    translate('export.filename.placeholder'),
  );

  const exportToExcel: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const worksheet = utils.json_to_sheet([data]);

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <form className={styles.container} onSubmit={exportToExcel}>
      <label className={styles.label}>
        {translate('export.filename.label')}
        <input
          className={styles.input}
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </label>
      <GenericButton
        disabled={data === undefined}
        buttonText={translate('export.download.button')}
        onClick={() => console.log('TODO NGHI check submitbutton')}
      />
    </form>
  );
};

export default ExportForm;
