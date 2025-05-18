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
    if (column === 'Type' && row[index] !== null && row[index] !== undefined) {
      result[column] =
        PanelType[row[index].toString() as keyof typeof PanelType];
    } else {
      result[column] = row[index] === null ? 'n/a' : row[index];
    }
  });
  return result;
};

enum PanelType {
  DELOP = 'Delta DA OP',
  DEDAP = 'Delta Da Quad+',
  DEDAE = 'Delta DA Esser',
  DEDAM = 'Delta DA EL Specter',
  DEDAI = 'Delta DA Quad',
  DEREP = 'DELTA Repeater',
  PANEL = 'Anx 95e',
  ANX95 = 'Anx 95',
  ANX90 = 'Anx 90',
  DEDAS = 'Delta DA/E/Q Slave Panel',
  DELDA = 'Delta DA',
}
