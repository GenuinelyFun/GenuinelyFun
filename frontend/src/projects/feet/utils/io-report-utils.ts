import {
  MonitoredAndCleanContactOutput,
  Panel,
} from '../feetJsonDataInterface.ts';
import { forEachDeviceInLoopControllers } from './loop-utils.ts';
import { sheetTranslateType, SheetValueType } from './utils.ts';

const isNull = (el: unknown) => el === null || el === '' || el === undefined;

export const mapToIOReportToExcel = (
  panels: Panel[],
  sheetTranslate: sheetTranslateType
) => {
  const IOReport: Record<string, SheetValueType>[] = [];
  const handleMonitoredAndCleanContactOutputs = (
    output: MonitoredAndCleanContactOutput,
    address: string
  ) => {
    const { output_control } = output;
    const { output_function } = output_control;
    const { control, control_groups } = output_control;

    if (output_function === 'Not in use') {
      return;
    }

    const otherFunctions = [];
    if (!control_groups || control_groups.length === 0) {
      if (control === 'General control') {
        otherFunctions.push(
          sheetTranslate('Control groups') +
            ': ' +
            sheetTranslate('General control')
        );
      } else if (control === 'Local control') {
        otherFunctions.push(
          sheetTranslate('Control groups') +
            ': ' +
            sheetTranslate('Local control')
        );
      }
    } else {
      otherFunctions.push(
        sheetTranslate('Control groups') + ': ' + control_groups.join(', ')
      );
    }

    IOReport.push({
      Address: address,
      Zone: null,
      Description: output.description,
      'Input Function': null,
      'Output Function': output_function,
      'Other Functions': otherFunctions.join(', '),
    });
  };

  panels.forEach((panel) => {
    panel.input_output_units.forEach((board) => {
      board.clean_contact_inputs?.forEach((input) => {
        const address = `${sheetTranslate('Panel')} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Input')} ${input.number}`;

        if (input.function === 'Not in use') {
          return;
        }
        const functions = [];
        if (input.control_group_A)
          functions.push(
            `${sheetTranslate('Ctrl A.title')}: ${input.control_group_A}`
          );
        if (input.control_group_B)
          functions.push(
            `${sheetTranslate('Ctrl B.title')}: ${input.control_group_B}`
          );
        if (input.control_group_B2)
          functions.push(
            `${sheetTranslate('Ctrl B2.title')}: ${input.control_group_B2}`
          );

        IOReport.push({
          Address: address,
          Zone: null,
          Description: input.description,
          'Input Function': input.function,
          'Output Function': null,
          'Control groups.title': functions.join(', '),
        });
      });

      board.clean_contact_outputs.forEach((output) => {
        const address = `${sheetTranslate('Panel')} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Output')} ${output.number}`;
        handleMonitoredAndCleanContactOutputs(output, address);
      });

      board.monitored_outputs?.forEach((output) => {
        const address = `${sheetTranslate('Panel')} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Monitored Output')} ${output.number}`;
        handleMonitoredAndCleanContactOutputs(output, address);
      });
    });
  });

  forEachDeviceInLoopControllers(panels, (_panel, loop, device) => {
    const {
      control_group_A,
      control_group_B,
      control_group_B2,
      output_control,
    } = device;
    const functions = [];
    if (control_group_A)
      functions.push(`${sheetTranslate('Ctrl A.title')}: ${control_group_A}`);
    if (control_group_B)
      functions.push(`${sheetTranslate('Ctrl B.title')}: ${control_group_B}`);
    if (control_group_B2)
      functions.push(`${sheetTranslate('Ctrl B2.title')}: ${control_group_B2}`);

    const { control_groups, control } = output_control || {};
    if (!control_groups || control_groups.length === 0) {
      if (control === 'General control') {
        functions.push(
          sheetTranslate('Control groups') +
            ': ' +
            sheetTranslate('General control')
        );
      } else if (control === 'Local control') {
        functions.push(
          sheetTranslate('Control groups') +
            ': ' +
            sheetTranslate('Local control')
        );
      }
    } else {
      functions.push(
        sheetTranslate('Control groups') + ': ' + control_groups.join(', ')
      );
    }

    IOReport.push({
      Address: `${String(loop.number).padStart(3, '0')}.${String(device.number).padStart(3, '0')}`,
      Zone: device.zone,
      Description: device.description,
      'Input Function': device.input_function,
      'Output Function': device.output_control?.output_function,
      'Other Functions': functions.join(', '),
    });
  });

  return IOReport.filter(
    (el) =>
      !(
        (isNull(el['Input Function']) && isNull(el['Output Function'])) ||
        (el['Input Function'] === 'Not in use' &&
          isNull(el['Output Function'])) ||
        (el['Output Function'] === 'Not in use' &&
          isNull(el['Input Function'])) ||
        el['Input Function'] === 'Manual call point' ||
        el['Output Function'] === 'Manual call point'
      )
  );
};
