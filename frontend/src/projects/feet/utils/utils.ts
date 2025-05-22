import { useState } from 'react';

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

export type SheetValueType =
  | string
  | number
  | boolean
  | undefined
  | null
  | number[];

export type sheetTranslateType = (key: SheetValueType) => SheetValueType;

const fetchTranslations = async (
  language: keyof typeof feetLanguages
): Promise<Record<string, string>> =>
  await import(`../translations/feet-translate.en-${language}.json`).then(
    (t) => t.default as Record<string, string>
  );

export const sheetTranslateMapper = (
  sheet: { [key: string]: SheetValueType }[],
  sheetTranslate: sheetTranslateType
): { [key: string]: SheetValueType }[] => {
  const translatedSheet: {
    [key: string]: SheetValueType;
  }[] = [];

  sheet.forEach((row) => {
    const translatedRow: { [key: string]: SheetValueType } = {};

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
    sheetTranslate: (key: SheetValueType) => {
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
