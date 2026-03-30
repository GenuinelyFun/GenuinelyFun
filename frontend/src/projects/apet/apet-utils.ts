import { SheetValueType } from '../feet/utils/utils.ts';

interface ApertDevice {
  loop: string;
  lsi: string;
  id: string;
  name: string;
  func: string;
  hardware: string;
  sno: string;
  zoneId: string;
  zoneName: string;
}

const buildZoneMap = (
  doc: Document
): Map<string, { zoneId: string; zoneName: string }> => {
  const map = new Map<string, { zoneId: string; zoneName: string }>();
  ['DZ', 'AZ'].forEach((tag) => {
    doc.querySelectorAll(tag).forEach((zone) => {
      const ids = zone.getAttribute('Ids') || '';
      const zoneId = zone.getAttribute('Id') || '';
      const zoneName = zone.getAttribute('Name') || '';
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

const extractDevices = (
  al: Element,
  zoneMap: Map<string, { zoneId: string; zoneName: string }>
): ApertDevice[] => {
  const loopName = al.getAttribute('Name') || '';
  const content = al.querySelector('CONTENT');
  if (!content) return [];

  const devices: ApertDevice[] = [];

  const processElement = (el: Element) => {
    const id = el.getAttribute('Id') || '';
    const zone = zoneMap.get(id);
    devices.push({
      loop: loopName,
      lsi: el.getAttribute('LSI') || '',
      id,
      name: el.getAttribute('Name') || '',
      func: el.getAttribute('Func') || '',
      hardware: el.getAttribute('Hardware') || '',
      sno: el.getAttribute('Sno') || '',
      zoneId: zone?.zoneId || '',
      zoneName: zone?.zoneName || '',
    });
  };

  content.querySelectorAll('PNT, FAD').forEach(processElement);

  return devices;
};

export const mapApetToSheet = (
  xmlString: string
): { [key: string]: SheetValueType }[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  const zoneMap = buildZoneMap(doc);

  const devices: ApertDevice[] = [];
  doc.querySelectorAll('AL').forEach((al) => {
    devices.push(...extractDevices(al, zoneMap));
  });

  return devices.map((device) => ({
    Sløyfe: device.loop,
    LSI: device.lsi,
    ID: device.id,
    Navn: device.name,
    Funksjon: device.func,
    Hardware: device.hardware,
    Serienummer: device.sno,
    Sone: device.zoneId,
    Sonenavn: device.zoneName,
    Status: '',
  }));
};
