import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';

export const getSiteName = (db: Database, toast: Toast): string => {
  const siteName = db.exec('SELECT Name FROM Site')[0].values[0][0];
  if (typeof siteName !== 'string' || siteName.length === 0) {
    toast({
      type: 'error',
      textKey: 'fweet.dataformat.error',
      textParams: { data: 'site name' },
    });
    return '';
  }
  return siteName;
};

export const getZoneAddressByZoneId = (db: Database, zoneId: number) => {
  const stmt = db.exec(
    'SELECT z.Number, p.Number FROM Zone z INNER JOIN Zone p ON z.ParentZone = p.Id WHERE z.Id = ?',
    [zoneId]
  );
  if (stmt.length === 0) {
    return '';
  }

  const result = stmt[0].values[0];
  return `${result[1]}.${result[0]}`;
};

export const getZoneAddressByAddrUnitId = (
  db: Database,
  addrUnitId: number
): string => {
  const stmt = db.exec('SELECT SoneId FROM Cause WHERE InId = ?', [addrUnitId]);
  if (stmt.length === 0) {
    return 'n/a';
  }
  const soneId = stmt[0].values[0][0];
  return getZoneAddressByZoneId(db, soneId as number);
};
