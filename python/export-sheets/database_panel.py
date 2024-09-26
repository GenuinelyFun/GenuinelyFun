import pandas as pd
import json

# Language code to name mapping
language_mapping = {
    'cs': 'Czech',
    'da': 'Danish',
    'nl-NL': 'Dutch',
    'en': 'English',
    'et': 'Estonian',
    'fi': 'Finnish',
    'nl-BE': 'Flemish',
    'fr': 'French',
    'de': 'German',
    'hu': 'Hungarian',
    'it': 'Italian',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'nb': 'Norwegian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'es': 'Spanish',
    'sv': 'Swedish',
    'tr': 'Turkish',
}

def process_json_to_excel(json_file_path, excel_file_path, sheet_name='database_panel'):
    try:
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            json_data = json.load(json_file)

        structured_data = []
        for panel in json_data['system']['panels']:
            power_supply = panel.get('power_supply', {})
            mains_off_fault_time = power_supply.get('mains_off_fault_time', '')
            battery_package_monitoring = power_supply.get('battery_package_monitoring', '')
            if isinstance(battery_package_monitoring, list):
                battery_package_monitoring = ','.join(map(str, battery_package_monitoring))

            panel_number = panel.get('number', '')
            panel_name = panel.get('name', '')
            panel_description = panel.get('description', '')
            fire_expert_id = panel.get('uuid', '')
            primary_language = language_mapping.get(panel.get('primary_language', ''), '')
            secondary_language = language_mapping.get(panel.get('secondary_language', ''), '')
            
            assistant_processor_unit_in_use = panel.get('assistant_processor_unit_in_use', '')
            first_zone = panel.get('first_zone', '')
            number_of_zones = panel.get('number_of_zones', '')
            
            system1 = panel.get('communication', {}).get('system1', {})
            system2 = panel.get('communication', {}).get('system2', {})
            
            serial_port1 = panel.get('communication', {}).get('serial_port1', {})
            rs485_usage = serial_port1.get('usage', '')
            rs485_baudrate = serial_port1.get('baudrate', '')
            rs485_mode = serial_port1.get('mode', '')
            rs485_description = serial_port1.get('description', '')
            
            delayed_alarm_outputs = panel.get('delayed_alarm_outputs', {})
            delay_T1 = delayed_alarm_outputs.get('delay_T1', '')
            delay_T2 = delayed_alarm_outputs.get('delay_T2', '')
            fire_alarm_transmitter = 'Included in delayed outputs' if 'Fire alarm transmitter' in delayed_alarm_outputs.get('delayed_outputs', []) else ''
            fire_alarm_devices = 'Controlled by control groups A, B, B2 and as general' if 'Fire alarm devices controlled by control groups A, B, B2 and as general' in delayed_alarm_outputs.get('delayed_outputs', []) else ''
            fire_control_outputs = 'Included in delayed outputs' if 'Fire control outputs' in delayed_alarm_outputs.get('delayed_outputs', []) else ''
            terminate_delay_after_2nd_delayed_alarm = delayed_alarm_outputs.get('terminate_delay_at_second', {}).get('delayed_alarm', '')
            terminate_delay_after_non_delayed_alarm = delayed_alarm_outputs.get('terminate_delay_at_second', {}).get('non_delayed_alarm', '')
            indicate_delayed_alarm_as_disablement = delayed_alarm_outputs.get('delayed_alarm_indication_as_disablement', '')

            fire_door = panel.get('fire_door', {})
            activation_conditions = fire_door.get('activation', [])
            
            sensor_input_disabled_raw = fire_door.get('sensor_input_disabled', '')
            if sensor_input_disabled_raw == "Controls activated":
                sensor_input_disabled = "Fire door controls activated"
            elif sensor_input_disabled_raw == "Controls activated and technical alarm when disabled input gives alarm":
                sensor_input_disabled = "Technical alarm when disabled input gives alarm + Fire door controls activated"
            else:
                sensor_input_disabled = sensor_input_disabled_raw
            
            reactivation_of_silenced_alarm = panel.get('reactivation_of_silenced_alarm_devices_by_new_fire_alarm', False)
            deactivation_of_alarm_routers = panel.get('deactivation_of_alarm_routers_at_alarm_silence', False)
            
            last_local_control_group_number = panel.get('last_local_control_zone', '')

            single_coincidence_alarm = panel.get('single_coincidence_alarm_will_not_activate_fire_alarm_after_3_min', '')
            single_coincidence_alarm_autoreset_time = panel.get('single_coincidence_alarm_autoreset_time', '')
            second_coincidence_alarm_activates_fire_alarm = panel.get('second_coincidence_alarm_activates_fire_alarm', '')
            prealarm_blink_rate = panel.get('prealarm_blink_rate', '')
            configured_prealarm_indication = "Indicate with 0.25 Hz blink rate (2s on, 2s off)" if prealarm_blink_rate else ""

            max_time_of_zonal_disablement = panel.get('maximum_time_of_zonal_disablement', '')
            max_time_of_alarm_device_muting = panel.get('maximum_time_of_alarm_device_muting', '')

            day_state_level_6_of_multicriteria_detectors = panel.get('day_mode_level_6_of_multicriteria_detectors_indicate_as_smoke_detection_disabled', '')
            muted_internal_buzzers = panel.get('muted_internal_buzzer_indicate_with_customer_led_1', '')

            maintenance_interval_in_months = panel.get('maintenance_interval_in_months', '')
            maintenance_interval_message = panel.get('maintenance_interval_message', '')

            access_level_codes = ', '.join(map(str, panel.get('service_codes', []))) if panel.get('service_codes') else "5910,6010"

            visible_panels = panel.get('visible_panels', [])
            visible_panels_str = ','.join(map(str, visible_panels)) if visible_panels else "No visible panels"

            structured_data.append({
                'Panel Number': panel_number,
                'Panel Name': panel_name,
                'Description': panel_description,
                'Fire Expert ID': fire_expert_id,
                'Visible Panels': visible_panels_str,
                'Primary language': primary_language,
                'Secondary language': secondary_language,
                'Assistant Processor Unit In Use': assistant_processor_unit_in_use if assistant_processor_unit_in_use != 'N/A' else '',
                'First Zone': first_zone if first_zone != 'N/A' else '',
                'Number of Zones': number_of_zones if number_of_zones != 'N/A' else '',
                'System 1 usage': system1.get('usage', ''),
                'System 1 baudrate': system1.get('baudrate', ''),
                'System 2 usage': system2.get('usage', ''),
                'System 2 baudrate': system2.get('baudrate', ''),
                'RS485 Usage': rs485_usage,
                'RS485 Baudrate': rs485_baudrate,
                'RS485 Mode': rs485_mode,
                'RS485 Description': rs485_description,
                'Delays: Delay T1': delay_T1,
                'Delays: Delay T2': delay_T2,
                'Delays: Fire alarm transmitter': fire_alarm_transmitter,
                'Delays: Fire alarm devices': fire_alarm_devices,
                'Delays: Fire control outputs': fire_control_outputs,
                'Delays: Terminate delay after 2nd delayed alarm': terminate_delay_after_2nd_delayed_alarm,
                'Delays: Terminate delay after non-delayed alarm': terminate_delay_after_non_delayed_alarm,
                'Delays: Indicate delayed alarm as disablement': 'True' if indicate_delayed_alarm_as_disablement else 'False',
                'Fire Door: Fire Alarm': "True" if "Fire alarm" in activation_conditions else "False",
                'Fire Door: Pre Alarm': "True" if "Prealarm" in activation_conditions else "False",
                'Fire Door: Address Fault': "True" if "Address fault" in activation_conditions else "False",
                'Fire Door: Address Disablement': "True" if "Address disablement" in activation_conditions else "False",
                'Fire Door: Zone Disablement': "True" if "Zone disablement" in activation_conditions else "False",
                'Fire Door: Mains Off': "True" if "Mains off" in activation_conditions else "False",
                'Fire Door: Sensor Input Disabled': sensor_input_disabled,
                'Fire Door: Reactivation of Silenced Alarm Devices by New Fire Alarm': "True" if reactivation_of_silenced_alarm else "False",
                'Fire Door: Deactivation of Alarm Routers at Alarm Silence': "True" if deactivation_of_alarm_routers else "False",
                'Single coincidence alarm will not activate fire alarms after 3 min': 'True' if single_coincidence_alarm else 'False',
                'Single coincidence alarm autoreset time': single_coincidence_alarm_autoreset_time,
                'Activate fire alarm by second coincidence alarm': second_coincidence_alarm_activates_fire_alarm,
                'Configured pre-alarm': configured_prealarm_indication,
                'Max. time of zonal disablement': max_time_of_zonal_disablement,
                'Max. time of alarm device muting': max_time_of_alarm_device_muting,
                'Day state level 6 of Multicriteria detectors': 'True' if day_state_level_6_of_multicriteria_detectors else 'False',
                'Muted internal buzzers': 'True' if muted_internal_buzzers else 'False',
                'Maintenance interval in months': maintenance_interval_in_months,
                'Maintenance interval message': maintenance_interval_message,
                'Access level codes': access_level_codes,
                'Main supply fault delay in minutes': mains_off_fault_time,
                'Battery package monitoring': battery_package_monitoring,
            })

        structured_df = pd.DataFrame(structured_data)

        with pd.ExcelWriter(excel_file_path, engine='openpyxl') as writer:
            structured_df.to_excel(writer, index=False, sheet_name=sheet_name)

        return "Data has been successfully written to the Excel file."
    except FileNotFoundError:
        return f"File not found: {json_file_path} or {excel_file_path}"
    except Exception as e:
        return f"An error occurred: {str(e)}"