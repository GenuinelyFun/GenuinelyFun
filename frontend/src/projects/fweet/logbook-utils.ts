import { Database } from 'sql.js';

import { SheetValueType } from '../feet/utils/utils.ts';

export const logbookMapper = (
  db: Database
): { [p: string]: SheetValueType }[] => {
  const results = db.exec('SELECT * FROM LogBook');
  return results[0].values.map((row, index) => {
    return mapLogBook(results[0].columns, row as SheetValueType[], index);
  });
};

const mapLogBook = (
  columns: string[],
  row: SheetValueType[],
  rowIndex: number
) => {
  const result: { [key: string]: SheetValueType } = {};
  columns.forEach(async (column, index) => {
    if (
      column === 'Description' &&
      typeof row[index] === 'object' &&
      row[index] !== null
    ) {
      try {
        result[column] = new TextDecoder('utf-8').decode(
          row[index] as unknown as Uint8Array
        );
      } catch (error) {
        console.error(error + ' at row ' + rowIndex + ' column ' + column);
      }
    } else {
      result[column] = row[index];
    }
  });
  return result;
};
