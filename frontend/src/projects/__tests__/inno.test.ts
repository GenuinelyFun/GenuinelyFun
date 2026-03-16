import { Workbook } from 'exceljs';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { extractText, getDocumentProxy } from 'unpdf';
import { fileURLToPath } from 'url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import {
  addInnoSheetToWorkbook,
  INNO_COLUMN_HEADERS,
} from '../../utils/excel-utils.ts';
import { mapHaphazardColumns, mapInnoToSheet } from '../inno-utils.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');

const loadInnoFixture = async (filename: string): Promise<string[]> => {
  const buffer = readFileSync(join(fixturesDir, filename));
  const pdf = getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(await pdf, { mergePages: false });
  return text as string[];
};

const INNO_FIXTURES = [
  'INNO - Large site.pdf',
  'INNO - Smal site.pdf',
] as const;

describe('inno', () => {
  for (const filename of INNO_FIXTURES) {
    describe(filename, () => {
      let text!: string[];

      beforeAll(async () => {
        text = await loadInnoFixture(filename);
      });

      afterAll(() => {
        text = [];
      });

      it('extracts a non-empty text array from the PDF', () => {
        expect(Array.isArray(text)).toBe(true);
        expect(text.length).toBeGreaterThan(0);
      });

      it('generates a valid Excel workbook', async () => {
        const mainData = mapInnoToSheet(text);
        const splitData = mapHaphazardColumns(text);
        const workbook = new Workbook();

        if (mainData.length > 0) {
          addInnoSheetToWorkbook(workbook, mainData);
        }
        if (splitData.length > 0) {
          addInnoSheetToWorkbook(workbook, splitData, 'Oppdelt');
        }

        const buffer = await workbook.xlsx.writeBuffer();
        expect(buffer.byteLength).toBeGreaterThan(0);

        const readback = new Workbook();
        await readback.xlsx.load(buffer);

        const expectedCount =
          (mainData.length > 0 ? 1 : 0) + (splitData.length > 0 ? 1 : 0);
        expect(readback.worksheets.length).toBe(expectedCount);

        if (mainData.length > 0) {
          const sheet = readback.getWorksheet('Armaturliste');
          expect(sheet).toBeDefined();
          expect(sheet!.getRow(1).getCell(1).value).toBe(
            INNO_COLUMN_HEADERS[0]
          );
          expect(sheet!.getRow(2).values.length).toBeGreaterThan(1);
        }
        if (splitData.length > 0) {
          const sheet = readback.getWorksheet('Oppdelt');
          expect(sheet).toBeDefined();
          expect(sheet!.getRow(1).values.length).toBeGreaterThan(1);
        }
      });

      it('mapInnoToSheet output matches snapshot', () => {
        expect(mapInnoToSheet(text)).toMatchSnapshot();
      });

      it('mapHaphazardColumns output matches snapshot', () => {
        expect(mapHaphazardColumns(text)).toMatchSnapshot();
      });
    });
  }
});
