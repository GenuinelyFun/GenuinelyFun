import { Panel } from '../interfaces/jsonDataInterface';
import { feetLanguages } from './utils';

export const mapPanelToExcel = (panel: Panel) => {
  const serialPort = panel.communication.serial_port1;
  const delayedAlarmOutputs = panel.delayed_alarm_outputs;
  const fireAlarmDevice: string =
    delayedAlarmOutputs?.delayed_outputs?.includes(
      'Fire alarm devices controlled by control groups A, B, B2 and as general',
    )
      ? 'Controlled by control groups A, B, B2 and as general'
      : delayedAlarmOutputs?.delayed_outputs?.includes(
            'Fire alarm devices controlled by control groups B, B2 and as general',
          )
        ? 'Controlled by control groups B, B2 and as general'
        : 'N/A';

  const activationConditions = panel.fire_door.activation;
  const sensorInputDisabled = () => {
    switch (panel.fire_door.sensor_input_disabled) {
      case 'Controls activated':
        return 'Fire door controls activated';
      case 'Controls activated and technical alarm when disabled input gives alarm':
        return 'Technical alarm when disabled input gives alarm + Fire door controls activated';
      default:
        return panel.fire_door.sensor_input_disabled;
    }
  };

  return {
    'Panel Number': panel.number,
    'Panel Name': panel.name,
    Description: panel.description,
    'Fire Expert ID': panel.uuid,
    'Visible Panels':
      panel.visible_panels !== undefined && panel.visible_panels.length > 0
        ? panel.visible_panels.join(', ')
        : 'No visible panels',
    'Primary language': feetLanguages[panel.primary_language],
    'Secondary language': feetLanguages[panel.secondary_language],
    'Assistant Processor Unit In Use': panel.assistant_processor_unit_in_use,
    'First Zone': panel.first_zone,
    'Number of Zones': panel.number_of_zones,
    'Last Local Control Group': panel.last_local_control_zone,
    'System 1 usage': panel.communication.system1?.usage,
    'System 1 baudrate': panel.communication.system1?.baudrate,
    'System 2 usage': panel.communication.system2?.usage,
    'System 2 baudrate': panel.communication.system2?.baudrate,
    'RS485 Usage': serialPort?.usage,
    'RS485 Baudrate': serialPort?.baudrate,
    'RS485 Mode': serialPort?.mode,
    'RS485 Description': serialPort?.description,
    'Delays: Delay T1': delayedAlarmOutputs?.delay_T1,
    'Delays: Delay T2': delayedAlarmOutputs?.delay_T2,
    'Delays: Fire alarm transmitter':
      delayedAlarmOutputs?.delayed_outputs?.includes('Fire alarm transmitter')
        ? 'Included in delayed outputs'
        : null,
    'Delays: Fire alarm devices': fireAlarmDevice,
    'Delays: Fire control outputs':
      delayedAlarmOutputs?.delayed_outputs?.includes('Fire control outputs')
        ? 'Included in delayed outputs'
        : null,
    'Delays: Terminate delay after 2nd delayed alarm':
      delayedAlarmOutputs?.terminate_delay_at_second.delayed_alarm,
    'Delays: Terminate delay after non-delayed alarm':
      delayedAlarmOutputs?.terminate_delay_at_second.non_delayed_alarm,
    'Delays: Indicate delayed alarm as disablement':
      delayedAlarmOutputs?.delayed_alarm_indication_as_disablement,
    'Fire Door: Fire Alarm': activationConditions.includes('Fire alarm'),
    'Fire Door: Pre Alarm': activationConditions.includes('Prealarm'),
    'Fire Door: Address Fault': activationConditions.includes('Address fault'),
    'Fire Door: Address Disablement': activationConditions.includes(
      'Address disablement',
    ),
    'Fire Door: Zone Disablement':
      activationConditions.includes('Zone disablement'),
    'Fire Door: Mains Off': activationConditions.includes('Mains off'),
    'Fire Door: Sensor Input Disabled': sensorInputDisabled(),
    'Fire Door: Reactivation of Silenced Alarm Devices by New Fire Alarm':
      panel.reactivation_of_silenced_alarm_devices_by_new_fire_alarm,
    'Fire Door: Deactivation of Alarm Routers at Alarm Silence':
      panel.deactivation_of_alarm_routers_at_alarm_silence,
    'Single coincidence alarm will not activate fire alarms after 3 min':
      panel.single_coincidence_alarm_will_not_activate_fire_alarm_after_3_min,
    'Single coincidence alarm autoreset time':
      panel.single_coincidence_alarm_autoreset_time,
    'Activate fire alarm by second coincidence alarm':
      panel.second_coincidence_alarm_activates_fire_alarm,
    'Configured pre-alarm': panel.prealarm_blink_rate
      ? 'Indicate with 0.25 Hz blink rate (2s on, 2s off)'
      : null,
    'Max. time of zonal disablement': panel.maximum_time_of_zonal_disablement,
    'Max. time of alarm device muting':
      panel.maximum_time_of_alarm_device_muting,
    'Day state level 6 of Multicriteria detectors':
      panel.day_mode_level_6_of_multicriteria_detectors_indicate_as_smoke_detection_disabled ||
      'N/A',
    'Muted internal buzzers':
      panel.muted_internal_buzzer_indicate_with_customer_led_1,
    'Maintenance interval in months': panel.maintenance_interval_in_months,
    'Maintenance interval message': panel.maintenance_interval_message,
    'Access level codes': panel.service_codes
      ? panel.service_codes.length > 0
        ? panel.service_codes.join(', ')
        : '5910,6010'
      : '5910,6010',
    'Main supply fault delay in minutes':
      panel.power_supply?.mains_off_fault_time,
    'Battery package monitoring':
      panel.power_supply?.battery_package_monitoring,
  };
};
