import { Panel } from '../interfaces/jsonDataInterface';
import { forEachDeviceInLoopControllers } from './loop-utils';

export const mapControlGroupsToExcel = (panels: Panel[]) => {
  const inputs: Record<string, any>[] = [];
  const loop_outputs: Record<string, any>[] = [];
  const board_outputs: Record<string, any>[] = [];
  const structured_data: Record<string, any>[] = [];
  const loveBabe = 'I will always love you, from your silly man';

  panels.forEach((panel) => {
    panel.input_output_units.forEach((board) => {
      board.clean_contact_inputs?.forEach((input) => {
        inputs.push({
          'Control Group':
            input.control_group_A ||
            input.control_group_B ||
            input.control_group_B2,
          Address: `Panel ${panel.number} - ${board.type} ${board.number} - Input ${input.number}`,
          'Device ID': null,
          Zone: null,
          Description: input.description,
          'Device Type': null,
          'Protocol Type': null,
        });
      });

      board.clean_contact_outputs
        .concat(board.monitored_outputs || [])
        ?.forEach((output) => {
          const { output_control } = output;
          if (output_control.control_groups.length > 0) {
            output_control.control_groups.forEach((control) => {
              board_outputs.push({
                'Control Groups': control,
                'Control Groups Address': `Panel ${panel.number} - ${board.type} ${board.number} - Output ${output.number}`,
                'Control Groups Device ID': null,
                'Control Groups Zone': null,
                'Control Groups Description': output.description,
                'Control Groups Device Type': null,
                'Control Groups Protocol Type': null,
              });
            });
          } else {
            board_outputs.push({
              'Control Groups':
                output.output_control.control === 'Local control'
                  ? 'Control groups local control'
                  : 'Control groups general control',
              'Control Groups Address': `Panel ${panel.number} - ${board.type} ${board.number} - Output ${output.number}`,
              'Control Groups Device ID': null,
              'Control Groups Zone': null,
              'Control Groups Description': output.description,
              'Control Groups Device Type': null,
              'Control Groups Protocol Type': null,
            });
          }
        });
    });
  });
  forEachDeviceInLoopControllers(panels, (panel, loop, device) => {
    const address =
      String(loop.number).padStart(3, '0') +
      '.' +
      String(device.number).padStart(3, '0');
    const control_group_ABB2 = [
      device.control_group_A,
      device.control_group_B,
      device.control_group_B2,
    ].filter((el) => !!el);
    const { output_control } = device;
    const { control_groups } = output_control || {};
    const { control } = output_control || {};

    if (control_group_ABB2.length > 0) {
      control_group_ABB2.forEach((control_group) => {
        inputs.push({
          'Control Group': control_group,
          Address: address,
          'Device ID': device.device_id,
          Zone: device.zone,
          Description: device.description,
          'Device Type': device.type,
          'Protocol Type': device.protocol_type,
        });
      });
    } else if (control_groups || control) {
      if (control === 'General control' && control_groups?.length === 0) {
        loop_outputs.push({
          'Control Groups': 'Control groups general control',
          'Control Groups Address': address,
          'Control Groups Device ID': device.device_id,
          'Control Groups Zone': device.zone,
          'Control Groups Description': device.description,
          'Control Groups Device Type': device.type,
          'Control Groups Protocol Type': device.protocol_type,
        });
      } else if (control === 'Local control' && control_groups?.length === 0) {
        loop_outputs.push({
          'Control Groups': 'Control groups local control',
          'Control Groups Address': address,
          'Control Groups Device ID': device.device_id,
          'Control Groups Zone': device.zone,
          'Control Groups Description': device.description,
          'Control Groups Device Type': device.type,
          'Control Groups Protocol Type': device.protocol_type,
        });
      } else if (control_groups !== undefined && control_groups.length > 0) {
        control_groups.forEach((control_group) => {
          loop_outputs.push({
            'Control Groups': control_group,
            'Control Groups Address': address,
            'Control Groups Device ID': device.device_id,
            'Control Groups Zone': device.zone,
            'Control Groups Description': device.description,
            'Control Groups Device Type': device.type,
            'Control Groups Protocol Type': device.protocol_type,
          });
        });
      }
    }
  });
  const panel_inputs = inputs.filter((input) =>
    input['Address'].includes('Panel'),
  );
  const number_inputs = inputs.filter(
    (input) => !input['Address'].includes('Panel'),
  );

  const inputsToExcel = panel_inputs.concat(number_inputs).sort((a, b) => {
    if (a['Control Group'] === undefined) {
      return 1000;
    }
    if (b['Control Group'] === undefined) {
      return -1000;
    }
    return Number(a['Control Group']) - Number(b['Control Group']);
  });
  const outputToExcel = board_outputs.concat(loop_outputs).sort((a, b) => {
    if (!isNaN(a['Control Groups']) && !isNaN(b['Control Groups'])) {
      return a['Control Groups'] - b['Control Groups'];
    }
    if (isNaN(a['Control Groups']) && !isNaN(b['Control Groups'])) {
      return 1;
    }
    if (!isNaN(a['Control Groups']) && isNaN(b['Control Groups'])) {
      return -1;
    }
    return String(a['Control Groups']).localeCompare(
      String(b['Control Groups']),
    );
  });

  const keys = [
    ...inputsToExcel.map((input) => input['Control Group']),
    ...outputToExcel.map((output) => output['Control Groups']),
  ]
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort((a, b) => {
      if (!isNaN(a) && !isNaN(b)) {
        return a - b;
      }
      if (!isNaN(a) && isNaN(b)) {
        return -1;
      }
      if (isNaN(a) && !isNaN(b)) {
        return 1;
      }
      return String(a).localeCompare(b);
    });
  keys.forEach((key) => {
    const inputs = inputsToExcel.filter(
      (input) => input['Control Group'] === key,
    );
    const outputs = outputToExcel.filter(
      (output) => output['Control Groups'] === key,
    );
    for (let i = 0; i < Math.max(inputs.length, outputs.length); i++) {
      if (inputs[i] !== undefined && outputs[i] !== undefined) {
        structured_data.push({ ...inputs[i], ...outputs[i] });
      } else if (inputs[i] !== undefined && outputs[i] === undefined) {
        structured_data.push(inputs[i]);
      } else if (inputs[i] === undefined && outputs[i] !== undefined) {
        structured_data.push(outputs[i]);
      }
    }
  });
  return structured_data;
};
