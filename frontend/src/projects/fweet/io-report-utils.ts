import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';
import { getZoneId } from './address-report-utils.ts';
import {
  AddrUnitType,
  CircuitOutputType,
  CircuitType,
} from './verify-utils.ts';

const VALID_ADDR_UNIT_TYPES = [
  'IQSSMO',
  'IQFO2T',
  'IQSO2T',
  'IQVSFO2T',
  'IQSAL',
  'IQVSFAL',
  'IQFAL',
  'IQSFAL',
  'ESIQTAL',
  'ESIQTALO',
  'ESIQTALH',
  'ESIQTALD',
  'ESIQTALS',
  'ESIQTALI',
  'ESIQTALP',
  'ESIO12',
  'ESIOLED',
  'ESZM1G',
  'ESIO4G2R',
  'ESIOMM',
  'ESTAL',
  'ESTALBDI',
  'ESTALSPR',
  'ESIOSPR',
  'ESASARD2',
  'ESIOASP',
  'ESIORU',
  'ESTETEC',
  'ESTEGAS',
  'ESTEBUR',
  'ESWLGW',
  'ESIOWLT',
  'ESIOELMM',
  'XPEMLILM',
  'XPASPIR',
  'XPZM',
  'XPSWMO',
  'XPSPR',
  'DIIO',
  'S9ASPIR',
  'S9ZM',
  'XPGEN',
  'XPIO',
];

export const ioReportMapper = (db: Database, toast: Toast) => {
  const groups = db.exec(
    'SELECT Type, PanelId, TBNumber, Name, Description, Type, OutputType FROM Circuit'
  );

  if (groups.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  const circuitRows = groups[0].values
    .filter((row) => row[0] !== 'ANLOOPTR' && row[0] !== null)
    .map((row) => {
      const result: { [key: string]: string } = {};
      const [_, panelId, tbNumber, name, description, type, outputType] = row;

      result['Address'] =
        'Sys. ' + String(panelId).padStart(2, '0') + ' ' + tbNumber;
      result['Zone'] = '';
      result['Name'] = name as string;
      result['Description'] = description as string;

      result['Type'] =
        CircuitType[String(type) as keyof typeof CircuitType] ||
        (type as string);
      result['Output Type'] =
        CircuitOutputType[
          String(outputType) as keyof typeof CircuitOutputType
        ] || (outputType as string);
      return result;
    });

  const addresses = db.exec(
    'SELECT a.Id, a.Type, a.CircuitNo, a.UnitNo, a.Name, a.Description, a.Type, io.TBNumber, io.Name, io.Description FROM AddrUnit a INNER JOIN IoCircuit io ON io.UnitId = a.Id'
  );

  if (addresses.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  const addrUnitRows = addresses[0].values
    .filter((row) => VALID_ADDR_UNIT_TYPES.includes(row[1] as string))
    .map((row) => {
      const result: { [key: string]: string } = {};
      const [
        id,
        _,
        circuitNo,
        unitNo,
        name,
        description,
        type,
        tbNumber,
        ioName,
        ioDescription,
      ] = row;
      if (circuitNo === null || unitNo === null) {
        result['Address'] = 'n/a';
      } else {
        result['Address'] = `${circuitNo.toString().padStart(3, '0')}.${unitNo
          .toString()
          .padStart(3, '0')}${tbNumber ? `.${tbNumber}` : ''}`;
      }
      result['Zone'] = getZoneId(db, id as number);
      result['Name'] = tbNumber ? (ioName as string) : (name as string);
      result['Description'] = tbNumber
        ? (ioDescription as string)
        : (description as string);
      result['Type'] = AddrUnitType[type as keyof typeof AddrUnitType];

      return result;
    });

  return [...circuitRows, ...addrUnitRows];
};
