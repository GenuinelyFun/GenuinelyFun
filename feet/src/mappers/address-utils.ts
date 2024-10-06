import { Panel } from '../interfaces/jsonDataInterface';

export const mapLoopAddressToExcel = (panels: Panel[]) => {
  const addressExcel: Record<string, any>[] = [];

  panels.forEach((panel) => {
    panel.loop_controllers.forEach((loop_controller) => {
      loop_controller.loops.forEach((loop) => {
        loop.addresses.forEach((device) => {
          addressExcel.push({
            Address: `${String(loop.number).padStart(3, '0')}.${String(device.number).padStart(3, '0')}`,
            'Device ID': device.device_id,
            Zone: device.zone,
            Description: device.description,
            'Device Type': device.type,
            'Protocol Type': device.protocol_type,
          });
        });
      });
    });
  });

  return addressExcel;
};
