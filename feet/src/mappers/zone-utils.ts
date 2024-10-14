import { Panel, Zone } from '../interfaces/jsonDataInterface';

export const mapZonesToExcel = (zone: Zone, panel: number) => {
  return {
    'Panel Number': panel,
    Zone: zone.number,
    Description: zone.description,
  };
};

export const mapPanelsWithZones = (
  panels: Panel[],
  zones: Zone[],
): {
  'Panel Number': number;
  Zone: number;
  Description: string;
}[] => {
  const mappedPanelZones: {
    'Panel Number': number;
    Zone: number;
    Description: string;
  }[] = [];

  panels.map((panel) => {
    const firstZone = panel.first_zone;
    const amountOfZones = panel.number_of_zones;

    for (let i = firstZone; i < firstZone + amountOfZones; i++) {
      const zone = zones.find((zone) => zone.number === i);
      if (zone) {
        mappedPanelZones.push(mapZonesToExcel(zone, panel.number));
      }
    }
  });

  return mappedPanelZones;
};
