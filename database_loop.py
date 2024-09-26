import pandas as pd
import json

def process_json_to_excel(json_file_path, excel_file_path, sheet_name='database_loop'):
    try:
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)
        panels = json_data['system']['panels']
        structured_data = []
        for panel in panels:
            panel_number = panel['number']
            for loop_controller in panel.get('loop_controllers', []):
                loop_controller_type = loop_controller.get('type')
                loop_controller_number = loop_controller['number']
                for loop in loop_controller.get('loops', []):
                    loop_number = loop['number']
                    for device in loop.get('addresses', []):
                        # Process Control Groups
                        output_control = device.get('output_control', {})
                        control = output_control.get('control')
                        control_groups_value = None
                        if control == "Control groups":
                            control_groups_value = ",".join(map(str, output_control.get('control_groups', [])))
                        elif control in ["General control", "Local control"]:
                            control_groups_value = control

                        # Split Control Group C values into separate Group and Delay columns
                        control_group_C_values = {f'C{index + 1} Group': None for index in range(7)}
                        control_group_C_values.update({f'C{index + 1} Delay': None for index in range(7)})
                        for control_group_C in device.get('control_group_C', []):
                            index = control_group_C.get('number', 0) - 1
                            control_group_C_values[f'C{index + 1} Group'] = control_group_C.get('group')
                            control_group_C_values[f'C{index + 1} Delay'] = control_group_C.get('delay')

                        # Extract Alarm Thresholds values
                        alarm_thresholds = {threshold['name']: threshold['value'] for threshold in device.get('alarm_thresholds', [])}

                        # Extract Day Mode value
                        day_mode = device.get('in_day_mode', 'No day mode')

                        # Adjust Output External OR to return "Yes" for true and "No" for false
                        output_external_or = "Yes" if output_control.get('output_external_or', False) else "No"

                        # Adjust Short Circuit Monitoring to return "True" for TRUE and "False" for FALSE
                        short_circuit_monitoring = "True" if device.get('short_circuit_monitoring', False) else "False"

                        device_data = {
                            'Panel Number': panel_number,
                            'Loop Controller Type': loop_controller_type,
                            'Loop Controller Number': loop_controller_number,
                            'Loop Number': loop_number,
                            'Device Number': device['number'],
                            'Zone': device.get('zone'),
                            'Device ID': device.get('device_id'),
                            'Device Type': device['type'],
                            'Protocol Type': device.get('protocol_type'),
                            'Description': device.get('description'),
                            'Control Group A': device.get('control_group_A'),
                            'Control Group B': device.get('control_group_B'),
                            'Control Group B2': device.get('control_group_B2'),
                            **control_group_C_values,
                            'Alarm Thresholds Fire': alarm_thresholds.get('Fire'),
                            'Alarm Thresholds Prealarm': alarm_thresholds.get('Prealarm'),
                            'Alarm Thresholds Fire Day Mode': alarm_thresholds.get('Fire, day mode'),
                            'Alarm Thresholds Prealarm Day Mode': alarm_thresholds.get('Prealarm, day mode'),
                            'Day Mode': day_mode,
                            'Input Function': device.get('input_function'),
                            'Alarm Mode': ", ".join(device.get('alarm_mode', [])),
                            'Zone Disables': ", ".join(device.get('zone_disables', [])),
                            'Input Delay': device.get('input_delay'),
                            'Short Circuit Monitoring': short_circuit_monitoring,
                            'Output Function': output_control.get('output_function'),
                            'Output Function 2': output_control.get('output_function_2'),
                            'Control Groups': control_groups_value,
                            'Output External OR': output_external_or,
                            'Sounder Mode': device.get('sounder', {}).get('mode'),
                            'Sounder Tone': device.get('sounder', {}).get('tone'),
                            'Sounder Volume': device.get('sounder', {}).get('volume'),
                            'Sounder Alert Tone': device.get('sounder', {}).get('alert_tone'),
                        }
                        
                        structured_data.append(device_data)

        structured_df = pd.DataFrame(structured_data)
        with pd.ExcelWriter(excel_file_path, engine='openpyxl', mode='a') as writer:
            if sheet_name in writer.book.sheetnames:
                del writer.book[sheet_name]  # Delete existing sheet if it exists
            structured_df.to_excel(writer, index=False, sheet_name=sheet_name, columns=[
                'Panel Number',
                'Loop Controller Type',
                'Loop Controller Number',
                'Loop Number',
                'Device Number',
                'Zone',
                'Device ID',
                'Device Type',
                'Protocol Type',
                'Description',
                'Control Group A',
                'Control Group B',
                'Control Group B2',
                'C1 Group',
                'C1 Delay',
                'C2 Group',
                'C2 Delay',
                'C3 Group',
                'C3 Delay',
                'C4 Group',
                'C4 Delay',
                'C5 Group',
                'C5 Delay',
                'C6 Group',
                'C6 Delay',
                'C7 Group',
                'C7 Delay',
                'Day Mode',
                'Alarm Thresholds Fire',
                'Alarm Thresholds Prealarm',
                'Alarm Thresholds Fire Day Mode',
                'Alarm Thresholds Prealarm Day Mode',
                'Input Function',
                'Alarm Mode',
                'Zone Disables',
                'Input Delay',
                'Short Circuit Monitoring',
                'Output Function',
                'Output Function 2',
                'Control Groups',
                'Output External OR',
                'Sounder Mode',
                'Sounder Tone',
                'Sounder Volume',
                'Sounder Alert Tone'
            ])
        return "Data has been successfully written to the Excel file."
    except Exception as e:
        return f"An error occurred: {str(e)}"