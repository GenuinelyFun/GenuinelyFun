import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';

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

export enum LoopType {
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

export const ADDRUNIT_COLUMNS = [
  'Id',
  'UnitNo',
  'CircuitId',
  'CircuitNo',
  'Type',
  'RmOutput',
  'Name',
  'Description',
  'AlarmLimit',
  'PreAlarmLimit',
  'ScanPeriode',
  'ScanPeriodFault',
  'SensDay',
  'SensNigth',
  'NumOfInputs',
  'NumOfOutputs',
  'AlarmType',
  'EmliState',
  'NoOfWL',
  'TALInpMode',
  'TALRelMode',
  'TALRelState',
  'Tech',
  'TALRelFailSafe',
  'EOLO',
  'EOLI',
  'NEWEOLI',
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

export const verifyPanels = (db: Database, toast: Toast): boolean => {
  const panels = db.prepare('SELECT * FROM Panel');
  const columns = panels.getColumnNames();
  if (
    columns.length !== PANEL_COLUMNS.length ||
    Object.values(columns)
      .map((column) => PANEL_COLUMNS.includes(column))
      .includes(false)
  ) {
    toast({
      type: 'error',
      textKey: 'fweet.dataformat.error',
      textParams: { data: 'panel' },
    });
    return false;
  }
  return true;
};

export const verifyLoops = (db: Database, toast: Toast): boolean => {
  const panels = db.prepare('SELECT * FROM AddrUnit');
  const columns = panels.getColumnNames();
  if (
    columns.length !== ADDRUNIT_COLUMNS.length ||
    Object.values(columns)
      .map((column) => ADDRUNIT_COLUMNS.includes(column))
      .includes(false)
  ) {
    toast({
      type: 'error',
      textKey: 'fweet.dataformat.error',
      textParams: { data: 'loop' },
    });
    return false;
  }
  return true;
};

export const verifyLogbook = (db: Database, toast: Toast): boolean => {
  const logbooks = db.prepare('SELECT * FROM Logbook');
  const columns = logbooks.getColumnNames();
  console.log(columns);
  if (
    columns.length !== LOGBOOK_COLUMNS.length ||
    Object.values(columns)
      .map((column) => LOGBOOK_COLUMNS.includes(column))
      .includes(false)
  ) {
    toast({
      type: 'error',
      textKey: 'fweet.dataformat.error',
      textParams: { data: 'logbook' },
    });
    return false;
  }
  return true;
};
