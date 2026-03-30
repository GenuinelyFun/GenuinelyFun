import {
  attr,
  buildZoneMap,
  HARDWARE_DESCRIPTION,
  SheetValueType,
} from './utils.ts';

export interface SloeyfeResult {
  slyfe: { [key: string]: SheetValueType }[];
  typeCounts: Record<string, number>;
  aktiveSloeyfer: number;
}

export const mapSloeyfeToSheet = (doc: Document): SloeyfeResult => {
  const zoneMap = buildZoneMap(doc);
  const slyfe: { [key: string]: SheetValueType }[] = [];
  const typeCounts: Record<string, number> = {};
  let aktiveSloeyfer = 0;

  Array.from(doc.getElementsByTagName('AL')).forEach((al) => {
    const loopHardware = attr(al, 'Hardware');
    const loopId = attr(al, 'Id');
    const loopName = attr(al, 'Name');
    if (attr(al, 'LoopAct') === '1') aktiveSloeyfer++;

    const contentNodes = al.getElementsByTagName('CONTENT');
    if (contentNodes.length === 0) return;
    const content = contentNodes[0];

    const processDevice = (el: Element) => {
      const id = attr(el, 'Id');
      const zone = zoneMap.get(id);
      const hardware = attr(el, 'Hardware');
      const description = HARDWARE_DESCRIPTION[hardware] || hardware;

      slyfe.push({
        'Slyfe hardware': loopHardware,
        'Slyfe ID': loopId,
        'Slyfe navn': loopName,
        'Adresse navn': zone?.zoneName || '',
        'Adresse LSI': attr(el, 'LSI'),
        'Adresse ID': id,
        'Adresse navn2': attr(el, 'Name'),
        'Adresse funksjon': attr(el, 'Func'),
        'Adresse protokoll': hardware,
        'Adresse beskrivelse': description,
        'Adresse serienummer': attr(el, 'Sno'),
        'Adresse sone': zone?.zoneId || '',
        'Adresse DCl': attr(el, 'DCl'),
        'Adresse LED': attr(el, 'LED'),
        'Adresse NCl': attr(el, 'NCl'),
        'Adresse OverDelDep': attr(el, 'OverDelDep'),
        'Adresse POL': attr(el, 'POL'),
        'Adresse SV': attr(el, 'SV'),
      });

      typeCounts[description] = (typeCounts[description] || 0) + 1;
    };

    Array.from(content.getElementsByTagName('PNT')).forEach(processDevice);
    Array.from(content.getElementsByTagName('FAD')).forEach(processDevice);
  });

  return { slyfe, typeCounts, aktiveSloeyfer };
};
