import { ControlGroupC, Panel } from '../interfaces/jsonDataInterface';
import { forEachDeviceInLoopControllers } from './fire-loop-utils';
import { sheetTranslate } from './utils';

export const mapControlGroupsToExcel = (
  panels: Panel[],
  sheetLanguage: string,
) => {
  const inputs: Record<string, any>[] = [];
  const loop_outputs: Record<string, any>[] = [];
  const board_outputs: Record<string, any>[] = [];
  const structured_data: Record<string, any>[] = [];
  const loveBabe = 'I will always love you, from your silly man';

  const mapToControlGroupObject = (
    groupNumber = null,
    groupAddress = null,
    groupDeviceId = null,
    groupZone = null,
    groupDescription = null,
    groupDevice = null,
    groupProtocol = null,
    groupsNumber = null,
    groupsAddress = null,
    groupsDeviceId = null,
    groupsZone = null,
    groupsDescription = null,
    groupsDevice = null,
    groupsProtocol = null,
  ) => {
    return {
      [sheetTranslate('Group', sheetLanguage) +
      ' ' +
      sheetTranslate('Number', sheetLanguage)]: groupNumber,
      [sheetTranslate('Group', sheetLanguage) +
      ' ' +
      sheetTranslate('Address', sheetLanguage)]: groupAddress,
      [sheetTranslate('Group', sheetLanguage) +
      ' ' +
      sheetTranslate('DeviceId.title', sheetLanguage)]: groupDeviceId,
      [sheetTranslate('Group', sheetLanguage) +
      ' ' +
      sheetTranslate('Zone', sheetLanguage)]: groupZone,
      [sheetTranslate('Group', sheetLanguage) +
      ' ' +
      sheetTranslate('Description.title', sheetLanguage)]: groupDescription,
      [sheetTranslate('Group', sheetLanguage) +
      ' ' +
      sheetTranslate('Device Type', sheetLanguage)]: groupDevice,
      [sheetTranslate('Group', sheetLanguage) +
      ' ' +
      sheetTranslate('Protocol.type.title', sheetLanguage)]: groupProtocol,
      [sheetTranslate('Control groups.title', sheetLanguage) +
      ' ' +
      sheetTranslate('Number', sheetLanguage)]: groupsNumber,
      [sheetTranslate('Control groups.title', sheetLanguage) +
      ' ' +
      sheetTranslate('Address', sheetLanguage)]: groupsAddress,
      [sheetTranslate('Control groups.title', sheetLanguage) +
      ' ' +
      sheetTranslate('DeviceId.title', sheetLanguage)]: groupsDeviceId,
      [sheetTranslate('Control groups.title', sheetLanguage) +
      ' ' +
      sheetTranslate('Zone', sheetLanguage)]: groupsZone,
      [sheetTranslate('Control groups.title', sheetLanguage) +
      ' ' +
      sheetTranslate('Description.title', sheetLanguage)]: groupsDescription,
      [sheetTranslate('Control groups.title', sheetLanguage) +
      ' ' +
      sheetTranslate('Device Type', sheetLanguage)]: groupsDevice,
      [sheetTranslate('Control groups.title', sheetLanguage) +
      ' ' +
      sheetTranslate('Protocol.type.title', sheetLanguage)]: groupsProtocol,
    };
  };
  panels.forEach((panel) => {
    panel.input_output_units.forEach((board) => {
      board.clean_contact_inputs?.forEach((input) => {
        inputs.push({
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Number', sheetLanguage)]:
            input.control_group_A ||
            input.control_group_B ||
            input.control_group_B2,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Address', sheetLanguage)]:
            `${sheetTranslate('Panel', sheetLanguage)} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Input', sheetLanguage)} ${input.number}`,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('DeviceId.title', sheetLanguage)]: null,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Zone', sheetLanguage)]: null,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Description.title', sheetLanguage)]:
            input.description,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Device Type', sheetLanguage)]: null,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Protocol.type.title', sheetLanguage)]: null,
        });
      });

      board.clean_contact_outputs
        .concat(board.monitored_outputs || [])
        ?.forEach((output) => {
          const { output_control } = output;
          if (output_control.control_groups.length > 0) {
            output_control.control_groups.forEach((control) => {
              board_outputs.push({
                [sheetTranslate('Control groups.title', sheetLanguage) +
                ' ' +
                sheetTranslate('Number', sheetLanguage)]: control,
                [sheetTranslate('Control groups.title', sheetLanguage) +
                ' ' +
                sheetTranslate('Address', sheetLanguage)]:
                  `${sheetTranslate('Panel', sheetLanguage)} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Output', sheetLanguage)} ${output.number}`,
                [sheetTranslate('Control groups.title', sheetLanguage) +
                ' ' +
                sheetTranslate('DeviceId.title', sheetLanguage)]: null,
                [sheetTranslate('Control groups.title', sheetLanguage) +
                ' ' +
                sheetTranslate('Zone', sheetLanguage)]: null,
                [sheetTranslate('Control groups.title', sheetLanguage) +
                ' ' +
                sheetTranslate('Description.title', sheetLanguage)]:
                  output.description,
                [sheetTranslate('Control groups.title', sheetLanguage) +
                ' ' +
                sheetTranslate('Device Type', sheetLanguage)]: null,
                [sheetTranslate('Control groups.title', sheetLanguage) +
                ' ' +
                sheetTranslate('Protocol.type.title', sheetLanguage)]: null,
              });
            });
          } else {
            board_outputs.push({
              [sheetTranslate('Control groups.title', sheetLanguage) +
              ' ' +
              sheetTranslate('Number', sheetLanguage)]:
                output.output_control.control === 'Local control'
                  ? sheetTranslate('Control groups', sheetLanguage) +
                    ' ' +
                    sheetTranslate('Local control', sheetLanguage)
                  : sheetTranslate('Control groups', sheetLanguage) +
                    ' ' +
                    sheetTranslate('General control', sheetLanguage),
              [sheetTranslate('Control groups.title', sheetLanguage) +
              ' ' +
              sheetTranslate('Address', sheetLanguage)]:
                `${sheetTranslate('Panel', sheetLanguage)} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Output', sheetLanguage)} ${output.number}`,
              [sheetTranslate('Control groups.title', sheetLanguage) +
              ' ' +
              sheetTranslate('DeviceId.title', sheetLanguage)]: null,
              [sheetTranslate('Control groups.title', sheetLanguage) +
              ' ' +
              sheetTranslate('Zone', sheetLanguage)]: null,
              [sheetTranslate('Control groups.title', sheetLanguage) +
              ' ' +
              sheetTranslate('Description.title', sheetLanguage)]:
                output.description,
              [sheetTranslate('Control groups.title', sheetLanguage) +
              ' ' +
              sheetTranslate('Device Type', sheetLanguage)]: null,
              [sheetTranslate('Control groups.title', sheetLanguage) +
              ' ' +
              sheetTranslate('Protocol.type.title', sheetLanguage)]: null,
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
    const { output_control, control_group_C } = device;
    const { control_groups } = output_control || {};
    const { control } = output_control || {};

    if (control_group_ABB2.length > 0) {
      control_group_ABB2.forEach((control_group) => {
        inputs.push({
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Number', sheetLanguage)]: control_group,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Address', sheetLanguage)]: address,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('DeviceId.title', sheetLanguage)]: device.device_id,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Zone', sheetLanguage)]: device.zone,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Description.title', sheetLanguage)]:
            device.description,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Device Type', sheetLanguage)]: device.type,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Protocol.type.title', sheetLanguage)]:
            device.protocol_type,
        });
      });
    }
    if (control_group_C && control_group_C.length > 0) {
      control_group_C.forEach((control_group: ControlGroupC) => {
        const controlGroupC = () => {
          const minutes = control_group.delay
            ? Math.floor(control_group.delay / 60)
            : 0;
          const seconds = control_group.delay
            ? control_group.delay - minutes * 60
            : 0;
          return (
            control_group.group +
            ' ' +
            String(minutes).padStart(2, '0') +
            ':' +
            String(seconds).padStart(2, '0')
          );
        };
        inputs.push({
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Number', sheetLanguage)]: controlGroupC(),
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Address', sheetLanguage)]: address,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('DeviceId.title', sheetLanguage)]: device.device_id,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Zone', sheetLanguage)]: device.zone,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Description.title', sheetLanguage)]:
            device.description,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Device Type', sheetLanguage)]: device.type,
          [sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Protocol.type.title', sheetLanguage)]:
            device.protocol_type,
        });
      });
    }
    if (control_groups || control) {
      if (control === 'General control' && control_groups?.length === 0) {
        loop_outputs.push({
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Number', sheetLanguage)]:
            sheetTranslate('Control groups', sheetLanguage) +
            ' ' +
            sheetTranslate('General control', sheetLanguage),
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Address', sheetLanguage)]: address,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('DeviceId.title', sheetLanguage)]: device.device_id,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Zone', sheetLanguage)]: device.zone,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Description.title', sheetLanguage)]:
            device.description,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Device Type', sheetLanguage)]: device.type,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Protocol.type.title', sheetLanguage)]:
            device.protocol_type,
        });
      } else if (control === 'Local control' && control_groups?.length === 0) {
        loop_outputs.push({
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Number', sheetLanguage)]:
            sheetTranslate('Control groups', sheetLanguage) +
            ' ' +
            sheetTranslate('Local control', sheetLanguage),
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Address', sheetLanguage)]: address,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('DeviceId.title', sheetLanguage)]: device.device_id,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Zone', sheetLanguage)]: device.zone,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Description.title', sheetLanguage)]:
            device.description,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Device Type', sheetLanguage)]: device.type,
          [sheetTranslate('Control groups.title', sheetLanguage) +
          ' ' +
          sheetTranslate('Protocol.type.title', sheetLanguage)]:
            device.protocol_type,
        });
      } else if (control_groups !== undefined && control_groups.length > 0) {
        control_groups.forEach((control_group) => {
          loop_outputs.push({
            [sheetTranslate('Control groups.title', sheetLanguage) +
            ' ' +
            sheetTranslate('Number', sheetLanguage)]: control_group,
            [sheetTranslate('Control groups.title', sheetLanguage) +
            ' ' +
            sheetTranslate('Address', sheetLanguage)]: address,
            [sheetTranslate('Control groups.title', sheetLanguage) +
            ' ' +
            sheetTranslate('DeviceId.title', sheetLanguage)]: device.device_id,
            [sheetTranslate('Control groups.title', sheetLanguage) +
            ' ' +
            sheetTranslate('Zone', sheetLanguage)]: device.zone,
            [sheetTranslate('Control groups.title', sheetLanguage) +
            ' ' +
            sheetTranslate('Description.title', sheetLanguage)]:
              device.description,
            [sheetTranslate('Control groups.title', sheetLanguage) +
            ' ' +
            sheetTranslate('Device Type', sheetLanguage)]: device.type,
            [sheetTranslate('Control groups.title', sheetLanguage) +
            ' ' +
            sheetTranslate('Protocol.type.title', sheetLanguage)]:
              device.protocol_type,
          });
        });
      }
    }
  });
  const panel_inputs = inputs.filter((input) =>
    input[
      sheetTranslate('Group', sheetLanguage) +
        ' ' +
        sheetTranslate('Address', sheetLanguage)
    ].includes(`${sheetTranslate('Panel', sheetLanguage)}`),
  );
  const number_inputs = inputs.filter(
    (input) =>
      !input[
        sheetTranslate('Group', sheetLanguage) +
          ' ' +
          sheetTranslate('Address', sheetLanguage)
      ].includes(`${sheetTranslate('Panel', sheetLanguage)}`),
  );

  const controlGroupTitle =
    sheetTranslate('Group', sheetLanguage) +
    ' ' +
    sheetTranslate('Number', sheetLanguage);

  const controlGroupsTitle =
    sheetTranslate('Control groups.title', sheetLanguage) +
    ' ' +
    sheetTranslate('Number', sheetLanguage);

  const inputsToExcel = panel_inputs.concat(number_inputs).sort((a, b) => {
    if (a[controlGroupTitle] === undefined) {
      return 1000;
    }
    if (b[controlGroupTitle] === undefined) {
      return -1000;
    }
    return Number(a[controlGroupTitle]) - Number(b[controlGroupTitle]);
  });
  const outputToExcel = board_outputs.concat(loop_outputs).sort((a, b) => {
    if (!isNaN(a[controlGroupsTitle]) && !isNaN(b[controlGroupsTitle])) {
      return a[controlGroupsTitle] - b[controlGroupsTitle];
    }
    if (isNaN(a[controlGroupsTitle]) && !isNaN(b[controlGroupsTitle])) {
      return 1;
    }
    if (!isNaN(a[controlGroupsTitle]) && isNaN(b[controlGroupsTitle])) {
      return -1;
    }
    return String(a[controlGroupsTitle]).localeCompare(
      String(b[controlGroupsTitle]),
    );
  });

  const sortControlGroupC = (c: string) => {
    if (String(c).split(' ').length === 2) {
      return Number(c.split(' ')[0]);
    }
    return false;
  };

  const keys = [
    ...inputsToExcel.map((input) => input[controlGroupTitle]),
    ...outputToExcel.map((output) => output[controlGroupsTitle]),
  ]
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort((a, b) => {
      const controlCa = sortControlGroupC(a);
      const controlCb = sortControlGroupC(b);

      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      if (typeof controlCa === 'number' && typeof controlCb === 'number') {
        if (controlCa - controlCb === 0) {
          return String(a).localeCompare(b);
        }
        return controlCa - controlCb;
      }
      if (typeof controlCa === 'number' && typeof b === 'number') {
        return controlCa === b ? 1 : controlCa - b;
      }
      if (typeof a === 'number' && typeof controlCb === 'number') {
        return a === controlCb ? -1 : a - controlCb;
      }
      if (
        (typeof controlCa === 'number' || typeof a === 'number') &&
        isNaN(b)
      ) {
        return -1;
      }
      if (
        (typeof controlCb === 'number' || typeof b === 'number') &&
        isNaN(a)
      ) {
        return 1;
      }
      return String(a).localeCompare(b);
    });
  keys.forEach((key) => {
    const inputs = inputsToExcel.filter(
      (input) => input[controlGroupTitle] === key,
    );
    const outputs = outputToExcel.filter(
      (output) => output[controlGroupsTitle] === key,
    );
    for (let i = 0; i < Math.max(inputs.length, outputs.length); i++) {
      if (inputs[i] !== undefined && outputs[i] !== undefined) {
        structured_data.push(
          mapToControlGroupObject(
            ...Object.values(inputs[i]),
            ...Object.values(outputs[i]),
          ),
        ); //{ ...inputs[i], ...outputs[i] });
      } else if (inputs[i] !== undefined && outputs[i] === undefined) {
        structured_data.push(
          mapToControlGroupObject(...Object.values(inputs[i])),
        );
      } else if (inputs[i] === undefined && outputs[i] !== undefined) {
        structured_data.push(
          mapToControlGroupObject(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            ...Object.values(outputs[i]),
          ),
        );
      }
    }
  });
  return structured_data;
};
