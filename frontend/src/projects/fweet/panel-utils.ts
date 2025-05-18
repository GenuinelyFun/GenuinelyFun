import { Database } from 'sql.js';

import { sheetValueTypes } from '../feet/utils/utils.ts';

export const panelMapper = (
  db: Database
): { [key: string]: sheetValueTypes }[] => {
  const results = db.exec('SELECT * FROM panel');
  return results[0].values.map((row) => {
    return mapPanel(results[0].columns, row as sheetValueTypes[]);
  });
};

const mapPanel = (columns: string[], row: sheetValueTypes[]) => {
  const result: { [key: string]: sheetValueTypes } = {};
  columns.forEach((column, index) => {
    result[column] = row[index] === null ? 'n/a' : row[index];
  });
  return result;
};
