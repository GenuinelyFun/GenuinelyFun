import { LoopController } from '../interfaces/jsonDataInterface';

export const mapLoopToExcel = (
  loopControllers: LoopController,
  panel_number: number,
) => {
  const loopExcel = [];
  for (const loop of loopControllers.loops) {
    for (const device of loop.addresses) {
      const { alarm_thresholds, output_control, control_group_C } = device;

      loopExcel.push({
        'Panel Number': panel_number,
        'Loop Controller Type': loopControllers.type,
        'Loop Controller Number': loopControllers.number,
        'Loop Number': loopControllers.number,
        'Device Number': device.number,
        Zone: device.zone,
        'Device ID': device.device_id,
        'Device Type': device.type,
        'Protocol Type': device.protocol_type,
        Description: device.description,
        'Control Group A': device.control_group_A,
        'Control Group B': device.control_group_B,
        'Control Group B2': device.control_group_B2,
        'C1 Group': control_group_C?.find((el) => el.number === 1)?.group,
        'C1 Delay': control_group_C?.find((el) => el.number === 1)?.delay,
        'C2 Group': control_group_C?.find((el) => el.number === 2)?.group,
        'C2 Delay': control_group_C?.find((el) => el.number === 2)?.delay,
        'C3 Group': control_group_C?.find((el) => el.number === 3)?.group,
        'C3 Delay': control_group_C?.find((el) => el.number === 3)?.delay,
        'C4 Group': control_group_C?.find((el) => el.number === 4)?.group,
        'C4 Delay': control_group_C?.find((el) => el.number === 4)?.delay,
        'C5 Group': control_group_C?.find((el) => el.number === 5)?.group,
        'C5 Delay': control_group_C?.find((el) => el.number === 5)?.delay,
        'C6 Group': control_group_C?.find((el) => el.number === 6)?.group,
        'C6 Delay': control_group_C?.find((el) => el.number === 6)?.delay,
        'C7 Group': control_group_C?.find((el) => el.number === 7)?.group,
        'C7 Delay': control_group_C?.find((el) => el.number === 7)?.delay,
        'Alarm Thresholds Fire':
          alarm_thresholds?.find((el) => el.name === 'Fire')?.value || 'N/A',
        'Alarm Thresholds Prealarm':
          alarm_thresholds?.find((el) => (el.name = 'Prealarm')) || 'N/A',
        'Alarm Thresholds Fire Day Mode':
          alarm_thresholds?.find((el) => (el.name = 'Fire, day mode')) || 'N/A',
        'Alarm Thresholds Prealarm Day Mode':
          alarm_thresholds?.find((el) => (el.name = 'Prealarm, day mode')) ||
          'N/A',
        'Day Mode': device.in_day_mode || 'No day mode',
        'Input Function': device.input_function,
        'Alarm Mode': device.alarm_mode?.join(', ') || 'N/A',
        'Zone Disables': device.zone_disables?.join(', ') || 'N/A',
        'Input Delay': device.input_delay,
        'Short Circuit Monitoring': device.short_circuit_monitoring,
        'Output Function': output_control?.output_function || 'N/A',
        'Output Function 2': output_control?.output_function_2 || 'N/A',
        'Control Groups':
          output_control?.control === 'Control Groups'
            ? output_control.control_groups.join(', ')
            : ['General control', 'Local control'].includes(
                  output_control?.control || '',
                )
              ? output_control?.control
              : 'N/A',
        'Output External OR': output_control?.output_external_or ? 'Yes' : 'No',
        'Sounder Mode': device.sounder?.mode || 'N/A',
        'Sounder Tone': device.sounder?.tone || 'N/A',
        'Sounder Volume': device.sounder?.volume || 'N/A',
        'Sounder Alert Tone': device.sounder?.alert_tone || 'N/A',
      });
    }
  }
  return loopExcel;
};
