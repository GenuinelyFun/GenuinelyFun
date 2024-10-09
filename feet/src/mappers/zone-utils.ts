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

    for (let i = firstZone - 1; i < firstZone + amountOfZones - 1; i++) {
      mappedPanelZones.push(mapZonesToExcel(zones[i], panel.number));
    }
  });

  return mappedPanelZones;
};
