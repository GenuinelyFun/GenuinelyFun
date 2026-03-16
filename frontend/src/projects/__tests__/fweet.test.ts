import { Workbook } from 'exceljs';
import { readFileSync } from 'fs';
import JSZip from 'jszip';
import { dirname, join } from 'path';
import type { Database } from 'sql.js';
import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { addFweetSheetToWorkbook } from '../../utils/excel-utils.ts';
import type { Toast } from '../../utils/useToast.ts';
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');

const toast = vi.fn() as unknown as Toast;

const loadFweetFixture = async (filename: string): Promise<Database> => {
  const buffer = readFileSync(join(fixturesDir, filename));
  const zip = await JSZip.loadAsync(buffer);
  const sdbFilename = Object.keys(zip.files).find((f) => f.includes('.sdb'));
  if (!sdbFilename) throw new Error(`No .sdb file found in ${filename}`);
  const sdbFile = zip.file(sdbFilename);
  if (!sdbFile) throw new Error(`Cannot read .sdb file from ${filename}`);
  const uint8array = await sdbFile.async('uint8array');
  const SQL = await initSqlJs({
    locateFile: (file) =>
      join(process.cwd(), 'node_modules', 'sql.js', 'dist', file),
  });
  return new SQL.Database(uint8array);
};

const FWEET_FIXTURES = [
  'FWEET - Empty.fepx',
  'FWEET - Little of everything.fepx',
] as const;

describe('fweet', () => {
  for (const filename of FWEET_FIXTURES) {
    describe(filename, () => {
      let db!: Database;

      beforeAll(async () => {
        db = await loadFweetFixture(filename);
      });

      afterAll(() => {
        db.close();
      });

      it('loads as a valid database', () => {
        expect(db).toBeDefined();
      });

      it('verify function results match snapshot', () => {
        expect({
          panels: verifyPanels(db),
          addEeProm: verifyAddEeProm(db),
          propOp: verifyPropOp(db),
          addrUnit: verifyAddrUnit(db),
          logbook: verifyLogbook(db),
          circuit: verifyCircuit(db),
          alZone: verifyAlZone(db),
          cause: verifyCause(db),
          detToAlZone: verifyDetToAlZone(db),
          effect: verifyEffect(db),
          zone: verifyZone(db),
        }).toMatchSnapshot();
      });

      it('getSiteName returns a string', () => {
        expect(typeof getSiteName(db, toast)).toBe('string');
      });

      it('generates a valid Excel workbook', async () => {
        const siteName = getSiteName(db, toast);
        const workbook = new Workbook();
        const addedSheets: string[] = [];

        if (verifyPanels(db)) {
          addFweetSheetToWorkbook(workbook, panelMapper(db), 'Panel', siteName);
          addedSheets.push('Panel');
        }
        if (verifyAddrUnit(db)) {
          addFweetSheetToWorkbook(workbook, loopMapper(db), 'Loop', siteName);
          addedSheets.push('Loop');
        }
        if (verifyCircuit(db)) {
          addFweetSheetToWorkbook(
            workbook,
            boardMapper(db, toast),
            'Board',
            siteName
          );
          addedSheets.push('Board');
        }
        if (verifyAddrUnit(db)) {
          addFweetSheetToWorkbook(
            workbook,
            addressReportMapper(db, toast),
            'Address_report',
            siteName
          );
          addedSheets.push('Address_report');
        }
        if (verifyCircuit(db) && verifyAddrUnit(db)) {
          addFweetSheetToWorkbook(
            workbook,
            ioReportMapper(db, toast),
            'IO_report',
            siteName
          );
          addedSheets.push('IO_report');
        }
        if (verifyLogbook(db)) {
          addFweetSheetToWorkbook(
            workbook,
            logbookMapper(db),
            'Logbook',
            siteName
          );
          addedSheets.push('Logbook');
        }
        if (
          verifyAlZone(db) &&
          verifyCause(db) &&
          verifyDetToAlZone(db) &&
          verifyEffect(db) &&
          verifyZone(db) &&
          verifyCircuit(db)
        ) {
          addFweetSheetToWorkbook(
            workbook,
            assignedOutputGroupsMapper(db, toast),
            'Assigned_output_groups',
            siteName
          );
          addedSheets.push('Assigned_output_groups');
        }
        if (verifyAlZone(db)) {
          addFweetSheetToWorkbook(
            workbook,
            groupMapper(db, toast),
            'Output_groups',
            siteName
          );
          addedSheets.push('Output_groups');
        }
        if (verifyAddEeProm(db)) {
          addFweetSheetToWorkbook(
            workbook,
            eePromMapper(db, toast),
            'Eeprom',
            siteName
          );
          addedSheets.push('Eeprom');
        }
        if (verifyPropOp(db)) {
          addFweetSheetToWorkbook(
            workbook,
            propOpMapper(db, toast),
            'Panel_properties',
            siteName
          );
          addedSheets.push('Panel_properties');
        }

        const buffer = await workbook.xlsx.writeBuffer();
        expect(buffer.byteLength).toBeGreaterThan(0);

        const readback = new Workbook();
        await readback.xlsx.load(buffer);

        expect(readback.worksheets.length).toBe(addedSheets.length);
        for (const name of addedSheets) {
          const sheet = readback.getWorksheet(name);
          expect(sheet).toBeDefined();
          expect(sheet!.getRow(1).getCell(1).text).toContain('Sitename:');
          expect(sheet!.getRow(2).values.length).toBeGreaterThan(1);
        }
      });

      it('panelMapper', () => {
        const available = verifyPanels(db);
        if (available) {
          expect(panelMapper(db)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('loopMapper', () => {
        const available = verifyAddrUnit(db);
        if (available) {
          expect(loopMapper(db)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('boardMapper', () => {
        const available = verifyCircuit(db);
        if (available) {
          expect(boardMapper(db, toast)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('addressReportMapper', () => {
        const available = verifyAddrUnit(db);
        if (available) {
          expect(addressReportMapper(db, toast)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('ioReportMapper', () => {
        const available = verifyCircuit(db) && verifyAddrUnit(db);
        if (available) {
          expect(ioReportMapper(db, toast)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('logbookMapper', () => {
        const available = verifyLogbook(db);
        if (available) {
          expect(logbookMapper(db)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('assignedOutputGroupsMapper', () => {
        const available =
          verifyAlZone(db) &&
          verifyCause(db) &&
          verifyDetToAlZone(db) &&
          verifyEffect(db) &&
          verifyZone(db) &&
          verifyCircuit(db);
        if (available) {
          expect(assignedOutputGroupsMapper(db, toast)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('groupMapper', () => {
        const available = verifyAlZone(db);
        if (available) {
          expect(groupMapper(db, toast)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('eePromMapper', () => {
        const available = verifyAddEeProm(db);
        if (available) {
          expect(eePromMapper(db, toast)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });

      it('propOpMapper', () => {
        const available = verifyPropOp(db);
        if (available) {
          expect(propOpMapper(db, toast)).toMatchSnapshot();
        } else {
          expect(available).toBe(false);
        }
      });
    });
  }
});
