import { Database } from 'sql.js';

import { sheetValueTypes } from '../feet/utils/utils.ts';

export const logbookMapper = (
  db: Database
): { [p: string]: sheetValueTypes }[] => {
  const results = db.exec('SELECT * FROM LogBook');
  return results[0].values.map((row) => {
    return mapLogBook(results[0].columns, row as sheetValueTypes[]);
  });
};

const mapLogBook = (columns: string[], row: sheetValueTypes[]) => {
  const result: { [key: string]: sheetValueTypes } = {};
  columns.forEach(async (column, index) => {
    result[column] = row[index] === null ? 'n/a' : row[index];
  });
  return result;
};
