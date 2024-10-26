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
  if (language === 'en') {
    return sheet;
  }
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
  if (language === 'en') {
    return key;
  }
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
  const sheet = workbook.addWorksheet(sheetName);
  const translatedData = sheetTranslateMapper(data, sheetLanguage);
  sheet.addRow(['Configuration number ' + json.version.number]);
  sheet.addTable({
    name: sheetName,
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
      showRowStripes: true,
    },
  });
  sheet.eachRow({ includeEmpty: true }, function (row) {
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.alignment = {
        horizontal: 'left',
      };
    });
  });
};
