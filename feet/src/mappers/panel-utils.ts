import { Panel, System } from '../interfaces/jsonDataInterface';
import { feetLanguages, sheetTranslate } from './utils';

export const mapPanelToExcel = (
  system: System,
  panel: Panel,
  sheetLanguage: string,
) => {
  const serialPort = panel.communication.serial_port1;
  const delayedAlarmOutputs = panel.delayed_alarm_outputs;
  const fireAlarmDevice: string =
    delayedAlarmOutputs?.delayed_outputs?.includes(
      'Fire alarm devices controlled by control groups A, B, B2 and as general',
    )
      ? 'configuration.panel.delays.controlledByABB2General'
      : delayedAlarmOutputs?.delayed_outputs?.includes(
            'Fire alarm devices controlled by control groups B, B2 and as general',
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
        : 'No visible panels',
    'Primary language': feetLanguages[panel.primary_language],
    'Secondary language': feetLanguages[panel.secondary_language],
    'First Zone': panel.first_zone,
    'Number of Zones': panel.number_of_zones,
    'Last Local Control Group': panel.last_local_control_zone,
    [sheetTranslate('System 1', sheetLanguage) +
    ' ' +
    sheetTranslate('Protocol', sheetLanguage)]:
      panel.communication.system1?.usage,
    [sheetTranslate('System 1', sheetLanguage) +
    ' ' +
    sheetTranslate('Baud rate', sheetLanguage)]:
      panel.communication.system1?.baudrate,
    [sheetTranslate('System 2', sheetLanguage) +
    ' ' +
    sheetTranslate('Protocol', sheetLanguage)]:
      panel.communication.system2?.usage,
    [sheetTranslate('System 2', sheetLanguage) +
    ' ' +
    sheetTranslate('Baud rate', sheetLanguage)]:
      panel.communication.system2?.baudrate,
    [sheetTranslate('RS485', sheetLanguage) +
    ' ' +
    sheetTranslate('Enable INFO', sheetLanguage)]: serialPort?.usage,
    [sheetTranslate('RS485', sheetLanguage) +
    ' ' +
    sheetTranslate('Baudrate', sheetLanguage)]: serialPort?.baudrate,
    [sheetTranslate('RS485', sheetLanguage) +
    ' ' +
    sheetTranslate('Monitor INFO', sheetLanguage)]: serialPort?.mode,
    [sheetTranslate('RS485', sheetLanguage) +
    ' ' +
    sheetTranslate('Description', sheetLanguage)]: serialPort?.description,
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate('Reaction.time.T1', sheetLanguage)]:
      delayedAlarmOutputs?.delay_T1,
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate('Action.time.T2', sheetLanguage)]:
      delayedAlarmOutputs?.delay_T2,
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate('Fire.alarm.transmitter', sheetLanguage)]:
      delayedAlarmOutputs?.delayed_outputs?.includes('Fire alarm transmitter')
        ? 'True'
        : 'False',
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate('Fire alarm devices', sheetLanguage)]: fireAlarmDevice,
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate('Fire.control.outputs', sheetLanguage)]:
      delayedAlarmOutputs?.delayed_outputs?.includes('Fire control outputs')
        ? 'True'
        : 'False',
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate(
      'Terminate.delay.after.second.delayed.alarm',
      sheetLanguage,
    )]: delayedAlarmOutputs?.terminate_delay_at_second.delayed_alarm,
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate('Terminate.delay.after.non.delayed.alarm', sheetLanguage)]:
      delayedAlarmOutputs?.terminate_delay_at_second.non_delayed_alarm,
    [sheetTranslate('Delay', sheetLanguage) +
    ' ' +
    sheetTranslate('Indicate.delayed.alarm.as.disabled', sheetLanguage)]:
      delayedAlarmOutputs?.delayed_alarm_indication_as_disablement,
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate('Fire alarm', sheetLanguage)]:
      activationConditions.includes('Fire alarm'),
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate('Prealarm', sheetLanguage)]:
      activationConditions.includes('Prealarm'),
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate('Address fault warning', sheetLanguage)]:
      activationConditions.includes('Address fault'),
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate('Address disablement', sheetLanguage)]:
      activationConditions.includes('Address disablement'),
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate('Detection zone disablement', sheetLanguage)]:
      activationConditions.includes('Zone disablement'),
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate('Main power supply off', sheetLanguage)]:
      activationConditions.includes('Mains off'),
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate('Sensor input disablement', sheetLanguage)]:
      sensorInputDisabled() === 'No control' ? false : sensorInputDisabled(),
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate(
      'Re-activation of silenced alarm devices by a new fire alarm',
      sheetLanguage,
    )]: panel.reactivation_of_silenced_alarm_devices_by_new_fire_alarm,
    [sheetTranslate('Fire door control', sheetLanguage) +
    ' ' +
    sheetTranslate(
      'De-activation of alarm routers at alarm silence',
      sheetLanguage,
    )]: panel.deactivation_of_alarm_routers_at_alarm_silence,
    [sheetTranslate('Special alarms', sheetLanguage) +
    ' ' +
    sheetTranslate(
      'Single coincidence alarm will not activate fire alarms after 3 min',
      sheetLanguage,
    )]: panel.single_coincidence_alarm_will_not_activate_fire_alarm_after_3_min,
    [sheetTranslate('Special alarms', sheetLanguage) +
    ' ' +
    sheetTranslate(
      'Activate fire alarm by second coincidence alarm',
      sheetLanguage,
    )]: panel.second_coincidence_alarm_activates_fire_alarm,
    'Single coincidence alarm autoreset time':
      panel.single_coincidence_alarm_autoreset_time,
    [sheetTranslate('Special alarms', sheetLanguage) +
    ' ' +
    sheetTranslate('Configured prealarm', sheetLanguage)]:
      panel.prealarm_blink_rate
        ? sheetTranslate(
            'Indicate with 0,25 Hz blink rate (2s on, 2s off)',
            sheetLanguage,
          )
        : null,
    [sheetTranslate('configuration.tab.misc', sheetLanguage) +
    ' ' +
    sheetTranslate('Max. time of zonal disablement', sheetLanguage)]:
      panel.maximum_time_of_zonal_disablement,
    [sheetTranslate('configuration.tab.misc', sheetLanguage) +
    ' ' +
    sheetTranslate('Max. time of alarm device muting', sheetLanguage)]:
      panel.maximum_time_of_alarm_device_muting,
    [sheetTranslate('configuration.tab.misc', sheetLanguage) +
    ' ' +
    sheetTranslate(
      'Day state level 6 of Multicriteria detectors',
      sheetLanguage,
    )]:
      panel.day_mode_level_6_of_multicriteria_detectors_indicate_as_smoke_detection_disabled
        ? 'Indicate as Smoke Detection Disabled'
        : 'False',
    [sheetTranslate('configuration.tab.misc', sheetLanguage) +
    ' ' +
    sheetTranslate('Muted internal buzzers', sheetLanguage)]:
      panel.muted_internal_buzzer_indicate_with_customer_led_1
        ? 'Indicate with customer LED 1'
        : 'False',
    [sheetTranslate('configuration.tab.misc', sheetLanguage) +
    ' ' +
    sheetTranslate('Maintenance.interval.months', sheetLanguage)]:
      panel.maintenance_interval_in_months,
    [sheetTranslate('configuration.tab.misc', sheetLanguage) +
    ' ' +
    sheetTranslate('Maintenance.interval.message', sheetLanguage)]:
      panel.maintenance_interval_message,
    [sheetTranslate('configuration.tab.misc', sheetLanguage) +
    ' ' +
    sheetTranslate('Access level codes', sheetLanguage)]: panel.service_codes
      ? panel.service_codes.length > 0
        ? panel.service_codes.join(', ')
        : '5910,6010'
      : '5910,6010',
    [sheetTranslate('Power supply', sheetLanguage) +
    ' ' +
    sheetTranslate('Main supply fault delay', sheetLanguage)]:
      panel.power_supply?.mains_off_fault_time,
    [sheetTranslate('Power supply', sheetLanguage) +
    ' ' +
    sheetTranslate('Battery package monitoring', sheetLanguage)]:
      panel.power_supply?.battery_package_monitoring,
    'configuration.panel.assistantProcessorUnitInUse':
      panel.assistant_processor_unit_in_use,
    'Time Zone': system.timezone,
    'NTP Pool': system.ntp_pool?.join(', '),
  };
};
