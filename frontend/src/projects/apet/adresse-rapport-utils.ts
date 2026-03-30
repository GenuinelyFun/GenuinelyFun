import {
  attr,
  buildZoneMap,
  HARDWARE_DESCRIPTION,
  SheetValueType,
} from './utils.ts';

export const mapAdresseRapportToSheet = (
  doc: Document
): { [key: string]: SheetValueType }[] => {
  const zoneMap = buildZoneMap(doc);
  const adresseRapport: { [key: string]: SheetValueType }[] = [];

  Array.from(doc.getElementsByTagName('AL')).forEach((al) => {
    const contentNodes = al.getElementsByTagName('CONTENT');
    if (contentNodes.length === 0) return;
    const content = contentNodes[0];

    Array.from(content.getElementsByTagName('PNT')).forEach((el) => {
      const id = attr(el, 'Id');
      const zone = zoneMap.get(id);
      const hardware = attr(el, 'Hardware');
      const description = HARDWARE_DESCRIPTION[hardware] || hardware;

      adresseRapport.push({
        Adresse: attr(el, 'Name'),
        Sone: zone?.zoneId || '',
        Beskrivelse: zone?.zoneName || '',
        Type: description,
      });
    });
  });

  return adresseRapport;
};
