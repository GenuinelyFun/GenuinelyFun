import json
import pandas as pd


def process_board_items(panel_number, board_type, board_number, board_items, item_type, structured_data):
    for item in board_items:
        address_suffix = 'Input' if item_type == 'input' else 'Output'
        function = None

        if item_type == 'output':
            output_control = item.get('output_control', {})
            function = output_control.get('output_function', '')

            # Adjustments to ensure output function gets a default value if empty
            control = output_control.get('control', '')
            if not function:  # If function is empty or not provided
                if control == "General control":
                    function = 'General reset output'  # Default for General control
                elif control == "Local control":
                    function = 'Fault warning router equipment output'  # Default for Local control
                elif control == "Control groups":
                    # Default for Control groups if function is not specified
                    # This can be adjusted if there are more specific rules for Control groups
                    function = 'Delayed fire alarm output' if 'monitored_output_mode' in output_control else 'Fire alarm device output'

        address = f"Panel {panel_number} - {board_type} {board_number} - {address_suffix} {item.get('number')}"

        if item_type == 'input':
            function = item.get('function', '')

        # Add control group information for MC, IOC, and OCA boards
        other_functions = []
        for control_group in ['A', 'B', 'B2']:
            key = f'control_group_{control_group}'
            if key in item:
                other_functions.append(f"Contr.{control_group} {item[key]}")
        if 'output_control' in item:
            control_groups = item['output_control'].get('control_groups', [])
            control = item['output_control'].get('control', '')
            if control_groups or control:
                if control == "General control" and not control_groups:
                    other_functions.append("Control groups general control")
                elif control == "Local control" and not control_groups:
                    other_functions.append("Control groups local control")
                elif control_groups:
                    control_groups_str = ", ".join(map(str, control_groups))
                    other_functions.append(f"Control groups {control_groups_str}")

        other_functions_str = ", ".join(other_functions)

        base_info = {
            'Address': address,
            'Description': item.get('description'),
            'Input Function': function if item_type == 'input' else None,
            'Output Function': function if item_type == 'output' else None,
            'Other Functions': other_functions_str
        }

        structured_data.append(base_info)


def process_json_to_excel(json_file_path, excel_file_path, sheet_name='database_io_report'):
    try:
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)

        structured_data_1 = []
        structured_data_2 = []

        # Process the first part of the JSON file
        for panel in json_data['system']['panels']:
            panel_number = panel.get('number')

            for board_type_key in ['input_output_units', 'loop_controllers']:
                if board_type_key in panel:
                    for board in panel[board_type_key]:
                        board_type = board.get('type')
                        board_number = board.get('number')

                        if 'clean_contact_inputs' in board:
                            process_board_items(panel_number, board_type, board_number, board['clean_contact_inputs'],
                                                'input', structured_data_1)
                        if 'clean_contact_outputs' in board or 'monitored_outputs' in board:
                            outputs = board.get('clean_contact_outputs', []) + board.get('monitored_outputs', [])
                            process_board_items(panel_number, board_type, board_number, outputs, 'output',
                                                structured_data_1)

        # Process the second part of the JSON file
        for panel in json_data['system']['panels']:
            for loop_controller in panel.get('loop_controllers', []):
                for loop in loop_controller.get('loops', []):
                    for device in loop.get('addresses', []):
                        address = f"{str(loop['number']).zfill(3)}.{str(device['number']).zfill(3)}"
                        zone = device.get('zone', '')
                        description = device.get('description', '')
                        input_function = device.get('input_function', '')
                        output_function = device.get('output_control', {}).get('output_function', '')

                        other_functions = []
                        for control_group in ['A', 'B', 'B2']:
                            key = f'control_group_{control_group}'
                            if key in device:
                                other_functions.append(f"Contr.{control_group} {device[key]}")

                        output_control = device.get('output_control', {})
                        control_groups = output_control.get('control_groups', [])
                        control = output_control.get('control', '')
                        if control_groups or control:
                            if control == "General control" and not control_groups:
                                other_functions.append("Control groups general control")
                            elif control == "Local control" and not control_groups:
                                other_functions.append("Control groups local control")
                            elif control_groups:
                                control_groups_str = ", ".join(map(str, control_groups))
                                other_functions.append(f"Control groups {control_groups_str}")

                        other_functions_str = ", ".join(other_functions)

                        structured_data_2.append({
                            'Address': address,
                            'Zone': zone,
                            'Description': description,
                            'Input Function': input_function,
                            'Output Function': output_function,
                            'Other Functions': other_functions_str
                        })

        # Combine data from both parts
        combined_structured_data = structured_data_1 + structured_data_2
        structured_df = pd.DataFrame(combined_structured_data)

        # Filtering rows based on the deletion rules
        conditions_to_delete = (
            # Both Input Function and Output Function are empty
                (structured_df['Input Function'].isnull() | structured_df['Input Function'].eq("")) &
                (structured_df['Output Function'].isnull() | structured_df['Output Function'].eq("")) |

                # One of the functions is empty and the other is 'Not in use'
                ((structured_df['Input Function'].isnull() | structured_df['Input Function'].eq("")) & structured_df[
                    'Output Function'].eq("Not in use")) |
                ((structured_df['Output Function'].isnull() | structured_df['Output Function'].eq("")) & structured_df[
                    'Input Function'].eq("Not in use")) |

                # Either Input Function or Output Function is 'Manual call point'
                structured_df['Input Function'].eq("Manual call point") |
                structured_df['Output Function'].eq("Manual call point")
        )

        # Apply filter to exclude rows based on conditions
        structured_df = structured_df[~conditions_to_delete]

        # Ensure all columns are in the DataFrame
        columns_order = ['Address', 'Zone', 'Description', 'Input Function', 'Output Function', 'Other Functions']
        for column in columns_order:
            if column not in structured_df.columns:
                structured_df[column] = ""
        structured_df = structured_df[columns_order]

        with pd.ExcelWriter(excel_file_path, engine='openpyxl', mode='a') as writer:
            if sheet_name in writer.book.sheetnames:
                startrow = writer.book[sheet_name].max_row
            else:
                startrow = 0

            structured_df.to_excel(writer, startrow=startrow, index=False, sheet_name=sheet_name)

        return f"Data has been successfully written to the Excel sheet '{sheet_name}'."
    except Exception as e:
        return f"An error occurred: {str(e)}"
