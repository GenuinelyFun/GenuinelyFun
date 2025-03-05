import React, { createContext, FC, PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { i18n, TFunction } from 'i18next';
import authorCardText from '../components/authorCardText.json';
import darkmodeToggleText from '../components/darkmodeToggleText.json';
import homePageText from '../pages/homepage/homePageText.json';
import pageNotFoundText from '../pages/notfoundpage/notFoundPageText.json';
import feetPageText from '../pages/feetpage/feetPageText.json';
import importFormText from '../pages/feetpage/importFormText.json';
import fileListText from '../pages/feetpage/fileListText.json';
import exportFormText from '../pages/feetpage/export-form/exportFormText.json';
import articlePageText from '../pages/articlepage/articlePageText.json';
import techBestPracticePageText from '../pages/articlepage/techBestPracticePageText.json';
import reflectiveThinkingPageText from '../pages/articlepage/reflectiveThinkingPageText.json';
import arthurPageText from '../pages/portfolio/arthurPageText.json';
import nghiPageText from '../pages/portfolio/nghiPageText.json';
import footerText from '../components/footerText.json';
import menuText from '../components/menuText.json';
import genericText from './genericTexts.json';
import { useContextOrThrow } from './context-utils';

export enum Language {
  EN = 'en',
  NO = 'no',
  NN = 'nn',
}

const allText = {
  ...authorCardText,
  ...darkmodeToggleText,
  ...genericText,
  ...homePageText,
  ...pageNotFoundText,
  ...feetPageText,
  ...importFormText,
  ...fileListText,
  ...exportFormText,
  ...articlePageText,
  ...techBestPracticePageText,
  ...reflectiveThinkingPageText,
  ...arthurPageText,
  ...nghiPageText,
  ...footerText,
  ...menuText,
};

export type TranslateTextKey = keyof typeof allText;

type Languages = Record<string, string>;

type LanguageContextType = {
  t: TFunction<'translation', undefined>;
  translate: (
    textKey: TranslateTextKey,
    params?: Record<string, string>,
  ) => string;
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

  useEffect(() => {
    document.querySelector('html')?.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  const onClickLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const translate = (
    key: TranslateTextKey,
    params?: Record<string, string>,
  ) => {
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

    if (params) {
      return result[i18n.language].replace(
        /{([^\\}]+)}/g,
        (match, key) => params[key] || match,
      );
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
