import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { sheetValueTypes } from '../feet/utils/utils.ts';
import { AddrUnitType } from './verify-utils.ts';

export const addressReportMapper = (db: Database, toast: Toast) => {
  const addressesIds = db.exec(
    'SELECT Id, CircuitId, UnitNo, Name, Type FROM AddrUnit'
  );

  if (addressesIds.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  return addressesIds[0].values.map((row) => {
    const result: { [key: string]: sheetValueTypes } = {};
    if (!row[1] || !row[2]) {
      result['Address'] = 'n/a';
    } else {
      result['Address'] =
        `${row[1].toString().padStart(3, '0')}.${row[2].toString().padStart(3, '0')}`;
    }
    result['Zone'] = getZoneId(db, row[0] as number);
    result['Name'] = row[3] as string;
    result['Type'] = AddrUnitType[row[4] as keyof typeof AddrUnitType];
    return result;
  });
};

const getZoneId = (db: Database, addrUnitId: number): string => {
  const stmt = db.exec('SELECT SoneId FROM Cause WHERE InId = ?', [addrUnitId]);
  if (stmt.length === 0) {
    return 'n/a';
  }
  const soneId = stmt[0].values[0][0];
  const zoneInformation = db.exec(
    'SELECT ParentZone, Number FROM Zone WHERE Id = ?',
    [soneId]
  )[0].values[0];
  return `${zoneInformation[0]}.${zoneInformation[1]}`;
};
