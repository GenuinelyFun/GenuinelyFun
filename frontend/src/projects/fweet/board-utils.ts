import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { SheetValueType } from '../feet/utils/utils.ts';
import { CircuitOutputType, CircuitType } from './verify-utils.ts';

export const boardMapper = (db: Database, toast: Toast) => {
  const circuits = db.exec('SELECT * FROM Circuit');

  if (circuits.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  const formattedValues = Object.groupBy(
    circuits[0].values.map((row) => {
      const result: { [key: string]: SheetValueType } = {};
      circuits[0].columns.forEach((column, index) => {
        if (
          column === 'Type' &&
          row[index] !== null &&
          row[index] !== undefined
        ) {
          result[column] =
            CircuitType[row[index].toString() as keyof typeof CircuitType] ||
            (row[index] as string);
        } else if (
          column === 'OutputType' &&
          row[index] !== null &&
          row[index] !== undefined
        ) {
          result[column] =
            CircuitOutputType[
              row[index].toString() as keyof typeof CircuitOutputType
            ] || (row[index] as string);
        } else if (
          column === 'PanelId' &&
          row[index] !== null &&
          row[index] !== undefined
        ) {
          result[column] = row[index] as SheetValueType;
          const panelIdIndex: number = circuits[0].columns.indexOf('PanelId');
          const panelNumber = db.exec('SELECT Number FROM Panel WHERE Id = ?', [
            row[panelIdIndex] as number,
          ])[0].values[0][0];

          result['Panel Number'] =
            `Sys. ${String(panelNumber).padStart(2, '0')}`;
        } else {
          result[column] = row[index] as SheetValueType;
        }
      });
      return result;
    }),
    (row) => row['PanelId'] as number
  );

  const mappedResults = Object.values(formattedValues).map((group) =>
    group?.sort((a, b) =>
      String(a['TBNumber']).localeCompare(String(b['TBNumber']))
    )
  );
  return mappedResults.flat() as { [p: string]: SheetValueType }[];
};
