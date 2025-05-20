import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { SheetValueType } from '../feet/utils/utils.ts';

export const propOpMapper = (db: Database, toast: Toast) => {
  const results = db.exec('SELECT * FROM PropOp');
  if (results.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }
  const columns = results[0].columns;
  const values = results[0].values;
  return values.map((row) => {
    const result: { [key: string]: SheetValueType } = {};
    columns.forEach((column, colIndex) => {
      result[column] =
        row[colIndex] === null ? 'n/a' : (row[colIndex] as SheetValueType);
    });
    return result;
  });
};
