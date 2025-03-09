import { Workbook } from 'exceljs';
import { useCallback, useState } from 'react';

import { Root } from '../interfaces/jsonDataInterface';

export const feetLanguages: Record<string, string> = {
  en: 'English',
  fi: 'Suomi',
  sv: 'Svenska',
  nb: 'Norsk',
  da: 'Dansk',
  it: 'Italiano',
  ru: 'Русский',
  es: 'Español',
};

const fetchTranslations = async (
  language: keyof typeof feetLanguages
): Promise<Record<string, string>> =>
  await import(`../feet-translations/translate.en-${language}.json`).then(
    (t) => t.default
  );

export const sheetTranslateMapper = (
  sheet: { [key: string]: unknown }[],
  sheetTranslate: (key: keyof typeof feetLanguages) => string
): { [key: string]: unknown }[] => {
  const translatedSheet: {
    [key: string]: unknown;
  }[] = [];

  sheet.forEach((row) => {
    const translatedRow: { [key: string]: unknown } = {};

    Object.keys(row).forEach((key) => {
      const value = row[key];
      if (sheetTranslate(key) !== undefined) {
        if (sheetTranslate(String(value)) !== undefined) {
          translatedRow[sheetTranslate(key)] = sheetTranslate(String(value));
        } else {
          translatedRow[sheetTranslate(key)] = value;
        }
      } else if (sheetTranslate(String(value)) !== undefined) {
        translatedRow[key] = sheetTranslate(String(value));
      } else {
        translatedRow[key] = value;
      }
    });
    translatedSheet.push(translatedRow);
  });

  return translatedSheet;
};

export const useSheetTranslate = () => {
  const [translate, setTranslate] = useState<Record<string, string>>();

  return useCallback(
    (language: string) => {
      fetchTranslations(language).then((t) => setTranslate(t));
      return (key: string): string => {
        if (translate !== undefined && translate[key] !== undefined) {
          return translate[key];
        }
        return key;
      };
    },
    [translate]
  );
};

export const addSheetToWorkbook = (
  workbook: Workbook,
  data: { [key: string]: unknown }[],
  sheetName: string,
  json: Root,
  sheetTranslate: (key: keyof typeof feetLanguages) => string
) => {
  const translatedSheetName = sheetTranslate(sheetName);
  const sheet = workbook.addWorksheet(translatedSheetName);
  const translatedData = sheetTranslateMapper(data, sheetTranslate);
  sheet.addRow([
    sheetTranslate('Configuration number') + ': ' + json.version.number,
  ]);
  sheet.addTable({
    name: translatedSheetName,
    ref: 'A2',
    headerRow: true,
    columns: Object.keys(translatedData[0]).map((key) => {
      return {
        name: key,
        key: key,
        filterButton: true,
      };
    }),
    rows: translatedData.map((row) => Object.values(row)),
    style: {
      theme: 'TableStyleLight1',
      showRowStripes: true,
    },
  });
  sheet.columns.forEach((column) => {
    let dataMax = 0;
    column?.eachCell?.({ includeEmpty: true }, function (cell) {
      const columnLength = cell.value?.toString().length || 0;
      if (columnLength > dataMax) {
        dataMax = columnLength;
      }
    });
    column.width = dataMax < 10 ? 10 : dataMax;
  });
  sheet.eachRow({ includeEmpty: true }, function (row) {
    if (sheetName === 'Control group report' && row.number === 2) {
      row.eachCell({ includeEmpty: true }, function (cell) {
        if (Number(cell.col) <= 7) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'E2B9B2' },
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '92AEBB' },
          };
        }
      });
    }
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.alignment = {
        horizontal: 'left',
      };
    });
  });
};
