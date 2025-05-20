import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { getZoneAddressByZoneId } from './database-utils.ts';
import {
  AddrUnitType,
  AssignTypeType,
  CircuitOutputType,
  CircuitType,
} from './verify-utils.ts';

export const assignedOutputGroupsMapper = (db: Database, toast: Toast) => {
  const groups = db.exec(
    'SELECT a.Id, a.Name, a.AssignType, d.DetZoneId FROM AlZone a ' +
      'LEFT JOIN DetToAlZone d ON a.Id = d.AlZoneId '
  );

  if (groups.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  const groupedId = Object.groupBy(groups[0].values, (row) => row[0] as string);

  const grouped = Object.values(groupedId).map((group) => {
    if (group === undefined) {
      toast({ type: 'error', textKey: 'fweet.export.error' });
      return [];
    }
    return group.map((row, index) => {
      const [alZoneId, name, assignedType, zoneId] = row;

      const addrUnitResults: { [key: string]: string }[] = [];
      const addrUnits = getAddrUnitsFromZoneId(db, zoneId as number);
      addrUnits.forEach((addrUnit) => {
        const [preAddr, postAddr, addrType] = addrUnit;
        addrUnitResults.push({
          'Output Group': '',
          'Assigned Type': '',
          Address: `${String(preAddr).padStart(3, '0')}.${String(postAddr).padStart(3, '0')}`,
          Zone: getZoneAddressByZoneId(db, zoneId as number),
          Type: AddrUnitType[addrType as keyof typeof AddrUnitType] || addrType,
          'Output Type': '',
        });
      });

      const circuitResults: { [key: string]: string }[] = [];
      const effects = getEffectOutIdsFromAlZoneId(db, alZoneId as number);
      effects?.forEach((effect) => {
        const circuits = getCircuitsFromEffectOutId(db, effect[0] as number);
        circuits?.forEach((circuit) => {
          const [panelId, tbNumber, type, outputType] = circuit;
          circuitResults.push({
            'Output Group': '',
            'Assigned Type': '',
            Address:
              'Sys. ' + String(panelId).padStart(2, '0') + ' ' + tbNumber,
            Zone: getZoneAddressByZoneId(db, zoneId as number),
            Type:
              CircuitType[String(type) as keyof typeof CircuitType] ||
              (type as string),
            'Output Type':
              CircuitOutputType[
                String(outputType) as keyof typeof CircuitOutputType
              ] || (outputType as string),
          });
        });
      });

      const combinedList = [...addrUnitResults, ...circuitResults];
      if (combinedList.length === 0) {
        return [
          {
            'Output Group': name as string,
            'Assigned Type':
              AssignTypeType[assignedType as keyof typeof AssignTypeType] ||
              assignedType,
            Address: '',
            Zone: '',
            Type: '',
            'Output Type': '',
          },
        ];
      }
      if (index === 0) {
        combinedList[0]['Output Group'] = name as string;
        combinedList[0]['Assigned Type'] =
          AssignTypeType[assignedType as keyof typeof AssignTypeType] ||
          assignedType;
      }
      return [...addrUnitResults, ...circuitResults];
    });
  });
  return grouped.flat().flat();
};
const getAddrUnitsFromZoneId = (db: Database, zoneId: number) => {
  const stmt = db.exec(
    'SELECT a.CircuitNo, a.UnitNo, a.Type FROM Cause c INNER JOIN AddrUnit a ON a.id = c.InId WHERE c.SoneId = ?',
    [zoneId]
  );
  if (stmt.length === 0) {
    return [];
  }

  return stmt[0].values;
};

const getEffectOutIdsFromAlZoneId = (db: Database, alZoneId: number) => {
  const stmt = db.exec('SELECT OutId FROM Effect WHERE SoneId = ?', [alZoneId]);
  if (stmt.length === 0) {
    return null;
  }

  return stmt[0].values;
};

const getCircuitsFromEffectOutId = (db: Database, effectOutId: number) => {
  const stmt = db.exec(
    'SELECT PanelId, TBNumber, Type, OutputType FROM Circuit WHERE Id = ?',
    [effectOutId]
  );
  if (stmt.length === 0) {
    return null;
  }

  return stmt[0].values;
};
