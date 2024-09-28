export interface Root {
  created_by: CreatedBy;
  version: Version;
  system: System;
}

export interface CreatedBy {
  name: string;
}

export interface Version {
  number: number;
  schema: string;
  date: string;
}

export interface System {
  panels: Panel[];
  zones: Zone[];
  ntp_pool?: string[];
  timezone?: string;
}

export interface Panel {
  number: number;
  name: string;
  description: string;
  primary_language: string;
  secondary_language: string;
  loop_controllers: LoopController[];
  delayed_alarm_outputs: DelayedAlarmOutputs;
  input_output_units: InputOutputUnit[];
  power_supply: PowerSupply;
  fire_door: FireDoor;
  reactivation_of_silenced_alarm_devices_by_new_fire_alarm: boolean;
  deactivation_of_alarm_routers_at_alarm_silence: boolean;
  event_groups_recording: string[];
  single_coincidence_alarm_will_not_activate_fire_alarm_after_3_min: boolean;
  single_coincidence_alarm_autoreset_time: number;
  second_coincidence_alarm_activates_fire_alarm: string;
  prealarm_blink_rate: boolean;
  use_automatic_summertime: boolean;
  maximum_time_of_zonal_disablement: number;
  maximum_time_of_alarm_device_muting: number;
  muted_internal_buzzer_indicate_with_customer_led_1?: boolean;
  maintenance_interval_in_months: number;
  maintenance_interval_message?: string;
  first_zone: number;
  number_of_zones: number;
  communication: Communication;
  assistant_processor_unit_in_use: boolean;
  visible_panels?: number[];
  uuid: string;
  last_local_control_zone: number;
  day_mode_level_6_of_multicriteria_detectors_indicate_as_smoke_detection_disabled?: boolean;
}

export interface LoopController {
  type: string;
  number: number;
  loops: Loop[];
}

export interface Loop {
  number: number;
  addresses: Address[];
}

export interface Address {
  number: number;
  type: string;
  protocol_type: string;
  zone: number;
  input_function?: string;
  description?: string;
  zone_disables?: string[];
  output_control?: OutputControl;
  alarm_thresholds?: AlarmThreshold[];
  in_day_mode?: string;
  short_circuit_monitoring?: boolean;
  alarm_mode?: string[];
  control_group_A?: number;
  control_group_B?: number;
  control_group_B2?: number;
  control_group_C?: ControlGroupC[];
  device_id?: string;
  input_delay?: number;
  sounder?: Sounder;
}

export interface OutputControl {
  control: string;
  control_groups: number[];
  output_function: string;
  output_function_2?: string;
  output_external_or?: boolean;
  monitored_output_mode?: boolean;
  siren_control_output_mode?: boolean;
  output_mode?: string;
}

export interface AlarmThreshold {
  name: string;
  value: number;
}

export interface ControlGroupC {
  number: number;
  group: number;
  delay?: number;
}

export interface Sounder {
  mode: string;
  tone: number;
  volume: number;
  alert_tone: number;
}

export interface DelayedAlarmOutputs {
  delay_T1: number;
  delay_T2: number;
  terminate_delay_at_second: TerminateDelayAtSecond;
  delayed_outputs: string[];
  delayed_alarm_indication_as_disablement: boolean;
}

export interface TerminateDelayAtSecond {
  delayed_alarm: string;
  non_delayed_alarm: string;
}

export interface InputOutputUnit {
  number: number;
  type: string;
  clean_contact_inputs?: CleanContactInput[];
  clean_contact_outputs: MonitoredAndCleanContactOutput[];
  monitored_outputs?: MonitoredAndCleanContactOutput[];
}

export interface CleanContactInput {
  number: number;
  function: string;
  contact: string;
  monitored: boolean;
  control_group_A?: number;
  control_group_B?: number;
  control_group_B2?: number;
  description: string;
}

export interface MonitoredAndCleanContactOutput {
  //This is for CleanContactOutput AND MonitoredOutput
  number: number;
  description: string;
  output_control: OutputControl;
}

export interface PowerSupply {
  mains_off_fault_time: number;
  battery_package_monitoring?: number[];
}

export interface FireDoor {
  activation: string[];
  sensor_input_disabled: string;
}

export interface Communication {
  serial_port1?: SerialPort; // Panel Connections : RS485
  system1: System;
  system2: System;
}

export interface SerialPort {
  usage: string;
  baudrate: number;
  mode?: string;
  description: string;
}

export interface System {
  usage: string;
  baudrate: number;
}

export interface Zone {
  number: number;
  description: string;
}
