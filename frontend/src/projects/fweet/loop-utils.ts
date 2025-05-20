import { Database } from 'sql.js';

import { SheetValueType } from '../feet/utils/utils.ts';
import { AddrUnitType } from './verify-utils.ts';

export const loopMapper = (db: Database): { [p: string]: SheetValueType }[] => {
  const results = db.exec('SELECT * FROM AddrUnit');
  const mappedResults = Object.groupBy(
    results[0].values.map((row) => {
      return mapLoop(results[0].columns, row as SheetValueType[]);
    }),
    (row) => row['CircuitNo'] as string
  );

  return Object.values(mappedResults)
    .map((group) =>
      group?.sort((a, b) => Number(a['UnitNo']) - Number(b['UnitNo']))
    )
    .flat() as { [p: string]: SheetValueType }[];
};

const mapLoop = (columns: string[], row: SheetValueType[]) => {
  const result: { [key: string]: SheetValueType } = {};
  columns.forEach((column, index) => {
    if (column === 'Type' && row[index] !== null && row[index] !== undefined) {
      result[column] =
        AddrUnitType[row[index].toString() as keyof typeof AddrUnitType];
    } else {
      result[column] = row[index];
    }
  });
  return result;
};
