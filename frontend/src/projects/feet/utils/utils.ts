import { Workbook } from 'exceljs';
import { useState } from 'react';

import { Root } from '../feetJsonDataInterface.ts';

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
  await import(`../translations/feet-translate.en-${language}.json`).then(
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

const getTableHeaders = (
  data: { [key: string]: sheetValueTypes }[]
): { name: string; key: string; filterButton: boolean }[] => {
  const headers: { name: string; key: string; filterButton: boolean }[] = [];
  data.forEach((item) =>
    Object.keys(item).forEach((key) => {
      if (headers.find((item) => item.key === key) === undefined) {
        headers.push({
          name: key,
          key: key,
          filterButton: true,
        });
      }
    })
  );
  return headers;
};

const getTableRows = (
  data: { [key: string]: sheetValueTypes }[],
  headers: {
    name: string;
    key: string;
    filterButton: boolean;
  }[]
): sheetValueTypes[][] => {
  const rows: sheetValueTypes[][] = [];
  data.forEach((row) => {
    const newRow: sheetValueTypes[] = [];
    headers.forEach((column) => {
      if (row[column.key] !== undefined) {
        newRow.push(row[column.key]);
      } else {
        newRow.push(null);
      }
    });
    rows.push(newRow);
  });

  return rows;
};

export const addFeetSheetToWorkbook = (
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

  const columns = getTableHeaders(translatedData);
  sheet.addTable({
    name: translatedSheetName,
    ref: 'A2',
    headerRow: true,
    columns: columns,
    rows: getTableRows(translatedData, columns),
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

export const addFweetSheetToWorkbook = (
  workbook: Workbook,
  data: { [key: string]: sheetValueTypes }[],
  sheetName: string,
  siteName: string
) => {
  const sheet = workbook.addWorksheet(sheetName);
  sheet.addRow(['Sitename: ' + siteName]);

  const columns = getTableHeaders(data);
  sheet.addTable({
    name: sheetName,
    ref: 'A2',
    headerRow: true,
    columns: columns,
    rows: getTableRows(data, columns),
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
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.alignment = {
        horizontal: 'left',
      };
    });
  });
};
