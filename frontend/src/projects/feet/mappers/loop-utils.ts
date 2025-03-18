import {
  Address,
  Loop,
  LoopController,
  Panel,
} from '../interfaces/feetJsonDataInterface.ts';
import { sheetTranslateType } from './utils.ts';

export const mapLoopToExcel = (
  loopControllers: LoopController,
  panel_number: number,
  sheetTranslate: sheetTranslateType
) => {
  const loopExcel = [];
  for (const loop of loopControllers.loops) {
    for (const device of loop.addresses) {
      const { alarm_thresholds, output_control, control_group_C } = device;

      loopExcel.push({
        'Panel Number': panel_number,
        'Loop.type.title': loopControllers.type,
        'Loop controller': loopControllers.number,
        'Loop.number.title': loop.number,
        'Device.number.title': device.number,
        Zone: device.zone,
        'DeviceId.title': device.device_id,
        'Type.title': device.type,
        'Protocol.type.title': device.protocol_type,
        Description: device.description,
        'Ctrl A.title': device.control_group_A,
        'Ctrl B.title': device.control_group_B,
        'Ctrl B2.title': device.control_group_B2,
        'Ctrl C1.title': control_group_C?.find((el) => el.number === 1)?.group,
        'Ctrl C1.title.delay': control_group_C?.find((el) => el.number === 1)
          ?.delay,
        'Ctrl C2.title': control_group_C?.find((el) => el.number === 2)?.group,
        'Ctrl C2.title.delay': control_group_C?.find((el) => el.number === 2)
          ?.delay,
        'Ctrl C3.title': control_group_C?.find((el) => el.number === 3)?.group,
        'Ctrl C3.title.delay': control_group_C?.find((el) => el.number === 3)
          ?.delay,
        'Ctrl C4.title': control_group_C?.find((el) => el.number === 4)?.group,
        'Ctrl C4.title.delay': control_group_C?.find((el) => el.number === 4)
          ?.delay,
        'Ctrl C5.title': control_group_C?.find((el) => el.number === 5)?.group,
        'Ctrl C5.title.delay': control_group_C?.find((el) => el.number === 5)
          ?.delay,
        'Ctrl C6.title': control_group_C?.find((el) => el.number === 6)?.group,
        'Ctrl C6.title.delay': control_group_C?.find((el) => el.number === 6)
          ?.delay,
        'Ctrl C7.title': control_group_C?.find((el) => el.number === 7)?.group,
        'Ctrl C7.title.delay': control_group_C?.find((el) => el.number === 7)
          ?.delay,
        'fireLevel.title': alarm_thresholds?.find((el) => el.name === 'Fire')
          ?.value,
        'prealarmLevel.title': alarm_thresholds?.find(
          (el) => (el.name = 'Prealarm')
        )?.value,
        'Day mode fire level.title': alarm_thresholds?.find(
          (el) => (el.name = 'Fire, day mode')
        )?.value,
        'Day mode prealarm level.title':
          alarm_thresholds?.find((el) => (el.name = 'Prealarm, day mode'))
            ?.value || 'N/A',
        'InputFunction.title': device.input_function,
        'AlarmMode.title': device.alarm_mode?.join(', '),
        'zoneDisables.title': device.zone_disables
          ?.map((item) => sheetTranslate(item))
          .join(', '),
        'Input delay.title': device.input_delay,
        'Input filter.title': device.input_filter,
        'Day mode.title': device.in_day_mode
          ? 'Day mode thresholds'
          : 'No day mode',
        'Short circuit is alarm.title': device.short_circuit_monitoring,
        'outputFunction.title': output_control?.output_function,
        'outputFunction2.title': output_control?.output_function_2,
        'Control groups.title':
          output_control?.control === 'Control groups'
            ? output_control.control_groups.join(', ')
            : ['General control', 'Local control'].includes(
                  output_control?.control || ''
                )
              ? output_control?.control
              : null,
        'ExternalOr.title': output_control?.output_external_or ? 'Yes' : 'No',
        'Sounder Mode': device.sounder?.mode,
        'Sounder,evacuation tones.title': device.sounder?.tone
          ? `p.sounder.primary${device.sounder.tone}`
          : undefined,
        'Sounder volume.title':
          device.sounder?.volume === 1
            ? 'Low'
            : device.sounder?.volume === 3
              ? 'High'
              : device.sounder?.volume,
        'Sounder,phased evacuation,alert tones.title':
          device.sounder?.alert_tone,
      });
    }
  }
  return loopExcel;
};

export const forEachDeviceInLoopControllers = (
  panels: Panel[],
  onDevice: (panel: Panel, loop: Loop, device: Address) => void
) => {
  panels.forEach((panel) => {
    panel.loop_controllers.forEach((loop_controller) => {
      loop_controller.loops.forEach((loop) => {
        loop.addresses.forEach((device) => {
          onDevice(panel, loop, device);
        });
      });
    });
  });
};
