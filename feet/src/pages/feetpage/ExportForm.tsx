import { FC, useState } from 'react';
import { utils, write } from 'xlsx';
import FileSaver from 'file-saver';

import { Root } from '../../interfaces/jsonDataInterface';

const ExportForm: FC<{ data?: Root }> = ({ data }) => {
  const [fileName, setFileName] = useState<string>('best-filename-ever');

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
    <form className={'export-container'} onSubmit={exportToExcel}>
      <label>
        Excel filename
        <input
          className="filename-input"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </label>
      <button className="upload-btn" disabled={data === undefined}>
        Download Excel sheet
      </button>
    </form>
  );
};

export default ExportForm;
