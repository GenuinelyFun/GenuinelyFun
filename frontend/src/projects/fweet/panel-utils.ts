import { Database } from 'sql.js';

import { SheetValueType } from '../feet/utils/utils.ts';
import { PanelType } from './verify-utils.ts';

export const panelMapper = (
  db: Database
): { [p: string]: SheetValueType }[] => {
  const results = db.exec('SELECT * FROM Panel');
  return results[0].values.map((row) => {
    return mapPanel(results[0].columns, row as SheetValueType[]);
  });
};

const mapPanel = (columns: string[], row: SheetValueType[]) => {
  const result: { [key: string]: SheetValueType } = {};
  columns.forEach((column, index) => {
    if (column === 'Type' && row[index] !== null && row[index] !== undefined) {
      result[column] =
        PanelType[row[index].toString() as keyof typeof PanelType];
    } else {
      result[column] = row[index];
    }
  });
  return result;
};
