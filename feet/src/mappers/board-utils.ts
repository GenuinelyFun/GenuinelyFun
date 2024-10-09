import { Panel } from '../interfaces/jsonDataInterface';

export const mapBoardToExcel = (panels: Panel[]) => {
  const boardExcel: Record<string, any>[] = [];
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
          Contact: item.contact,
          'Control Group A': item.control_group_A,
          'Control Group B': item.control_group_B,
          'Control Group B2': item.control_group_B2,
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
          'Control Group A': null,
          'Control Group B': null,
          'Control Group B2': null,
          'Control Groups':
            output_control.control === 'Control Groups'
              ? output_control.control_groups.join(', ')
              : ['General control', 'Local control'].includes(
                    output_control.control,
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
          'Control Group A': null,
          'Control Group B': null,
          'Control Group B2': null,
          'Control Groups':
            output_control.control === 'Control Groups'
              ? output_control.control_groups.join(', ')
              : ['General control', 'Local control'].includes(
                    output_control.control,
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
