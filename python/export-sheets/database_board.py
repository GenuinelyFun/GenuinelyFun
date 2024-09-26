import pandas as pd
import json

def process_json_to_excel(json_file_path, excel_file_path, sheet_name='database_board'):
    def process_board_items(panel_number, board_type, board_number, board_items, item_type):
        for item in board_items:
            base_info = {
                'Panel Number': panel_number,
                'Board Type': board_type,
                'Board Number': board_number,
                'Input Number': None,
                'Output Number': None,
                'Input/Output Type': None,
                'Input Function': None,
                'Output Function': None,
                'Description': item.get('description'),
                'Monitored': None,
                'Contact': None,
                'Control Group A': None,
                'Control Group B': None,
                'Control Group B2': None,
                'Control Groups': None,
                'Output Mode': None
            }
            if item_type == 'input':
                base_info.update({
                    'Input Number': item.get('number'),
                    'Input/Output Type': 'Input',
                    'Input Function': item.get('function'),
                    'Monitored': "Monitored" if item.get('monitored') else "Not monitored" if item.get('monitored') is not None else None,
                    'Contact': item.get('contact'),
                    'Control Group A': item.get('control_group_A'),
                    'Control Group B': item.get('control_group_B'),
                    'Control Group B2': item.get('control_group_B2')
                })
            else:  # Output or Monitored Output
                output_control = item.get('output_control', {})
                control_groups_value = None
                if output_control.get('control') == 'Control groups' and output_control.get('control_groups'):
                    control_groups_value = ', '.join(map(str, output_control.get('control_groups')))
                elif output_control.get('control') in ['General control', 'Local control']:
                    control_groups_value = output_control.get('control')

                base_info.update({
                    'Output Number': item.get('number'),
                    'Input/Output Type': 'Output' if item_type == 'output' else 'Monitored Output',
                    'Output Function': output_control.get('output_function'),
                    'Output Mode': output_control.get('output_mode'),
                    'Monitored': "Monitored" if item_type == 'monitored_output' else None,
                    'Control Groups': control_groups_value
                })
            structured_data.append(base_info)
    
    try:
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)
        
        structured_data = []
        for panel in json_data['system']['panels']:
            panel_number = panel.get('number')

            for board_type_key in ['input_output_units', 'loop_controllers']:
                if board_type_key in panel:
                    for board in panel[board_type_key]:
                        board_type = board.get('type')
                        board_number = board.get('number')
                        
                        # Process inputs and outputs
                        if 'clean_contact_inputs' in board:
                            process_board_items(panel_number, board_type, board_number, board['clean_contact_inputs'], 'input')
                        for output_type in ['clean_contact_outputs', 'monitored_outputs']:
                            if output_type in board:
                                item_type = 'output' if output_type == 'clean_contact_outputs' else 'monitored_output'
                                process_board_items(panel_number, board_type, board_number, board[output_type], item_type)

        structured_df = pd.DataFrame(structured_data)
        with pd.ExcelWriter(excel_file_path, engine='openpyxl', mode='a') as writer:
            if sheet_name in writer.book.sheetnames:
                writer.book.remove(writer.book[sheet_name])  # Remove existing sheet if it exists
            structured_df.to_excel(writer, index=False, sheet_name=sheet_name)
        return "Data has been successfully written to the Excel file."
    except Exception as e:
        return f"An error occurred: {str(e)}"
