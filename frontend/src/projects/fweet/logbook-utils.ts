import { Database } from 'sql.js';

import { SheetValueType } from '../feet/utils/utils.ts';

export const logbookMapper = (
  db: Database
): { [p: string]: SheetValueType }[] => {
  const results = db.exec('SELECT * FROM LogBook');
  return results[0].values.map((row) => {
    return mapLogBook(results[0].columns, row as SheetValueType[]);
  });
};

const mapLogBook = (columns: string[], row: SheetValueType[]) => {
  const result: { [key: string]: SheetValueType } = {};
  columns.forEach(async (column, index) => {
    result[column] = row[index] === null ? 'n/a' : row[index];
  });
  return result;
};
