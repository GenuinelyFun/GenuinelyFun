import React, { createContext, FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { i18n, TFunction } from 'i18next';

import authorCardText from '../pages/journalpage/authorCardText.json';
import homePageText from '../pages/homepage/homePageText.json';
import pageNotFoundText from '../pages/notfoundpage/notFoundPageText.json';
import feetPageText from '../pages/feetpage/feetPageText.json';
import fileListText from '../pages/feetpage/fileListText.json';
import techBestPracticePageText from '../pages/journalpage/techBestPracticePageText.json';
import footerText from '../components/footerText.json';
import menuText from '../components/menuText.json';

import { useContextOrThrow } from './context-utils';
import genericText from './genericTexts.json';
import { languageText } from '../components/LanguageButton';

export enum Language {
  EN = 'en',
  NO = 'no',
  NN = 'nn',
}

const allText = {
  ...authorCardText,
  ...genericText,
  ...languageText,
  ...homePageText,
  ...pageNotFoundText,
  ...feetPageText,
  ...fileListText,
  ...techBestPracticePageText,
  ...footerText,
  ...menuText,
};

export type TranslateTextKey = keyof typeof allText;

type Languages = Record<string, string>;

type LanguageContextType = {
  t: TFunction<'translation', undefined>;
  translate: (textKey: TranslateTextKey) => string;
  i18n: i18n;
  onClickLanguageChange: (language: string) => void;
  languages: Languages;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const languages: Languages = { en: 'English', no: 'Norsk', nn: 'Nynorsk' };

  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const translate = (key: TranslateTextKey) => {
    if (!allText.hasOwnProperty(key)) {
      console.error(
        `Error: This textKey ${key} does not exist in translations.`,
      );
      return key;
    }

    const result: Record<string, string> = allText[key];

    if (!result.hasOwnProperty(i18n.language)) {
      console.error(
        `Error: Key ${key} not found in language: ${i18n.language}`,
      );
      return key;
    }

    return result[i18n.language];
  };

  return (
    <LanguageContext.Provider
      value={{ t, translate, i18n, onClickLanguageChange, languages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType =>
  useContextOrThrow(LanguageContext);
