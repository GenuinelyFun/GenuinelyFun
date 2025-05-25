import { Database } from 'sql.js';

import { SheetValueType } from '../feet/utils/utils.ts';
import { PanelType } from './verify-utils.ts';

export const panelMapper = (
  db: Database
): { [p: string]: SheetValueType }[] => {
  const results = db.exec('SELECT * FROM Panel');
  const columns = results[0].columns;
  const values = results[0].values;

  const indexOfName = columns.indexOf('Name') + 1;
  const indexOfDescription = columns.indexOf('Description');

  columns.splice(indexOfDescription, 1);
  const splicedValues = values.map(
    (row) => row.splice(indexOfDescription, 1)[0]
  );

  columns.splice(indexOfName, 0, 'Description', 'Loop');
  values.forEach((row, index) => {
    row.splice(
      indexOfName,
      0,
      splicedValues[index],
      getLoopAddressesForPanelId(row[0] as number, db)
    );
  });

  return values
    .map((row) => {
      return mapPanel(columns, row as SheetValueType[]);
    })
    .sort((a, b) => Number(a['Number']) - Number(b['Number']));
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

const getLoopAddressesForPanelId = (panelId: number, db: Database) => {
  const circuits = db.exec(
    'SELECT Number, Type FROM Circuit WHERE panelId = ?',
    [panelId]
  );

  if (circuits.length === 0) return '';
  return circuits[0].values
    .filter((circuit) => circuit[1] === 'ANLOOPTR')
    .map((row) => row[0] as string)
    .join(', ');
};
