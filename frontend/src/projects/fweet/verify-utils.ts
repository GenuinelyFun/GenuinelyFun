import { Database } from 'sql.js';

import { FweetFile } from '../../utils/data-utils.ts';

export enum TABLENAMES {
  AddEEprom = 'AddEEprom',
  AddrUnit = 'AddrUnit',
  AlZone = 'AlZone',
  AssignedLed = 'AssignedLed',
  Cause = 'Cause',
  Circuit = 'Circuit',
  DetToAlZone = 'DetToAlZone',
  Effect = 'Effect',
  IoCircuit = 'IoCircuit',
  IQ8Setup = 'IQ8Setup',
  Led = 'Led',
  LogBook = 'LogBook',
  Mp3Files = 'Mp3Files',
  Mp3Lib = 'Mp3Lib',
  Pager = 'Pager',
  Panel = 'Panel',
  PartList = 'PartList',
  PropAnx = 'PropAnx',
  PropDa = 'PropDa',
  PropIts = 'PropIts',
  PropOp = 'PropOp',
  PropRep = 'PropRep',
  Site = 'Site',
  SMS = 'SMS',
  sqlite_master = 'sqlite_master',
  sqlite_sequence = 'sqlite_sequence',
  tmpLogicTable = 'tmpLogicTable',
  VcuMessage = 'VcuMessage',
  VcuProperties = 'VcuProperties',
  Zone = 'Zone',
}

export enum AddrUnitType {
  ESGEN = 'Not defined type',
  IQSSMO = 'IQ8Quad Smoke detector (O/So)',
  IQFO2T = 'IQ8Quad Multi Sensor (O2T/F)',
  IQSO2T = 'IQ8Quad Multi Sensor (O2T/So)',
  IQVSFO2T = 'IQ8Quad Multi Sensor (O2T/FSp)',
  IQSAL = 'IQ8Alarm/So',
  IQVSFAL = 'IQ8Alarm/FSp',
  IQFAL = 'IQ8Alarm/F',
  IQSFAL = 'IQ8Alarm/FSo',
  ESO2T = 'Multi Sensor Optic/Optic/Temp (O2T)',
  ESOTI = 'Multi Sensor Optic/Temp/Ion (OTI)',
  ESOT = 'Multi Sensor Optic/Temp (OT)',
  ESOTB = 'Multi Sensor Optic Blue/Temp',
  ESOTG = 'Multi Sensor Optic/Temp/CO (OTG)',
  ESMC = 'Manual Call Point',
  ESSMOPT = 'Smoke detector - Optical',
  ESSMIO = 'Smoke detector - Ionization',
  ESTM = 'Heat detector (TM)',
  ESTME = 'Heat Det (TME) - Obsolete!',
  ESTD = 'Heat detector - Rise (TD)',
  ESIQTAL = 'IQ8TAL/FCT 1in/1out MCP typecode',
  ESIQTALO = 'IQ8TAL/FCT 1in/1out Opt typecode',
  ESIQTALH = 'IQ8TAL/FCT 1in/1out Heat typecode',
  ESIQTALD = 'IQ8TAL/FCT 1in/1out Delayed',
  ESIQTALS = 'IQ8TAL/FCT 1in/1out Sprinkler Delay',
  ESIQTALI = 'IQ8TAL/FCT Isolation Unit',
  ESIQTALP = 'IQ8TAL/FCT Digital Input',
  ESIQTALE = 'IQ8TAL/FCT Emergency Light',
  ESIO12 = 'Transponder - 12 Relay',
  ESIOLED = 'Transponder - 32 Led',
  ESZM1G = 'Transponder - 1 input',
  ESIO4G2R = 'Transponder - 4 zones, 2 outputs',
  ESIOMM = 'Transponder - 4 zones, 2 outp MCP',
  ESTAL = 'Technical Alarm Module (TAM/TAL)',
  ESTALBDI = 'TAM Beam Interface/Optical type code',
  ESTALSPR = 'Sprinkler Control Box (TAM/TAL)',
  ESIOSPR = 'Spinkler Guard Specialized (4Z2R)',
  ESASARD2 = 'Aspiration (ARD 2)',
  ESIOASP = 'Aspiration (4Z2R)',
  ESIORU = 'Reset Unit',
  ESTETEC = 'Technical detector',
  ESTEGAS = 'Gas detector',
  ESTEBUR = 'Burglar Detector',
  ESWLGW = 'Wireless Gateway',
  ESIOWLT = 'Wireless Transponder',
  ESEMLIZM = 'Emergency Light Monitor',
  ESIOELMM = 'Main Monitor LP',
  ESELLPEX = 'ExiLED LP',
  ESELLPOM = 'OmniLED/OvaLED LP',
  ESREM = 'Unit is removed',
  XPEMLITM = 'Emergency Light Test Monitor',
  XPEMLI = 'Emergency Light',
  XPEMLIZM = 'Emergency Light Monitor',
  XPEMLIAT = 'Emergency Light w/ATSD',
  XPEMLILA = 'Emergency Light LS w/ATSD',
  XPEMLILM = 'Mains Monitor',
  XPREM = 'Unit is removed',
  XPHEAT = 'Heat detector',
  XPSMIO = 'Smoke detector - Ionization',
  XPSMOPT = 'Smoke detector - Optical',
  XPMC = 'Manual Call Point',
  XPASPIR = 'Aspiration detector',
  XPZM = 'Zone Monitor Unit',
  XPBEAM = 'Beam detector',
  XPFLAME = 'Flame detector',
  XPSWMO = 'Switch Monitor',
  XPSPR = 'Sprinkler control box',
  S9TEGAS = 'Gas detector',
  DISMOPT = 'Smoke detector - Optical',
  DIOT = 'Multi Sensor Optic/Heat (OT)',
  DIIO = 'I/O Unit',
  DIREM = 'Unit is removed',
  DIHEAT = 'Heat detector',
  S9ASPIR = 'Aspiration detector',
  S9ZM = 'Zone Monitor Unit',
  XPGEN = 'XPGEN',
  XPIO = 'I/O Unit',
}

export const ADDRUNIT_USED_COLUMNS = [
  'Id',
  'UnitNo',
  'CircuitId',
  'CircuitNo',
  'Type',
  'Name',
  'Description',
];

export enum PanelType {
  DELOP = 'Delta DA OP',
  DEDAP = 'Delta Da Quad+',
  DEDAE = 'Delta DA Esser',
  DEDAM = 'Delta DA EL Specter',
  DEDAI = 'Delta DA Quad',
  DEREP = 'DELTA Repeater',
  PANEL = 'Anx 95e',
  ANX95 = 'Anx 95',
  ANX90 = 'Anx 90',
  DEDAS = 'Delta DA/E/Q Slave Panel',
  DELDA = 'Delta DA',
}

export const PANEL_COLUMNS = [
  'Id',
  'Number',
  'SlaveOn',
  'FirstMaster',
  'SlaveLevel',
  'Type',
  'Name',
  'SerialNumber',
  'SwVersion',
  'Language',
  'Country',
  'LastDownload',
  'EepromSize',
  'Description',
  'ExpCard',
  'Its2Card',
  'MimicPanel',
  'SmsSiteText',
  'SmsScaAdress',
  'SmsPinCode',
  'SmsCard',
  'SmsHBFreq',
  'SmsHBStartDay',
  'First',
];

export const LOGBOOK_COLUMNS = [
  'Id',
  'Date',
  'Heading',
  'Description',
  'UserName',
];

export const CIRCUIT_COLUMNS = [
  'Id',
  'Number',
  'PanelId',
  'Type',
  'OutputType',
  'Name',
  'TBNumber',
  'Delayed',
  'Delay',
  'AbsDelay',
  'NoHotelDelay',
  'MaxAlarms',
  'MaxLeds',
  'OCLimit',
  'Description',
  'Priority',
  'Led',
  'Mp3Num',
  'ActivateZones',
  'ActivatePreSel',
  'VCUSwitchOut',
  'DelayOptions',
  'ModbusCoil',
  'NightIsolation',
  'FaultLed',
  'EvacuateLed',
  'SectionSynch',
  'SectionState',
  'ButtonItemId',
  'Options',
];

export enum CircuitOutputType {
  NU = 'Not in use (0)',
  FAN = 'Fan (1) Anx 95/Delta',
  DOOR = 'Door Magnets (2)',
  FIRE = 'Alarm Transmitter (3)',
  FAULTSO = 'Fault Device (4)',
  FIRESO = 'Alarm Device (5)',
  FAULT = 'Fault (6)',
  PREAL = 'Pre-alarm (9)',
  ISOLATE = 'Loop/Detector Isolation',
  FIREMC = 'Manuall Call Points (11)',
  '2DET' = 'Double Knock (12)',
  PREALSO = 'Pre-alarm Device (13)',
  ATSD = 'New Circuit',
  ATSDTEST = 'New Circuit',
  PULS = 'Single Pulse (0.8s) (14)',
  ANY = 'Any disconnect (15)',
  MAINS = 'Mains Off (16)',
  COM = 'Network Communication Fau',
  EXTD = 'Extinguishing (22)',
  ATISOLAT = 'Alarm Transmitter Isolate',
  ABDL = 'Fire Door Control (FDC) (',
  ISOLOUTP = 'Output isolated (25)',
  FIRE1 = 'Fire1 (27)',
  FIRE2 = 'Fire2 (28)',
  FIRE3 = 'Fire3 (29)',
  FIRE5 = 'Fire5.1 Device (30)',
  FIRE51 = 'Fire5.2 Device (31)',
  FIRE52 = 'Fire5.3 Device (32)',
  MBC = 'Modbus Controlled Output',
  LOGOUT = 'Logical Output (38)',
  CONFIRM = 'Alarm Confirmation (39)',
  FAULTPU = 'Fault Paulse (40)',
  EXT = 'Extinguishing (1) Anx 95E',
}

export enum CircuitType {
  CONVLOOP = 'Fire Detection Line',
  ALOUTPUT = 'Not Monitored Output',
  BURGLER = 'Bulgar Detection Line',
  RILINE = 'Battery RI Monitor Line',
  TECHNIC = 'Technical Detection Line',
  GASLINE = 'Gas Detection Line',
  EXTDEV = 'External Device Line',
  EXTING = 'Extinguishing Detection Line',
  EXTDEV2 = 'Additional External Device Line',
  NU = 'Not In Use',
  IODIN = 'Digital Input',
  REDUND = 'Loop Communication Control Line',
  EXTEMLI = 'Emergency Light Sytem Monitoring',
  ANLOOPTR = 'Addressable Loop',
  SOOUTPUT = 'Monitored Output',
}

export enum AssignTypeType {
  ATFIRE = 'Fire',
  PREALARM = 'Pre-alarm',
  ISOLATIO = 'Isolation',
  ATFAULT = 'Fault',
  ATABDL = 'FDC',
  ATORG = 'Alarm Org.',
}

export const ADDEEPROM_COLUMNS = [
  'PanelId',
  'HexAddr',
  'HexValue',
  'HexDescription',
];

export const ALZONE_COLUMNS = ['Id', 'Name', 'AssignType'];
export const CAUSE_COLUMNS = ['Id', 'SoneId', 'InId', 'InType'];
export const DETTOALZONE_COLUMNS = [
  'Id',
  'DetZoneId',
  'AlZoneId',
  'SoneSource',
  'DynamicSelect',
];
export const EFFECT_COLUMNS = [
  'Id',
  'SoneId',
  'OutId',
  'OutType',
  'Intermittand',
];
export const ZONE_COLUMNS = [
  'Id',
  'ParentZone',
  'Number',
  'Type',
  'Name',
  'DblKnck',
];
export const PROP_OP_COLUMNS = [
  'PanelId',
  'ModemActivation',
  'ModemDelay',
  'SilenceSounder',
  'DetectorTextPres',
  'ZoneMessage',
  'ReminderBeep',
  'DayMon',
  'NightMon',
  'DayTue',
  'NightTue',
  'DayWed',
  'NightWed',
  'DayThu',
  'NightThu',
  'DayFri',
  'NightFri',
  'DaySat',
  'NightSat',
  'DaySun',
  'NightSun',
  'PrintMessage',
  'HotelDelay',
  'NotHotelDelay',
  'Buzzer',
  'PrealarmAct',
  'IsolationAct',
  'PagerType',
  'PagerAlarm',
  'PagerPreAlarm',
  'PagerSysFault',
  'PagerDetFault',
  'PagerEmliFault',
  'PagerMax2DetFault',
  'PagerIsolation',
  'PagerDeisolation',
  'AlarmTransAutomatic',
  'AlarmTransActManual',
  'ECommDeviceData',
  'ECommEventAck',
  'ECommHeartAck',
  'ECommAsciiDevice',
  'ECommExtendedProt',
  'ECommUseToken',
  'ECommTokenDir',
  'ECommUseHeartbeat',
  'ECommTotalComFault',
  'ECommReqResMode',
  'ECommMaster',
  'ECommNextSystem',
  'ComPort1Prot',
  'ComPort1Baud',
  'ComPort1Form',
  'ComPort2Prot',
  'ComPort2Baud',
  'ComPort2Form',
  'DisableOnKeyOperation',
  'Alg7',
  'LedFault',
  'LedEvac',
  'LedIsolation',
  'LedMicBusy',
  'LedMicReady',
  'MenuType',
  'PreAlarmPriority',
  'DelayOptions',
  'DelayAlarmTransmitter',
  'AlarmTransmitterKit',
  'BuzzerOptions',
  'PagerOptions',
  'KeySwitchOptions',
  'DisplayPres',
  'ExtingOptions',
  'ECommJump',
  'ECommRedundancy',
  'DetContam',
  'InhibitedPres',
  'SafetelConfig',
  'SafetelSysID',
  'eCommBits',
];

export const verifyFiles = (
  files: FweetFile[],
  verify: (db: Database) => boolean
) => files.map((file) => verify(file.fepx)).every(Boolean);

export const verifyPanels = (db: Database): boolean => {
  const table = db.prepare('SELECT * FROM Panel');
  const all = db.exec('SELECT * FROM Panel');
  const columns = table.getColumnNames();
  return !(
    columns.length !== PANEL_COLUMNS.length ||
    Object.values(columns)
      .map((column) => PANEL_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};

export const verifyAddEeProm = (db: Database): boolean => {
  const table = db.prepare('SELECT * FROM AddEeProm');
  const all = db.exec('SELECT * FROM AddEeProm');
  const columns = table.getColumnNames();
  return !(
    columns.length !== ADDEEPROM_COLUMNS.length ||
    Object.values(columns)
      .map((column) => ADDEEPROM_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};

export const verifyPropOp = (db: Database): boolean => {
  const table = db.prepare('SELECT * FROM PropOp');
  const all = db.exec('SELECT * FROM PropOp');
  const columns = table.getColumnNames();
  return !(
    columns.length !== PROP_OP_COLUMNS.length ||
    Object.values(columns)
      .map((column) => PROP_OP_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};

export const verifyCause = (db: Database): boolean => {
  const table = db.prepare('SELECT * FROM Cause');
  const all = db.exec('SELECT * FROM Cause');
  const columns = table.getColumnNames();
  return !(
    columns.length !== CAUSE_COLUMNS.length ||
    Object.values(columns)
      .map((column) => CAUSE_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};
export const verifyDetToAlZone = (db: Database): boolean => {
  const table = db.prepare('SELECT * FROM DetToAlZone');
  const all = db.exec('SELECT * FROM DetToAlZone');
  const columns = table.getColumnNames();
  return !(
    columns.length !== DETTOALZONE_COLUMNS.length ||
    Object.values(columns)
      .map((column) => DETTOALZONE_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};
export const verifyEffect = (db: Database): boolean => {
  const table = db.prepare('SELECT * FROM Effect');
  const all = db.exec('SELECT * FROM Effect');
  const columns = table.getColumnNames();
  return !(
    columns.length !== EFFECT_COLUMNS.length ||
    Object.values(columns)
      .map((column) => EFFECT_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};
export const verifyZone = (db: Database): boolean => {
  const table = db.prepare('SELECT * FROM Zone');
  const all = db.exec('SELECT * FROM Zone');
  const columns = table.getColumnNames();

  return !(
    columns.length !== ZONE_COLUMNS.length ||
    Object.values(columns)
      .map((column) => ZONE_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};

export const verifyAddrUnit = (db: Database): boolean => {
  const panels = db.prepare('SELECT * FROM AddrUnit');
  const all = db.exec('SELECT * FROM AddrUnit');
  const columns = panels.getColumnNames();

  return !(
    columns.length < ADDRUNIT_USED_COLUMNS.length ||
    ADDRUNIT_USED_COLUMNS.map((column) =>
      Object.values(columns).includes(column)
    ).includes(false) ||
    all.length === 0
  );
};

export const verifyLogbook = (db: Database): boolean => {
  const logbooks = db.prepare('SELECT * FROM Logbook');
  const all = db.exec('SELECT * FROM Logbook');
  const columns = logbooks.getColumnNames();
  return !(
    columns.length !== LOGBOOK_COLUMNS.length ||
    Object.values(columns)
      .map((column) => LOGBOOK_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};

export const verifyCircuit = (db: Database): boolean => {
  const circuits = db.prepare('SELECT * FROM Circuit');
  const all = db.exec('SELECT * FROM Circuit');
  const columns = circuits.getColumnNames();
  return !(
    columns.length !== CIRCUIT_COLUMNS.length ||
    Object.values(columns)
      .map((column) => CIRCUIT_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};

export const verifyAlZone = (db: Database): boolean => {
  const alZones = db.prepare('SELECT * FROM AlZone');
  const all = db.exec('SELECT * FROM AlZone');
  const columns = alZones.getColumnNames();
  return !(
    columns.length !== ALZONE_COLUMNS.length ||
    Object.values(columns)
      .map((column) => ALZONE_COLUMNS.includes(column))
      .includes(false) ||
    all.length === 0
  );
};
