import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { sheetValueTypes } from '../feet/utils/utils.ts';
import { AddrUnitType } from './verify-utils.ts';

export const addressReportMapper = (db: Database, toast: Toast) => {
  const addressesIds = db.exec(
    'SELECT Id, CircuitNo, UnitNo, Name, Type, Description FROM AddrUnit'
  );

  if (addressesIds.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  return addressesIds[0].values.map((row) => {
    const [id, circuitNo, unitNo, name, type, description] = row;
    const result: { [key: string]: sheetValueTypes } = {};
    if (!circuitNo || !unitNo) {
      result['Address'] = 'n/a';
    } else {
      result['Address'] =
        `${circuitNo.toString().padStart(3, '0')}.${unitNo.toString().padStart(3, '0')}`;
    }
    result['Zone'] = getZoneId(db, id as number);
    result['Name'] = name as string;
    result['Type'] = AddrUnitType[type as keyof typeof AddrUnitType];
    result['Description'] = description as string;
    return result;
  });
};

export const getZoneId = (db: Database, addrUnitId: number): string => {
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
