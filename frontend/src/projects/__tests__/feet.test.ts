import { Workbook } from 'exceljs';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from 'vitest';

import { addFeetSheetToWorkbook } from '../../utils/excel-utils.ts';
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');

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
    const str = key.toString();
    return translations[str] ?? key;
  };

const loadFeetFixture = (filename: string): Root =>
  JSON.parse(readFileSync(join(fixturesDir, filename), 'utf-8')) as Root;

const runAllMappers = (root: Root, sheetTranslate: sheetTranslateType) => {
  const { panels } = root.system;
  return {
    summary: mapSummaryToExcel(panels, sheetTranslate),
    panel: panels.map((p) => mapPanelToExcel(root.system, p, sheetTranslate)),
    zone:
      root.system.zones !== undefined
        ? mapPanelsWithZones(panels, root.system.zones)
        : [],
    loop: panels.flatMap((p) =>
      p.loop_controllers.flatMap((lc) =>
        mapLoopToExcel(lc, p.number, sheetTranslate)
      )
    ),
    board: mapBoardToExcel(panels),
    addressReport: mapLoopAddressToExcel(panels, sheetTranslate),
    ioReport: mapToIOReportToExcel(panels, sheetTranslate),
    controlGroupReport: mapControlGroupsToExcel(panels, sheetTranslate),
  };
};

const FEET_FIXTURES = [
  'FEET - Empty.json',
  'FEET - Little of everything.json',
] as const;

const languages = Object.keys(feetLanguages) as (keyof typeof feetLanguages)[];

describe('feet', () => {
  for (const filename of FEET_FIXTURES) {
    describe(filename, () => {
      const root = loadFeetFixture(filename);

      it('parses into a valid Root structure', () => {
        expect(root.created_by).toBeDefined();
        expect(root.version).toBeDefined();
        expect(root.system).toBeDefined();
        expect(Array.isArray(root.system.panels)).toBe(true);
      });

      it('generates a valid Excel workbook', async () => {
        const translations = loadTranslations('en');
        const sheetTranslate = makeSheetTranslate(translations);
        const allData = runAllMappers(root, sheetTranslate);
        const workbook = new Workbook();
        const addedSheets: string[] = [];

        if (allData.summary.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.summary,
            'Summary',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('Summary')!.toString());
        }
        if (allData.panel.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.panel,
            'Panel',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('Panel')!.toString());
        }
        if (allData.zone.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.zone,
            'Zone',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('Zone')!.toString());
        }
        if (allData.loop.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.loop,
            'Loop',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('Loop')!.toString());
        }
        if (allData.board.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.board,
            'Board',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('Board')!.toString());
        }
        if (allData.addressReport.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.addressReport,
            'Address_report',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('Address_report')!.toString());
        }
        if (allData.ioReport.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.ioReport,
            'IO_report',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('IO_report')!.toString());
        }
        if (allData.controlGroupReport.length > 0) {
          addFeetSheetToWorkbook(
            workbook,
            allData.controlGroupReport,
            'Control_group_report',
            root,
            sheetTranslate
          );
          addedSheets.push(sheetTranslate('Control_group_report')!.toString());
        }

        const buffer = await workbook.xlsx.writeBuffer();
        expect(buffer.byteLength).toBeGreaterThan(0);

        const readback = new Workbook();
        await readback.xlsx.load(buffer);

        expect(readback.worksheets.length).toBe(addedSheets.length);
        for (const name of addedSheets) {
          const sheet = readback.getWorksheet(name);
          expect(sheet).toBeDefined();
          expect(sheet!.getRow(1).getCell(1).text).toContain(
            String(root.version.number)
          );
          expect(sheet!.getRow(2).values.length).toBeGreaterThan(1);
        }
      });

      for (const lang of languages) {
        describe(`language: ${lang}`, () => {
          const translations = loadTranslations(lang);
          const sheetTranslate = makeSheetTranslate(translations);

          it('sheetTranslate applies translation file correctly', () => {
            const knownKey = 'Configuration number';
            expect(sheetTranslate(knownKey)).toBe(
              translations[knownKey] ?? knownKey
            );
            expect(sheetTranslate('__unmapped__')).toBe('__unmapped__');
            expect(sheetTranslate(undefined)).toBeUndefined();
            expect(sheetTranslate(null)).toBeNull();
          });

          it('all mappers run without throwing', () => {
            expect(() => runAllMappers(root, sheetTranslate)).not.toThrow();
          });

          it('all sheet outputs match snapshot', () => {
            expect(runAllMappers(root, sheetTranslate)).toMatchSnapshot();
          });
        });
      }
    });
  }
});
