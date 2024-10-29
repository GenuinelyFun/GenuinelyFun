import { Panel } from '../interfaces/jsonDataInterface';

export const mapLoopAddressToExcel = (panels: Panel[]) => {
  const addressExcel: Record<string, any>[] = [];

  panels.forEach((panel) => {
    panel.loop_controllers.forEach((loop_controller) => {
      loop_controller.loops.forEach((loop) => {
        loop.addresses.forEach((device) => {
          addressExcel.push({
            Address: `${String(loop.number).padStart(3, '0')}.${String(device.number).padStart(3, '0')}`,
            'DeviceId.title': device.device_id,
            Zone: device.zone,
            Description: device.description,
            'Type.title': device.type + ', ' + device.protocol_type,
          });
        });
      });
    });
  });

  let emptyIdColumn = true;

  addressExcel
    .map((item) => item['DeviceId.title'])
    .forEach((item) => {
      if (item !== undefined) {
        emptyIdColumn = false;
      }
    });

  if (emptyIdColumn) {
    return addressExcel.map((item) => {
      return {
        Address: item.Address,
        Zone: item.Zone,
        Description: item.Description,
        'Type.title': item['Type.title'],
      };
    });
  }

  return addressExcel;
};
