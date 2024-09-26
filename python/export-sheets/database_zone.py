import pandas as pd
import json

def process_json_to_excel(json_file_path, excel_file_path, sheet_name='database_zone'):
    try:
        # Read JSON file directly into DataFrame
        df_json = pd.read_json(json_file_path)
        # Extract zones data
        zones = df_json['system']['zones']
        structured_data = [{'Zone': zone['number'], 'Description': zone.get('description', '')} for zone in zones]

        # Open Excel file for writing
        with pd.ExcelWriter(excel_file_path, engine='openpyxl', mode='a') as writer:
            # Check if sheet exists
            if sheet_name in writer.book.sheetnames:
                startrow = writer.book[sheet_name].max_row
            else:
                startrow = 0
            
            # Convert structured data to DataFrame
            df = pd.DataFrame(structured_data)
            # Write DataFrame to Excel sheet
            df.to_excel(writer, sheet_name=sheet_name, index=False, startrow=startrow)

        return "Data has been successfully written to the Excel file."
    except Exception as e:
        return f"An error occurred: {str(e)}"
