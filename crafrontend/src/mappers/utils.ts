import { Workbook } from 'exceljs';
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

export const sheetTranslateMapper = (
  sheet: { [key: string]: any }[],
  language: keyof typeof feetLanguages,
): { [key: string]: any }[] => {
  const translate: Record<string, string> = require(
    `../feet-translations/translate.en-${language}.json`,
  );

  const translatedSheet: { [key: string]: any }[] = [];

  sheet.forEach((row) => {
    const translatedRow: { [key: string]: any } = {};

    Object.keys(row).forEach((key) => {
      const value = row[key];
      if (translate[key] !== undefined) {
        if (translate[value] !== undefined) {
          translatedRow[translate[key]] = translate[value];
        } else {
          translatedRow[translate[key]] = value;
        }
      } else if (translate[value] !== undefined) {
        translatedRow[key] = translate[value];
      } else {
        translatedRow[key] = value;
      }
    });
    translatedSheet.push(translatedRow);
  });

  return translatedSheet;
};

export const sheetTranslate = (key: string, language: string) => {
  const translate: Record<string, string> = require(
    `../feet-translations/translate.en-${language}.json`,
  );

  if (translate[key] !== undefined) {
    return translate[key];
  }
  return key;
};

export const addSheetToWorkbook = (
  workbook: Workbook,
  data: { [key: string]: any }[],
  sheetName: string,
  json: Root,
  sheetLanguage: keyof typeof feetLanguages,
) => {
  const translatedSheetName = sheetTranslate(sheetName, sheetLanguage);
  const sheet = workbook.addWorksheet(translatedSheetName);
  const translatedData = sheetTranslateMapper(data, sheetLanguage);
  sheet.addRow([
    sheetTranslate('Configuration number', sheetLanguage) +
      ': ' +
      json.version.number,
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
      let columnLength = cell.value?.toString().length || 0;
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
