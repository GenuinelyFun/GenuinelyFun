import pandas as pd
import json

def process_json_to_excel(json_file_path, excel_file_path, sheet_name='database_address_report'):
    try:
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)
        panels = json_data['system']['panels']
        structured_data = []
        for panel in panels:
            for loop_controller in panel.get('loop_controllers', []):
                for loop in loop_controller.get('loops', []):
                    loop_number = loop['number']
                    for device in loop.get('addresses', []):
                        # Format the "Address" column as "XXX.XXX"
                        address = f"{loop_number:03}.{device['number']:03}"
                        device_data = {
                            'Address': address,
                            'Device ID': device.get('device_id'),  # Add Device ID here
                            'Zone': device.get('zone'),
                            'Description': device.get('description'),
                            'Device Type': device['type'],
                            'Protocol Type': device.get('protocol_type'),
                        }
                        structured_data.append(device_data)

        structured_df = pd.DataFrame(structured_data)
        with pd.ExcelWriter(excel_file_path, engine='openpyxl', mode='a') as writer:
            if sheet_name in writer.book.sheetnames:
                del writer.book[sheet_name]  # Delete existing sheet if it exists
            structured_df.to_excel(writer, index=False, sheet_name=sheet_name)
        return "Data has been successfully written to the Excel file."
    except Exception as e:
        return f"An error occurred: {str(e)}"
