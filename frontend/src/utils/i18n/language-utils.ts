import { i18n, TFunction } from 'i18next';
import { createContext } from 'react';

import authorCardText from '../../components/authorCardText.json';
import darkmodeToggleText from '../../components/darkmodeToggleText.json';
import fileListText from '../../components/fileListText.json';
import footerText from '../../components/footerText.json';
import menuText from '../../components/menuText.json';
import uploadBoxText from '../../components/uploadBoxText.json';
import articlePageText from '../../pages/articlepage/articlePageText.json';
import reflectiveThinkingPageText from '../../pages/articlepage/reflectiveThinkingPageText.json';
import techBestPracticePageText from '../../pages/articlepage/techBestPracticePageText.json';
import feetExportFormText from '../../pages/feetpage/feetExportFormText.json';
import fweetExportFormText from '../../pages/fweetpage/fweetExportFormText.json';
import homePageText from '../../pages/homepage/homePageText.json';
import importExportPageText from '../../pages/importExportPageText.json';
import innoExportFormText from '../../pages/innopage/innoExportFormText.json';
import pageNotFoundText from '../../pages/notfoundpage/notFoundPageText.json';
import arthurPageText from '../../pages/portfolio/arthurPageText.json';
import nghiPageText from '../../pages/portfolio/nghiPageText.json';
import { useContextOrThrow } from '../context-utils.ts';
import genericText from '../genericTexts.json';

export enum Language {
  EN = 'en',
  NO = 'no',
  NN = 'nn',
}

export const translationTexts = {
  ...authorCardText,
  ...darkmodeToggleText,
  ...footerText,
  ...menuText,
  ...articlePageText,
  ...reflectiveThinkingPageText,
  ...techBestPracticePageText,
  ...feetExportFormText,
  ...innoExportFormText,
  ...fileListText,
  ...fweetExportFormText,
  ...importExportPageText,
  ...homePageText,
  ...pageNotFoundText,
  ...arthurPageText,
  ...nghiPageText,
  ...genericText,
  ...uploadBoxText,
};

export type TranslateTextKey = keyof typeof translationTexts;

export type Languages = Record<string, string>;

type LanguageContextType = {
  t: TFunction<'translation', undefined>;
  translate: (
    textKey: TranslateTextKey,
    params?: Record<string, string>
  ) => string;
  i18n: i18n;
  onClickLanguageChange: (language: string) => void;
  languages: Languages;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguageContext = (): LanguageContextType =>
  useContextOrThrow(LanguageContext);
