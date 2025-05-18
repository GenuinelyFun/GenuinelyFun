import { Database } from 'sql.js';

import { sheetValueTypes } from '../feet/utils/utils.ts';
import { LoopType } from './verify-utils.ts';

export const loopMapper = (
  db: Database
): { [p: string]: sheetValueTypes }[] => {
  const results = db.exec('SELECT * FROM AddrUnit');
  return results[0].values.map((row) => {
    return mapLoop(results[0].columns, row as sheetValueTypes[]);
  });
};

const mapLoop = (columns: string[], row: sheetValueTypes[]) => {
  const result: { [key: string]: sheetValueTypes } = {};
  columns.forEach((column, index) => {
    if (column === 'Type' && row[index] !== null && row[index] !== undefined) {
      result[column] = LoopType[row[index].toString() as keyof typeof LoopType];
    } else {
      result[column] = row[index] === null ? 'n/a' : row[index];
    }
  });
  return result;
};
