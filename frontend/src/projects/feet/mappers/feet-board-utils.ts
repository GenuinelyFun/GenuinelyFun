import { Panel } from '../interfaces/feetJsonDataInterface.ts';
import { sheetValueTypes } from './feet-utils.ts';

export const mapBoardToExcel = (panels: Panel[]) => {
  const boardExcel: Record<string, sheetValueTypes>[] = [];
  panels.forEach((panel) => {
    panel.input_output_units.forEach((board) => {
      board.clean_contact_inputs?.forEach((item) => {
        boardExcel.push({
          'Panel Number': panel.number,
          'Board Type': board.type,
          'Board Number': board.number,
          'Input Number': item.number,
          'Output Number': null,
          'Input/Output Type': 'Input',
          'Input Function': item.function,
          'Output Function': null,
          Description: item.description,
          Monitored: item.monitored ? 'Monitored' : 'Not monitored',
          'Contact.title':
            item.contact === 'NO'
              ? 'Normally open'
              : item.contact === 'NC'
                ? 'Normally closed'
                : item.contact,
          'Ctrl A.title': item.control_group_A,
          'Ctrl B.title': item.control_group_B,
          'Ctrl B2.title': item.control_group_B2,
          'Control Groups': null,
          'Output Mode': null,
        });
      });
      board.clean_contact_outputs?.forEach((item) => {
        const { output_control } = item;
        boardExcel.push({
          'Panel Number': panel.number,
          'Board Type': board.type,
          'Board Number': board.number,
          'Input Number': null,
          'Output Number': item.number,
          'Input/Output Type': 'Output',
          'Input Function': null,
          'Output Function': output_control.output_function,
          Description: item.description,
          Monitored: null,
          Contact: null,
          'Ctrl A.title': null,
          'Ctrl B.title': null,
          'Ctrl B2.title': null,
          'Control Groups':
            output_control.control === 'Control Groups'
              ? output_control.control_groups.join(', ')
              : ['General control', 'Local control'].includes(
                    output_control.control
                  )
                ? output_control.control
                : null,
          'Output Mode': output_control.output_mode,
        });
      });
      board.monitored_outputs?.forEach((item) => {
        const { output_control } = item;
        boardExcel.push({
          'Panel Number': panel.number,
          'Board Type': board.type,
          'Board Number': board.number,
          'Input Number': null,
          'Output Number': item.number,
          'Input/Output Type': 'Monitored Output',
          'Input Function': null,
          'Output Function': output_control.output_function,
          Description: item.description,
          Monitored: 'Monitored',
          Contact: null,
          'Ctrl A.title': null,
          'Ctrl B.title': null,
          'Ctrl B2.title': null,
          'Control Groups':
            output_control.control === 'Control Groups'
              ? output_control.control_groups.join(', ')
              : ['General control', 'Local control'].includes(
                    output_control.control
                  )
                ? output_control.control
                : null,
          'Output Mode': output_control.output_mode,
        });
      });
    });
  });

  return boardExcel;
};
