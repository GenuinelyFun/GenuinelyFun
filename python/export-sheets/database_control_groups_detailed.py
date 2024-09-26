import pandas as pd
import numbers
import json
from re import split
from itertools import zip_longest

#COPIED FROM https://stackoverflow.com/questions/5967500/how-to-correctly-sort-a-string-with-a-number-inside
def atof(text):
    try:
        retval = float(text)
    except ValueError:
        retval = text
    return retval

def natural_keys(text):
    '''
    alist.sort(key=natural_keys) sorts in human order
    http://nedbatchelder.com/blog/200712/human_sorting.html
    (See Toothy's implementation in the comments)
    float regex comes from https://stackoverflow.com/a/12643073/190597
    '''
    return [ atof(c) for c in split(r'[+-]?([0-9]+(?:[.][0-9]*)?|[.][0-9]+)', text) ]

def iterate_multi(*lists):
    for i in range(min(map(len,lists))):
        yield tuple(l[i] for l in lists)

def group_list(lst, check):
    freq_dict = {}
    for el in lst:
        if el.get(check) in freq_dict:
            freq_dict[el.get(check)].append(el)
        else:
            freq_dict[el.get(check)] = [el]
    return freq_dict

def process_board_items(panel_number, board_type, board_number, board_items, item_type, data):
    for item in board_items:
        if item_type == 'Output':  # Output or Monitored Output
            output_control = item.get('output_control', {})
            if output_control.get('control_groups'): 
                for groups in output_control.get('control_groups'):
                    data.append({
                        'Control Groups': groups,
                        'Control Groups Address': f"Panel {panel_number} - {board_type} {board_number} - {item_type} {item.get('number')}",
                        'Control Groups Device ID': item.get('device_id'),
                        'Control Groups Zone': item.get('zone'),
                        'Control Groups Description': item.get('description'),
                        'Control Groups Device Type': item.get('type'),
                        'Control Groups Protocol Type': item.get('protocol_type'),
                    })
            if output_control.get('control') in ['General control', 'Local control']:
                control = "Control groups local control" if output_control.get('control') == 'Local control' else "Control groups general control"
                if control == "Control groups local control":
                    print("Are there any local boards?")
                data.append({
                        'Control Groups': control,
                        'Control Groups Address': f"Panel {panel_number} - {board_type} {board_number} - {item_type} {item.get('number')}",
                        'Control Groups Device ID': item.get('device_id'),
                        'Control Groups Zone': item.get('zone'),
                        'Control Groups Description': item.get('description'),
                        'Control Groups Device Type': item.get('type'),
                        'Control Groups Protocol Type': item.get('protocol_type'),
                    })
        elif item_type == 'Input':

            #TODO NGHI ARTHUR ignoring for now because Kuben.json has ZERO control_group_C values
            # contr.C1 1:60
            """ if item.get('control_group_C'):
                for c in item.get('control_group_C'):
                    print(c) """
            control_group_ABB2 = item.get('control_group_A') or item.get('control_group_B') or item.get('control_group_B2')

            data.append({
                'Control Group': control_group_ABB2,
                'Address': f"Panel {panel_number} - {board_type} {board_number} - {item_type} {item.get('number')}",
                'Device ID': item.get('device_id'),
                'Zone': item.get('zone'),
                'Description': item.get('description'),
                'Device Type': item.get('type'),
                'Protocol Type': item.get('protocol_type'),
            })


def process_json_to_excel(json_file_path, excel_file_path, sheet_name='Control Groups'):
    try:
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)
        
        panels = json_data['system']['panels']
        
        inputs = []
        loop_outputs = []
        board_outputs = []
        structured_data = []


        # Process the data from panels
        for panel in panels:
            panel_number = panel['number']
            #io report address panel
            for board_type_key in ['input_output_units', 'loop_controllers']:
                if board_type_key in panel:
                    for board in panel[board_type_key]:
                        board_type = board.get('type')
                        board_number = board.get('number')
                        
                        if 'clean_contact_inputs' in board:
                            process_board_items(panel_number, board_type, board_number, board['clean_contact_inputs'], 'Input', inputs)
                        if 'clean_contact_outputs' in board or 'monitored_outputs' in board:
                            board_items = board.get('clean_contact_outputs', []) + board.get('monitored_outputs', [])
                            process_board_items(panel_number, board_type, board_number, board_items, 'Output', board_outputs)
                        
    
        #Control Group: Loop Control groups A; B; B2; C1-7
            for loop_controller in panel.get('loop_controllers', []):
                for loop in loop_controller.get('loops', []):
                    for device in loop.get('addresses', []):
                        #Address: Loop number.device number
                        loop_address = f"{str(loop['number']).zfill(3)}.{str(device['number']).zfill(3)}"

                        #Control Group ABB2: from loop
                        control_group_ABB2 = [device.get('control_group_A'), device.get('control_group_B'), device.get('control_group_B2')] #TODO NGHI this list CAN have C but Kuben doesnt
                        control_group_ABB2 = [love for love in control_group_ABB2 if love is not None]
                        #Control groups: io-report control_groups separated
                        output_control = device.get('output_control', {})
                        control_groups = output_control.get('control_groups', [])
                        control = output_control.get('control', '')
                    
                        if control_group_ABB2: #THESE ARE LOOP INPUTS
                            for group in control_group_ABB2:
                                inputs.append({
                                    'Control Group': group,
                                    'Address': loop_address,
                                    'Device ID': device.get('device_id'),
                                    'Zone': device.get('zone'),
                                    'Description': device.get('description'),
                                    'Device Type': device['type'],
                                    'Protocol Type': device.get('protocol_type'),
                                })
                        elif control_groups or control: #THESE ARE LOOP OUTPUTS
                            if control == "General control" and not control_groups:
                                #for item in [s for s in inputs if s.get('Control Group') == 'General control']:
                                loop_outputs.append({
                                    'Control Groups': "Control groups general control",
                                    'Control Groups Address': loop_address,
                                    'Control Groups Device ID': device.get('device_id'),
                                    'Control Groups Zone': device.get('zone'),
                                    'Control Groups Description': device.get('description'),
                                    'Control Groups Device Type': device['type'],
                                    'Control Groups Protocol Type': device.get('protocol_type'),
                                })
                            elif control == "Local control" and not control_groups:
                                #for item in [s for s in inputs if s.get('Control Group') == group]:
                                loop_outputs.append({
                                    'Control Groups': "Control groups local control",
                                    'Control Groups Address': loop_address,
                                    'Control Groups Device ID': device.get('device_id'),
                                    'Control Groups Zone': device.get('zone'),
                                    'Control Groups Description': device.get('description'),
                                    'Control Groups Device Type': device['type'],
                                    'Control Groups Protocol Type': device.get('protocol_type'),
                                })
                            elif control_groups:
                                #control_groups_str = ", ".join(map(str, control_groups))
                                for group in control_groups:
                                    #for item in [s for s in inputs if s.get('Control Group') == group]:
                                    loop_outputs.append({
                                        'Control Groups': group,
                                        'Control Groups Address': loop_address,
                                        'Control Groups Device ID': device.get('device_id'),
                                        'Control Groups Zone': device.get('zone'),
                                        'Control Groups Description': device.get('description'),
                                        'Control Groups Device Type': device['type'],
                                        'Control Groups Protocol Type': device.get('protocol_type'),
                                    })

            panel_inputs =  [love for love in inputs if "Panel" in love['Address']]
            number_inputs = [love for love in inputs if "Panel" not in love['Address']]
            panel_inputs = sorted(panel_inputs, key=lambda dict: dict['Address'])
            number_inputs = sorted(number_inputs, key=lambda dict: dict['Address'] )
            inputs = panel_inputs + number_inputs
            #inputs += panel_inputs
            #loop_outputs += panel_output

            #loop_outputs.append(panel_outputs)
        #for item in [s for s in inputs if s.get('Control Group') == group]:
        sorted_inputs = sorted(inputs, key=lambda dict: dict['Control Group'] if isinstance(dict['Control Group'], numbers.Number) else 10000)
        sorted_outputs = sorted(board_outputs + loop_outputs, key=lambda dict: dict['Control Groups'] if isinstance(dict['Control Groups'], numbers.Number) else 10000)

        #TODO NGHI this might not always be correct if there are more outputs than inputs
        input_numbers = group_list([i for i in sorted_inputs if i.get('Control Group') not in ['Control groups general control', "Control groups local control"]], 'Control Group')
        output_numbers = group_list([o for o in sorted_outputs if o.get('Control Groups') not in ['Control groups general control', "Control groups local control"]], 'Control Groups')
        input_keys = [key for key in input_numbers]
        output_keys = [key for key in output_numbers]
        #print(input_keys + list(set(output_keys) - set(input_keys)))
        #print(list(input_numbers.keys()) + list(output_numbers.keys()))
        for group in (input_keys + list(set(output_keys) - set(input_keys))):
            #print([o for o in sorted_outputs if o.get('Control Groups') == group])
            if input_numbers.get(group) and output_numbers.get(group):
                for input, output in zip_longest(input_numbers.get(group), output_numbers.get(group)):#[o for o in sorted_outputs if o.get('Control Groups') == group]):
                    if input and output:
                        structured_data.append({**input, **output})
                    elif input:
                        structured_data.append(input)
                    elif output:
                        structured_data.append(output)
            elif input_numbers.get(group) and not output_numbers.get(group):
                structured_data.append(*input_numbers.get(group))
            elif output_numbers.get(group) and not input_numbers.get(group):
                structured_data.append(*output_numbers.get(group))
        



        #for input, output  in iterate_multi([i for i in sorted_inputs if i.get('Control Group') not in ['Control groups general control', "Control groups local control"]], [o for o in sorted_outputs if o.get('Control Groups') == input.get('Control Group')]):
            #curlist = [o for o in sorted_outputs if o.get('Control Groups') == input.get('Control Group')]
                #print(curlist[index])
        """ if curlist[index] is not None:
                    if input and curlist[index]:
                        structured_data.append({**input, **curlist[index]})
                        continue
                else:
                    structured_data.append(input) """

        for input, output in zip_longest([i for i in sorted_inputs if i.get('Control Group') == 'Control groups general control'], [o for o in sorted_outputs if o.get('Control Groups') == 'Control groups general control']):

            if input and output:
                structured_data.append({**input, **output})
            elif input:
                structured_data.append(input)
            elif output:
                structured_data.append(output)        

        for input, output in zip_longest([i for i in sorted_inputs if i.get('Control Group') == 'Control groups local control'], [o for o in sorted_outputs if o.get('Control Groups') == 'Control groups local control']):

            if input and output:
                structured_data.append({**input, **output})
            elif input:
                structured_data.append(input)
            elif output:
                structured_data.append(output)        
        """ for input in [i for i in sorted_inputs if i.get('Control Group') not in ['Control groups general control', "Control groups local control"]]:
            for output in [o for o in sorted_outputs if o.get('Control Groups') == input.get('Control Group')]:
                structured_data.append({**input, **output})
        for input in [i for i in sorted_inputs if i.get('Control Group') == 'Control groups general control']:
            for output in [o for o in sorted_outputs if o.get('Control Groups') == 'Control groups general control']:
                structured_data.append({**input, **output})
        for input in [i for i in sorted_inputs if i.get('Control Group') == 'Control groups local control']:
            for output in [o for o in sorted_outputs if o.get('Control Groups') == 'Control groups local control']:
                structured_data.append({**input, **output}) """



        """ for input, output in zip_longest(sorted_inputs, sorted_outputs):
            if output:
                structured_data.append({**input, **output})
            else:
                structured_data.append(input)
        print('post') """
            

        #if found_one == False:
            #structured_data.append(input)
            

        #sorted_data = sorted(structured_data, key=lambda dict: dict['Control Groups'] if isinstance(dict['Control Groups'], not numbers.Number) else 10000)
        #sorted_data = sorted(structured_data, key=lambda dict: dict.get('Control Group', 10000) if isinstance(dict.get('Control Group', 10000), numbers.Number) else 10000)
        
        #combined_data = sorted_inputs + sorted_outputs
        structured_df = pd.DataFrame(structured_data) 
        # Write the DataFrame to an Excel file
        with pd.ExcelWriter(excel_file_path, engine='openpyxl', mode='a') as writer:
            if sheet_name in writer.book.sheetnames:
                del writer.book[sheet_name]  # Delete existing sheet if it exists

            # Writing the DataFrame to the specified sheet
            structured_df.to_excel(writer, index=False, sheet_name=sheet_name)

        return f"Data has been successfully written to the Excel sheet '{sheet_name}'."
    except Exception as e:
        return f"An error occurred: {str(e)}"