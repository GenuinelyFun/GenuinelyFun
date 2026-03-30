import { SheetValueType } from '../feet/utils/utils.ts';

export type { SheetValueType };

export const HARDWARE_DESCRIPTION: Record<string, string> = {
  'BHH-200': 'Røykdetektor, optisk',
  'BHH-220': 'MultiSensor, standard',
  'BHH-300': 'Røykdetektor, SelfVerify',
  'BHH-320': 'MultiSensor, SelfVerify',
  'BH-200': 'Røykdetektor, optisk',
  'BH-220': 'MultiSensor, standard',
  'BH-300': 'Røykdetektor, SelfVerify',
  'BH-320': 'MultiSensor, SelfVerify',
  'BF-300': 'Manuell melder, SelfVerify',
  'BBR-130': 'Sokkelsirene, adresserbar',
  'BD-200': 'Varmedetektor, standard',
  'BD-300': 'Varmedetektor, SelfVerify',
  'TBN-310': 'Utgangsmodul, SelfVerify',
  'BN-310': 'Utgangsmodul, SelfVerify',
  'MBN-310': 'Utgangsmodul, SelfVerify',
  'BN-304': 'Enkel overvåket inngangs-/utgangsenhet, SelfVerify',
  'BBQ-130': 'Sokkelsirene m/alarmindikator BBQ-130',
  'V-XX0': 'Multikriterieprotektor V-430-S-VADW, SelfVerify',
  'BN-201': 'Inngangsmodul, overvåkingsenhet',
  'BBR-110': 'Adresserbar sokkelsirene, overvåkingsenhet',
  'BH-520': 'Interaktivt MultiSensor miljøbeskyttet, SelfVerify',
  'BH-31A': 'Røykdetektor optisk, BS100 serien',
  'BE-30': 'Varmedetektor, BS100 serien',
  'BF-33L': 'Manuell melder, BS100 serien',
  'BN-35': 'IO-modul, BS100 serien',
  'PBU-110': 'Brannmannssløyfepanel, BU-110',
  'BU-110': 'Brannmannssløyfepanel, BU-110',
};

export interface ApetSheetData {
  siteName: string;
  sammendrag: { [key: string]: SheetValueType }[];
  sentral: { [key: string]: SheetValueType }[];
  sone: { [key: string]: SheetValueType }[];
  slyfe: { [key: string]: SheetValueType }[];
  adresseRapport: { [key: string]: SheetValueType }[];
  ioRapport: { [key: string]: SheetValueType }[];
}

export const attr = (el: Element, name: string): string =>
  el.getAttribute(name) || '';

export const buildZoneMap = (
  doc: Document
): Map<string, { zoneId: string; zoneName: string }> => {
  const map = new Map<string, { zoneId: string; zoneName: string }>();
  ['DZ', 'AZ'].forEach((tag) => {
    Array.from(doc.getElementsByTagName(tag)).forEach((zone) => {
      const ids = attr(zone, 'Ids');
      const zoneId = attr(zone, 'Id');
      const zoneName = attr(zone, 'Name');
      ids
        .split(' ')
        .filter(Boolean)
        .forEach((id) => {
          map.set(id, { zoneId, zoneName });
        });
    });
  });
  return map;
};
