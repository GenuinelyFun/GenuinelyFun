export const feetLanguages: Record<string, string> = {
  //cs: 'Czech',
  da: 'Danish',
  //'nl-NL': 'Dutch',
  en: 'English',
  //et: 'Estonian',
  fi: 'Finnish',
  //'nl-BE': 'Flemish',
  //fr: 'French',
  //de: 'German',
  //hu: 'Hungarian',
  it: 'Italian',
  //lv: 'Latvian',
  //lt: 'Lithuanian',
  nb: 'Norwegian',
  //pl: 'Polish',
  //pt: 'Portuguese',
  ru: 'Russian',
  es: 'Spanish',
  sv: 'Swedish',
  //tr: 'Turkish',
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
      if (
        value !== null &&
        value !== undefined &&
        translate[value] !== undefined
      ) {
        translatedRow[key] = translate[value];
      } else {
        translatedRow[key] = value;
      }
    });
    translatedSheet.push(translatedRow);
  });

  return translatedSheet;
};
