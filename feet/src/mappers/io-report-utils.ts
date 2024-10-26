import { Panel } from '../interfaces/jsonDataInterface';
import { forEachDeviceInLoopControllers } from './loop-utils';
import { sheetTranslate } from './utils';

const isNull = (el: any) => el === null || el === '' || el === undefined;

export const mapToIOReportToExcel = (panels: Panel[], language: string) => {
  const IOReport: Record<string, any>[] = [];

  panels.forEach((panel) => {
    panel.input_output_units.forEach((board) => {
      board.clean_contact_inputs?.forEach((input) => {
        const address = `${sheetTranslate('Panel', language)} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Input', language)} ${input.number}`;

        if (input.function === 'Not in use') {
          return;
        }
        const functions = [];
        if (input.control_group_A)
          functions.push(
            `${sheetTranslate('Ctrl A.title', language)}: ${input.control_group_A}`,
          );
        if (input.control_group_B)
          functions.push(
            `${sheetTranslate('Ctrl B.title', language)}: ${input.control_group_B}`,
          );
        if (input.control_group_B2)
          functions.push(
            `${sheetTranslate('Ctrl B2.title', language)}: ${input.control_group_B2}`,
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

      board.clean_contact_outputs
        .concat(board.monitored_outputs || [])
        .forEach((output) => {
          const address = `${sheetTranslate('Panel', language)} ${panel.number} - ${board.type} ${board.number} - ${sheetTranslate('Output', language)} ${output.number}`;
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
                sheetTranslate('Control groups', language) +
                  ': ' +
                  sheetTranslate('General control', language),
              );
            } else if (control === 'Local control') {
              otherFunctions.push(
                sheetTranslate('Control groups', language) +
                  ': ' +
                  sheetTranslate('Local control', language),
              );
            }
          } else {
            otherFunctions.push(
              sheetTranslate('Control groups', language) +
                ': ' +
                control_groups.join(', '),
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
        });
    });
  });

  forEachDeviceInLoopControllers(panels, (panel, loop, device) => {
    const {
      control_group_A,
      control_group_B,
      control_group_B2,
      output_control,
    } = device;
    const functions = [];
    if (control_group_A)
      functions.push(
        `${sheetTranslate('Ctrl A.title', language)}: ${control_group_A}`,
      );
    if (control_group_B)
      functions.push(
        `${sheetTranslate('Ctrl B.title', language)}: ${control_group_B}`,
      );
    if (control_group_B2)
      functions.push(
        `${sheetTranslate('Ctrl B2.title', language)}: ${control_group_B2}`,
      );

    const { control_groups, control } = output_control || {};
    if (!control_groups || control_groups.length === 0) {
      if (control === 'General control') {
        functions.push(
          sheetTranslate('Control groups', language) +
            ': ' +
            sheetTranslate('General control', language),
        );
      } else if (control === 'Local control') {
        functions.push(
          sheetTranslate('Control groups', language) +
            ': ' +
            sheetTranslate('Local control', language),
        );
      }
    } else {
      functions.push(
        sheetTranslate('Control groups', language) +
          ': ' +
          control_groups.join(', '),
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
      ),
  );
};
