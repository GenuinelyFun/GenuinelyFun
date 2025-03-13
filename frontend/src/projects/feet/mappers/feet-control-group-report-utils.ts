import { ControlGroupC, Panel } from '../interfaces/feetJsonDataInterface.ts';
import { forEachDeviceInLoopControllers } from './feet-loop-utils.ts';
import { sheetTranslateType, sheetValueTypes } from './feet-utils.ts';

export const mapControlGroupsToExcel = (
  panels: Panel[],
  sheetTranslate: sheetTranslateType
) => {
  const inputs: Record<string, sheetValueTypes>[] = [];
  const loop_outputs: Record<string, sheetValueTypes>[] = [];
  const board_outputs: Record<string, sheetValueTypes>[] = [];
  const structured_data: Record<string, sheetValueTypes>[] = [];
  // @ts-expect-error Love will always prevail
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loveBabe = 'I will always love you, from your silly man';

  const mapToControlGroupObject = (
    groupNumber: sheetValueTypes = null,
    groupAddress: sheetValueTypes = null,
    groupDeviceId: sheetValueTypes = null,
    groupZone: sheetValueTypes = null,
    groupDescription: sheetValueTypes = null,
    groupDevice: sheetValueTypes = null,
    groupProtocol: sheetValueTypes = null,
    groupsNumber: sheetValueTypes = null,
    groupsAddress: sheetValueTypes = null,
    groupsDeviceId: sheetValueTypes = null,
    groupsZone: sheetValueTypes = null,
    groupsDescription: sheetValueTypes = null,
    groupsDevice: sheetValueTypes = null,
    groupsProtocol: sheetValueTypes = null
  ) => {
    return {
      [sheetTranslate('Group') + ' ' + sheetTranslate('Number')]: groupNumber,
      [sheetTranslate('Group') + ' ' + sheetTranslate('Address')]: groupAddress,
      [sheetTranslate('Group') + ' ' + sheetTranslate('DeviceId.title')]:
        groupDeviceId,
      [sheetTranslate('Group') + ' ' + sheetTranslate('Zone')]: groupZone,
      [sheetTranslate('Group') + ' ' + sheetTranslate('Description.title')]:
        groupDescription,
      [sheetTranslate('Group') + ' ' + sheetTranslate('Device Type')]:
        groupDevice,
      [sheetTranslate('Group') + ' ' + sheetTranslate('Protocol.type.title')]:
        groupProtocol,
      [sheetTranslate('Control groups.title') + ' ' + sheetTranslate('Number')]:
        groupsNumber,
      [sheetTranslate('Control groups.title') +
      ' ' +
      sheetTranslate('Address')]: groupsAddress,
      [sheetTranslate('Control groups.title') +
      ' ' +
      sheetTranslate('DeviceId.title')]: groupsDeviceId,
      [sheetTranslate('Control groups.title') + ' ' + sheetTranslate('Zone')]:
        groupsZone,
      [sheetTranslate('Control groups.title') +
      ' ' +
      sheetTranslate('Description.title')]: groupsDescription,
      [sheetTranslate('Control groups.title') +
      ' ' +
      sheetTranslate('Device Type')]: groupsDevice,
      [sheetTranslate('Control groups.title') +
      ' ' +
      sheetTranslate('Protocol.type.title')]: groupsProtocol,
    };
  };
  panels.forEach((panel) => {
    panel.input_output_units.forEach((board) => {
      board.clean_contact_inputs?.forEach((input) => {
        inputs.push({
          [sheetTranslate('Group') + ' ' + sheetTranslate('Number')]:
            input.control_group_A ||
            input.control_group_B ||
            input.control_group_B2,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Address')]:
            `${sheetTranslate('Panel')} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Input')} ${input.number}`,
          [sheetTranslate('Group') + ' ' + sheetTranslate('DeviceId.title')]:
            null,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Zone')]: null,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Description.title')]:
            input.description,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Device Type')]: null,
          [sheetTranslate('Group') +
          ' ' +
          sheetTranslate('Protocol.type.title')]: null,
        });
      });

      board.clean_contact_outputs
        .concat(board.monitored_outputs || [])
        ?.forEach((output) => {
          const { output_control } = output;
          if (output_control.control_groups.length > 0) {
            output_control.control_groups.forEach((control) => {
              board_outputs.push({
                [sheetTranslate('Control groups.title') +
                ' ' +
                sheetTranslate('Number')]: control,
                [sheetTranslate('Control groups.title') +
                ' ' +
                sheetTranslate('Address')]:
                  `${sheetTranslate('Panel')} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Output')} ${output.number}`,
                [sheetTranslate('Control groups.title') +
                ' ' +
                sheetTranslate('DeviceId.title')]: null,
                [sheetTranslate('Control groups.title') +
                ' ' +
                sheetTranslate('Zone')]: null,
                [sheetTranslate('Control groups.title') +
                ' ' +
                sheetTranslate('Description.title')]: output.description,
                [sheetTranslate('Control groups.title') +
                ' ' +
                sheetTranslate('Device Type')]: null,
                [sheetTranslate('Control groups.title') +
                ' ' +
                sheetTranslate('Protocol.type.title')]: null,
              });
            });
          } else {
            board_outputs.push({
              [sheetTranslate('Control groups.title') +
              ' ' +
              sheetTranslate('Number')]:
                output.output_control.control === 'Local control'
                  ? sheetTranslate('Control groups') +
                    ' ' +
                    sheetTranslate('Local control')
                  : sheetTranslate('Control groups') +
                    ' ' +
                    sheetTranslate('General control'),
              [sheetTranslate('Control groups.title') +
              ' ' +
              sheetTranslate('Address')]:
                `${sheetTranslate('Panel')} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Output')} ${output.number}`,
              [sheetTranslate('Control groups.title') +
              ' ' +
              sheetTranslate('DeviceId.title')]: null,
              [sheetTranslate('Control groups.title') +
              ' ' +
              sheetTranslate('Zone')]: null,
              [sheetTranslate('Control groups.title') +
              ' ' +
              sheetTranslate('Description.title')]: output.description,
              [sheetTranslate('Control groups.title') +
              ' ' +
              sheetTranslate('Device Type')]: null,
              [sheetTranslate('Control groups.title') +
              ' ' +
              sheetTranslate('Protocol.type.title')]: null,
            });
          }
        });
    });
  });
  forEachDeviceInLoopControllers(panels, (_panel, loop, device) => {
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
          [sheetTranslate('Group') + ' ' + sheetTranslate('Number')]:
            control_group,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Address')]: address,
          [sheetTranslate('Group') + ' ' + sheetTranslate('DeviceId.title')]:
            device.device_id,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Zone')]: device.zone,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Description.title')]:
            device.description,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Device Type')]:
            device.type,
          [sheetTranslate('Group') +
          ' ' +
          sheetTranslate('Protocol.type.title')]: device.protocol_type,
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
          [sheetTranslate('Group') + ' ' + sheetTranslate('Number')]:
            controlGroupC(),
          [sheetTranslate('Group') + ' ' + sheetTranslate('Address')]: address,
          [sheetTranslate('Group') + ' ' + sheetTranslate('DeviceId.title')]:
            device.device_id,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Zone')]: device.zone,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Description.title')]:
            device.description,
          [sheetTranslate('Group') + ' ' + sheetTranslate('Device Type')]:
            device.type,
          [sheetTranslate('Group') +
          ' ' +
          sheetTranslate('Protocol.type.title')]: device.protocol_type,
        });
      });
    }
    if (control_groups || control) {
      if (control === 'General control' && control_groups?.length === 0) {
        loop_outputs.push({
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Number')]:
            sheetTranslate('Control groups') +
            ' ' +
            sheetTranslate('General control'),
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Address')]: address,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('DeviceId.title')]: device.device_id,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Zone')]: device.zone,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Description.title')]: device.description,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Device Type')]: device.type,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Protocol.type.title')]: device.protocol_type,
        });
      } else if (control === 'Local control' && control_groups?.length === 0) {
        loop_outputs.push({
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Number')]:
            sheetTranslate('Control groups') +
            ' ' +
            sheetTranslate('Local control'),
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Address')]: address,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('DeviceId.title')]: device.device_id,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Zone')]: device.zone,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Description.title')]: device.description,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Device Type')]: device.type,
          [sheetTranslate('Control groups.title') +
          ' ' +
          sheetTranslate('Protocol.type.title')]: device.protocol_type,
        });
      } else if (control_groups !== undefined && control_groups.length > 0) {
        control_groups.forEach((control_group) => {
          loop_outputs.push({
            [sheetTranslate('Control groups.title') +
            ' ' +
            sheetTranslate('Number')]: control_group,
            [sheetTranslate('Control groups.title') +
            ' ' +
            sheetTranslate('Address')]: address,
            [sheetTranslate('Control groups.title') +
            ' ' +
            sheetTranslate('DeviceId.title')]: device.device_id,
            [sheetTranslate('Control groups.title') +
            ' ' +
            sheetTranslate('Zone')]: device.zone,
            [sheetTranslate('Control groups.title') +
            ' ' +
            sheetTranslate('Description.title')]: device.description,
            [sheetTranslate('Control groups.title') +
            ' ' +
            sheetTranslate('Device Type')]: device.type,
            [sheetTranslate('Control groups.title') +
            ' ' +
            sheetTranslate('Protocol.type.title')]: device.protocol_type,
          });
        });
      }
    }
  });
  const panel_inputs = inputs.filter((input) =>
    String(
      input[sheetTranslate('Group') + ' ' + sheetTranslate('Address')]
    ).includes(`${sheetTranslate('Panel')}`)
  );
  const number_inputs = inputs.filter(
    (input) =>
      !String(
        input[sheetTranslate('Group') + ' ' + sheetTranslate('Address')]
      ).includes(`${sheetTranslate('Panel')}`)
  );

  const controlGroupTitle =
    sheetTranslate('Group') + ' ' + sheetTranslate('Number');

  const controlGroupsTitle =
    sheetTranslate('Control groups.title') + ' ' + sheetTranslate('Number');

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
    if (
      !isNaN(Number(a[controlGroupsTitle])) &&
      !isNaN(Number(b[controlGroupsTitle]))
    ) {
      return Number(a[controlGroupsTitle]) - Number(b[controlGroupsTitle]);
    }
    if (
      isNaN(Number(a[controlGroupsTitle])) &&
      !isNaN(Number(b[controlGroupsTitle]))
    ) {
      return 1;
    }
    if (
      !isNaN(Number(a[controlGroupsTitle])) &&
      isNaN(Number(b[controlGroupsTitle]))
    ) {
      return -1;
    }
    return String(a[controlGroupsTitle]).localeCompare(
      String(b[controlGroupsTitle])
    );
  });

  const sortControlGroupC = (c?: sheetValueTypes) => {
    if (c === undefined) {
      return false;
    }
    if (String(c).split(' ').length === 2) {
      return Number(String(c).split(' ')[0]);
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
          return String(a).localeCompare(String(b));
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
        isNaN(Number(b))
      ) {
        return -1;
      }
      if (
        (typeof controlCb === 'number' || typeof b === 'number') &&
        isNaN(Number(a))
      ) {
        return 1;
      }
      return String(a).localeCompare(String(b));
    });
  keys.forEach((key) => {
    const inputs = inputsToExcel.filter(
      (input) => input[controlGroupTitle] === key
    );
    const outputs = outputToExcel.filter(
      (output) => output[controlGroupsTitle] === key
    );
    for (let i = 0; i < Math.max(inputs.length, outputs.length); i++) {
      if (inputs[i] !== undefined && outputs[i] !== undefined) {
        structured_data.push(
          mapToControlGroupObject(
            ...Object.values(inputs[i]),
            ...Object.values(outputs[i])
          )
        ); //{ ...inputs[i], ...outputs[i] });
      } else if (inputs[i] !== undefined && outputs[i] === undefined) {
        structured_data.push(
          mapToControlGroupObject(...Object.values(inputs[i]))
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
            ...Object.values(outputs[i])
          )
        );
      }
    }
  });
  return structured_data;
};
