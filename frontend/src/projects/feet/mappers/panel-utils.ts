import { Panel, System } from '../feetJsonDataInterface.ts';
import { sheetTranslateType } from './utils.ts';

export const mapPanelToExcel = (
  system: System,
  panel: Panel,
  sheetTranslate: sheetTranslateType
) => {
  const serialPort = panel.communication?.serial_port1;
  const delayedAlarmOutputs = panel.delayed_alarm_outputs;
  const fireAlarmDevice: string =
    delayedAlarmOutputs?.delayed_outputs?.includes(
      'Fire alarm devices controlled by control groups A, B, B2 and as general'
    )
      ? 'configuration.panel.delays.controlledByABB2General'
      : delayedAlarmOutputs?.delayed_outputs?.includes(
            'Fire alarm devices controlled by control groups B, B2 and as general'
          )
        ? 'configuration.panel.delays.controlledByBB2General'
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
        : false,
    'Primary language': panel.primary_language,
    'Secondary language': panel.secondary_language,
    'First Zone': panel.first_zone,
    'Number of Zones': panel.number_of_zones,
    'Last Local Control Group': panel.last_local_control_zone,
    [sheetTranslate('System 1') + ' ' + sheetTranslate('Protocol')]:
      panel.communication?.system1?.usage,
    [sheetTranslate('System 1') + ' ' + sheetTranslate('Baud rate')]:
      panel.communication?.system1?.baudrate,
    [sheetTranslate('System 2') + ' ' + sheetTranslate('Protocol')]:
      panel.communication?.system2?.usage,
    [sheetTranslate('System 2') + ' ' + sheetTranslate('Baud rate')]:
      panel.communication?.system2?.baudrate,
    [sheetTranslate('RS485') + ' ' + sheetTranslate('Enable INFO')]:
      serialPort?.usage,
    [sheetTranslate('RS485') + ' ' + sheetTranslate('Baud rate')]:
      serialPort?.baudrate,
    [sheetTranslate('RS485') + ' ' + sheetTranslate('Monitor INFO')]:
      serialPort?.mode,
    [sheetTranslate('RS485') + ' ' + sheetTranslate('Description')]:
      serialPort?.description,
    [sheetTranslate('Delay') + ' ' + sheetTranslate('Reaction.time.T1')]:
      delayedAlarmOutputs?.delay_T1,
    [sheetTranslate('Delay') + ' ' + sheetTranslate('Action.time.T2')]:
      delayedAlarmOutputs?.delay_T2,
    [sheetTranslate('Delay') + ' ' + sheetTranslate('Fire.alarm.transmitter')]:
      delayedAlarmOutputs?.delayed_outputs?.includes('Fire alarm transmitter')
        ? 'True'
        : 'False',
    [sheetTranslate('Delay') + ' ' + sheetTranslate('Fire alarm devices')]:
      fireAlarmDevice,
    [sheetTranslate('Delay') + ' ' + sheetTranslate('Fire.control.outputs')]:
      delayedAlarmOutputs?.delayed_outputs?.includes('Fire control outputs')
        ? 'True'
        : 'False',
    [sheetTranslate('Delay') +
    ' ' +
    sheetTranslate('Terminate.delay.after.second.delayed.alarm')]:
      delayedAlarmOutputs?.terminate_delay_at_second.delayed_alarm,
    [sheetTranslate('Delay') +
    ' ' +
    sheetTranslate('Terminate.delay.after.non.delayed.alarm')]:
      delayedAlarmOutputs?.terminate_delay_at_second.non_delayed_alarm,
    [sheetTranslate('Delay') +
    ' ' +
    sheetTranslate('Indicate.delayed.alarm.as.disabled')]:
      delayedAlarmOutputs?.delayed_alarm_indication_as_disablement,
    [sheetTranslate('Fire door control') + ' ' + sheetTranslate('Fire alarm')]:
      activationConditions.includes('Fire alarm'),
    [sheetTranslate('Fire door control') + ' ' + sheetTranslate('Prealarm')]:
      activationConditions.includes('Prealarm'),
    [sheetTranslate('Fire door control') +
    ' ' +
    sheetTranslate('Address fault warning')]:
      activationConditions.includes('Address fault'),
    [sheetTranslate('Fire door control') +
    ' ' +
    sheetTranslate('Address disablement')]: activationConditions.includes(
      'Address disablement'
    ),
    [sheetTranslate('Fire door control') +
    ' ' +
    sheetTranslate('Detection zone disablement')]:
      activationConditions.includes('Zone disablement'),
    [sheetTranslate('Fire door control') +
    ' ' +
    sheetTranslate('Main power supply off')]:
      activationConditions.includes('Mains off'),
    [sheetTranslate('Fire door control') +
    ' ' +
    sheetTranslate('Sensor input disablement')]:
      sensorInputDisabled() === 'No control' ? false : sensorInputDisabled(),
    [sheetTranslate('Fire door control') +
    ' ' +
    sheetTranslate(
      'Re-activation of silenced alarm devices by a new fire alarm'
    )]: panel.reactivation_of_silenced_alarm_devices_by_new_fire_alarm,
    [sheetTranslate('Fire door control') +
    ' ' +
    sheetTranslate('De-activation of alarm routers at alarm silence')]:
      panel.deactivation_of_alarm_routers_at_alarm_silence,
    [sheetTranslate('Special alarms') +
    ' ' +
    sheetTranslate(
      'Single coincidence alarm will not activate fire alarms after 3 min'
    )]: panel.single_coincidence_alarm_will_not_activate_fire_alarm_after_3_min,
    [sheetTranslate('Special alarms') +
    ' ' +
    sheetTranslate('Activate fire alarm by second coincidence alarm')]:
      panel.second_coincidence_alarm_activates_fire_alarm,
    'Single coincidence alarm autoreset time':
      panel.single_coincidence_alarm_autoreset_time,
    [sheetTranslate('Special alarms') +
    ' ' +
    sheetTranslate('Configured prealarm')]: panel.prealarm_blink_rate
      ? sheetTranslate('Indicate with 0,25 Hz blink rate (2s on, 2s off)')
      : null,
    [sheetTranslate('configuration.tab.misc') +
    ' ' +
    sheetTranslate('Max. time of zonal disablement')]:
      panel.maximum_time_of_zonal_disablement,
    [sheetTranslate('configuration.tab.misc') +
    ' ' +
    sheetTranslate('Max. time of alarm device muting')]:
      panel.maximum_time_of_alarm_device_muting,
    [sheetTranslate('configuration.tab.misc') +
    ' ' +
    sheetTranslate('Day state level 6 of Multicriteria detectors')]:
      panel.day_mode_level_6_of_multicriteria_detectors_indicate_as_smoke_detection_disabled
        ? 'Indicate as Smoke Detection Disabled'
        : 'False',
    [sheetTranslate('configuration.tab.misc') +
    ' ' +
    sheetTranslate('Muted internal buzzers')]:
      panel.muted_internal_buzzer_indicate_with_customer_led_1
        ? 'Indicate with customer LED 1'
        : 'False',
    [sheetTranslate('configuration.tab.misc') +
    ' ' +
    sheetTranslate('Maintenance.interval.months')]:
      panel.maintenance_interval_in_months,
    [sheetTranslate('configuration.tab.misc') +
    ' ' +
    sheetTranslate('Maintenance.interval.message')]:
      panel.maintenance_interval_message,
    [sheetTranslate('configuration.tab.misc') +
    ' ' +
    sheetTranslate('Access level codes')]: panel.service_codes
      ? panel.service_codes.length > 0
        ? panel.service_codes.join(', ')
        : '5910,6010'
      : '5910,6010',
    [sheetTranslate('Power supply') +
    ' ' +
    sheetTranslate('Main supply fault delay')]:
      panel.power_supply?.mains_off_fault_time,
    [sheetTranslate('Power supply') +
    ' ' +
    sheetTranslate('Battery package monitoring')]:
      panel.power_supply?.battery_package_monitoring,
    'configuration.panel.assistantProcessorUnitInUse':
      panel.assistant_processor_unit_in_use,
    'Time Zone': system.timezone,
    'NTP Pool': system.ntp_pool?.join(', '),
  };
};
