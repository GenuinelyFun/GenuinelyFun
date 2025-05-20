import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { SheetValueType } from '../feet/utils/utils.ts';
import { getZoneAddressByAddrUnitId } from './database-utils.ts';
import { AddrUnitType } from './verify-utils.ts';

export const addressReportMapper = (db: Database, toast: Toast) => {
  const addressesIds = db.exec(
    'SELECT Id, CircuitNo, UnitNo, Name, Type, Description FROM AddrUnit'
  );

  if (addressesIds.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  return addressesIds[0].values
    .map((row) => {
      const [id, circuitNo, unitNo, name, type, description] = row;
      const result: { [key: string]: SheetValueType } = {};
      if (!circuitNo || !unitNo) {
        result['Address'] = '';
      } else {
        result['Address'] =
          `${circuitNo.toString().padStart(3, '0')}.${unitNo.toString().padStart(3, '0')}`;
      }
      result['Zone'] = getZoneAddressByAddrUnitId(db, id as number);
      result['Name'] = name as string;
      result['Description'] = description as string;
      result['Type'] = AddrUnitType[type as keyof typeof AddrUnitType];
      return result;
    })
    .sort((a, b) => String(a['Address']).localeCompare(String(b['Address'])));
};
