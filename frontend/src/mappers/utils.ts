import { Workbook } from 'exceljs';
import { useState } from 'react';

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

export type sheetValueTypes =
  | string
  | number
  | boolean
  | undefined
  | null
  | number[];
export type sheetTranslateType = (key: sheetValueTypes) => sheetValueTypes;

const fetchTranslations = async (
  language: keyof typeof feetLanguages
): Promise<Record<string, string>> =>
  await import(`../feet-translations/translate.en-${language}.json`).then(
    (t) => t.default as Record<string, string>
  );

export const sheetTranslateMapper = (
  sheet: { [key: string]: sheetValueTypes }[],
  sheetTranslate: sheetTranslateType
): { [key: string]: sheetValueTypes }[] => {
  const translatedSheet: {
    [key: string]: sheetValueTypes;
  }[] = [];

  sheet.forEach((row) => {
    const translatedRow: { [key: string]: sheetValueTypes } = {};

    Object.keys(row).forEach((key) => {
      const value = row[key];
      const translatedKey = sheetTranslate(key);
      const translatedValue = sheetTranslate(value);
      if (translatedKey !== undefined && translatedKey !== null) {
        if (translatedValue !== undefined) {
          translatedRow[translatedKey.toString()] = translatedValue;
        } else {
          translatedRow[translatedKey.toString()] = value;
        }
      } else if (sheetTranslate(value) !== undefined) {
        translatedRow[key] = sheetTranslate(value);
      } else {
        translatedRow[key] = value;
      }
    });
    translatedSheet.push(translatedRow);
  });

  return translatedSheet;
};

export const useSheetTranslate = (): {
  sheetTranslate: sheetTranslateType;
  updateLanguage: (language: keyof typeof feetLanguages) => void;
} => {
  const [translate, setTranslate] = useState<Record<string, string>>();

  return {
    sheetTranslate: (key: sheetValueTypes) => {
      if (
        translate !== undefined &&
        key !== undefined &&
        key !== null &&
        translate[key.toString()] !== undefined
      ) {
        return translate[key.toString()];
      }
      return key;
    },
    updateLanguage: (language: string) =>
      fetchTranslations(language).then((t) => setTranslate(t)),
  };
};

export const addSheetToWorkbook = (
  workbook: Workbook,
  data: { [key: string]: sheetValueTypes }[],
  sheetName: string,
  json: Root,
  sheetTranslate: sheetTranslateType
) => {
  const translatedSheetName = sheetTranslate(sheetName)!.toString();
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
