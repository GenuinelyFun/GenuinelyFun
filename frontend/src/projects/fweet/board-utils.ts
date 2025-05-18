import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { sheetValueTypes } from '../feet/utils/utils.ts';
import { CircuitType } from './verify-utils.ts';

export const boardMapper = (db: Database, toast: Toast) => {
  const circuits = db.exec('SELECT * FROM Circuit');

  if (circuits.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  return circuits[0].values.map((row) => {
    const result: { [key: string]: sheetValueTypes } = {};
    circuits[0].columns.forEach((column, index) => {
      if (
        (column === 'Type' || column === 'OutputType') &&
        row[index] !== null &&
        row[index] !== undefined
      ) {
        result[column] =
          CircuitType[row[index].toString() as keyof typeof CircuitType] ||
          (row[index] as string);
      } else {
        result[column] =
          row[index] === null ? 'n/a' : (row[index] as sheetValueTypes);
      }
    });
    return result;
  });
};
