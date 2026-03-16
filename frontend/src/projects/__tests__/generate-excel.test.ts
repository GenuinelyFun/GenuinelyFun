import { Workbook } from 'exceljs';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import JSZip from 'jszip';
import { dirname, join } from 'path';
import type { Database } from 'sql.js';
import initSqlJs from 'sql.js';
import { extractText, getDocumentProxy } from 'unpdf';
import { fileURLToPath } from 'url';
import { describe, expect, it, vi } from 'vitest';

import {
  addFeetSheetToWorkbook,
  addFweetSheetToWorkbook,
  addInnoSheetToWorkbook,
} from '../../utils/excel-utils.ts';
import type { Toast } from '../../utils/useToast.ts';
import type { Root } from '../feet/feetJsonDataInterface.ts';
import { mapLoopAddressToExcel } from '../feet/utils/address-report-utils.ts';
import { mapBoardToExcel } from '../feet/utils/board-utils.ts';
import { mapControlGroupsToExcel } from '../feet/utils/control-group-report-utils.ts';
import { mapToIOReportToExcel } from '../feet/utils/io-report-utils.ts';
import { mapLoopToExcel } from '../feet/utils/loop-utils.ts';
import { mapPanelToExcel } from '../feet/utils/panel-utils.ts';
import { mapSummaryToExcel } from '../feet/utils/summary-utils.ts';
import type { sheetTranslateType } from '../feet/utils/utils.ts';
import { feetLanguages } from '../feet/utils/utils.ts';
import { mapPanelsWithZones } from '../feet/utils/zone-utils.ts';
import { addressReportMapper } from '../fweet/address-report-utils.ts';
import { assignedOutputGroupsMapper } from '../fweet/assigned-output-groups.ts';
import { boardMapper } from '../fweet/board-utils.ts';
import { getSiteName } from '../fweet/database-utils.ts';
import { eePromMapper } from '../fweet/eeProm-utils.ts';
import { ioReportMapper } from '../fweet/io-report-utils.ts';
import { logbookMapper } from '../fweet/logbook-utils.ts';
import { loopMapper } from '../fweet/loop-utils.ts';
import { groupMapper } from '../fweet/output-groups-utils.ts';
import { panelMapper } from '../fweet/panel-utils.ts';
import { propOpMapper } from '../fweet/propOp-utils.ts';
import {
  verifyAddEeProm,
  verifyAddrUnit,
  verifyAlZone,
  verifyCause,
  verifyCircuit,
  verifyDetToAlZone,
  verifyEffect,
  verifyLogbook,
  verifyPanels,
  verifyPropOp,
  verifyZone,
} from '../fweet/verify-utils.ts';
import { mapHaphazardColumns, mapInnoToSheet } from '../inno-utils.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');
const outputDir = join(__dirname, 'test-output');

mkdirSync(outputDir, { recursive: true });

const toast = vi.fn() as unknown as Toast;

const save = async (workbook: Workbook, filename: string) => {
  const buffer = await workbook.xlsx.writeBuffer();
  writeFileSync(join(outputDir, filename), Buffer.from(buffer));
  return buffer.byteLength;
};

const loadTranslations = (lang: string): Record<string, string> =>
  JSON.parse(
    readFileSync(
      join(__dirname, `../feet/translations/feet-translate.en-${lang}.json`),
      'utf-8'
    )
  ) as Record<string, string>;

const makeSheetTranslate =
  (translations: Record<string, string>): sheetTranslateType =>
  (key) => {
    if (key === undefined || key === null) return key;
    return translations[key.toString()] ?? key;
  };

const loadFweetDb = async (filename: string): Promise<Database> => {
  const buffer = readFileSync(join(fixturesDir, filename));
  const zip = await JSZip.loadAsync(buffer);
  const sdbFilename = Object.keys(zip.files).find((f) => f.includes('.sdb'));
  if (!sdbFilename) throw new Error(`No .sdb in ${filename}`);
  const sdbFile = zip.file(sdbFilename);
  if (!sdbFile) throw new Error(`Cannot read .sdb from ${filename}`);
  const uint8array = await sdbFile.async('uint8array');
  const SQL = await initSqlJs({
    locateFile: (file) =>
      join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
  });
  return new SQL.Database(uint8array);
};

const FEET_FIXTURES = [
  'FEET - Empty.json',
  'FEET - Little of everything.json',
] as const;

const FWEET_FIXTURES = [
  'FWEET - Empty.fepx',
  'FWEET - Little of everything.fepx',
] as const;

const INNO_FIXTURES = [
  'INNO - Large site.pdf',
  'INNO - Smal site.pdf',
] as const;

describe('generate Excel output', () => {
  describe('feet', () => {
    for (const filename of FEET_FIXTURES) {
      for (const lang of Object.keys(
        feetLanguages
      ) as (keyof typeof feetLanguages)[]) {
        it(`${filename} - ${lang}`, async () => {
          const root = JSON.parse(
            readFileSync(join(fixturesDir, filename), 'utf-8')
          ) as Root;
          const translations = loadTranslations(lang);
          const sheetTranslate = makeSheetTranslate(translations);
          const { panels } = root.system;
          const workbook = new Workbook();

          const summaryData = mapSummaryToExcel(panels, sheetTranslate);
          if (summaryData.length > 0)
            addFeetSheetToWorkbook(
              workbook,
              summaryData,
              'Summary',
              root,
              sheetTranslate
            );

          const panelData = panels.map((p) =>
            mapPanelToExcel(root.system, p, sheetTranslate)
          );
          if (panelData.length > 0)
            addFeetSheetToWorkbook(
              workbook,
              panelData,
              'Panel',
              root,
              sheetTranslate
            );

          if (root.system.zones !== undefined) {
            const zoneData = mapPanelsWithZones(panels, root.system.zones);
            if (zoneData.length > 0)
              addFeetSheetToWorkbook(
                workbook,
                zoneData,
                'Zone',
                root,
                sheetTranslate
              );
          }

          const loopData = panels.flatMap((p) =>
            p.loop_controllers.flatMap((lc) =>
              mapLoopToExcel(lc, p.number, sheetTranslate)
            )
          );
          if (loopData.length > 0)
            addFeetSheetToWorkbook(
              workbook,
              loopData,
              'Loop',
              root,
              sheetTranslate
            );

          const boardData = mapBoardToExcel(panels);
          if (boardData.length > 0)
            addFeetSheetToWorkbook(
              workbook,
              boardData,
              'Board',
              root,
              sheetTranslate
            );

          const addressData = mapLoopAddressToExcel(panels, sheetTranslate);
          if (addressData.length > 0)
            addFeetSheetToWorkbook(
              workbook,
              addressData,
              'Address_report',
              root,
              sheetTranslate
            );

          const ioData = mapToIOReportToExcel(panels, sheetTranslate);
          if (ioData.length > 0)
            addFeetSheetToWorkbook(
              workbook,
              ioData,
              'IO_report',
              root,
              sheetTranslate
            );

          const controlGroupData = mapControlGroupsToExcel(
            panels,
            sheetTranslate
          );
          if (controlGroupData.length > 0)
            addFeetSheetToWorkbook(
              workbook,
              controlGroupData,
              'Control_group_report',
              root,
              sheetTranslate
            );

          const outputName = filename.replace('.json', ` - ${lang}.xlsx`);
          const bytes = await save(workbook, outputName);
          expect(bytes).toBeGreaterThan(0);
        });
      }
    }
  });

  describe('fweet', () => {
    for (const filename of FWEET_FIXTURES) {
      it(filename, async () => {
        const db = await loadFweetDb(filename);
        try {
          const workbook = new Workbook();
          const siteName = getSiteName(db, toast);

          if (verifyPanels(db))
            addFweetSheetToWorkbook(
              workbook,
              panelMapper(db),
              'Panel',
              siteName
            );
          if (verifyAddrUnit(db))
            addFweetSheetToWorkbook(workbook, loopMapper(db), 'Loop', siteName);
          if (verifyCircuit(db))
            addFweetSheetToWorkbook(
              workbook,
              boardMapper(db, toast),
              'Board',
              siteName
            );
          if (verifyAddrUnit(db))
            addFweetSheetToWorkbook(
              workbook,
              addressReportMapper(db, toast),
              'Address_report',
              siteName
            );
          if (verifyCircuit(db) && verifyAddrUnit(db))
            addFweetSheetToWorkbook(
              workbook,
              ioReportMapper(db, toast),
              'IO_report',
              siteName
            );
          if (verifyLogbook(db))
            addFweetSheetToWorkbook(
              workbook,
              logbookMapper(db),
              'Logbook',
              siteName
            );
          if (
            verifyAlZone(db) &&
            verifyCause(db) &&
            verifyDetToAlZone(db) &&
            verifyEffect(db) &&
            verifyZone(db) &&
            verifyCircuit(db)
          )
            addFweetSheetToWorkbook(
              workbook,
              assignedOutputGroupsMapper(db, toast),
              'Assigned_output_groups',
              siteName
            );
          if (verifyAlZone(db))
            addFweetSheetToWorkbook(
              workbook,
              groupMapper(db, toast),
              'Output_groups',
              siteName
            );
          if (verifyAddEeProm(db))
            addFweetSheetToWorkbook(
              workbook,
              eePromMapper(db, toast),
              'Eeprom',
              siteName
            );
          if (verifyPropOp(db))
            addFweetSheetToWorkbook(
              workbook,
              propOpMapper(db, toast),
              'Panel_properties',
              siteName
            );

          const bytes = await save(
            workbook,
            filename.replace('.fepx', '.xlsx')
          );
          expect(bytes).toBeGreaterThan(0);
        } finally {
          db.close();
        }
      });
    }
  });

  describe('inno', () => {
    for (const filename of INNO_FIXTURES) {
      it(filename, async () => {
        const buffer = readFileSync(join(fixturesDir, filename));
        const pdf = getDocumentProxy(new Uint8Array(buffer));
        const { text } = await extractText(await pdf, { mergePages: false });
        const innoText = text as string[];

        const workbook = new Workbook();
        const mainData = mapInnoToSheet(innoText);
        const splitData = mapHaphazardColumns(innoText);

        if (mainData.length > 0) addInnoSheetToWorkbook(workbook, mainData);
        if (splitData.length > 0)
          addInnoSheetToWorkbook(workbook, splitData, 'Oppdelt');

        const bytes = await save(workbook, filename.replace('.pdf', '.xlsx'));
        expect(bytes).toBeGreaterThan(0);
      });
    }
  });
});
