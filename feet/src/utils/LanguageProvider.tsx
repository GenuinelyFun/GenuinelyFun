import React, {
  ChangeEventHandler,
  createContext,
  FC,
  PropsWithChildren,
} from 'react';
import { useTranslation } from 'react-i18next';
import { i18n, TFunction } from 'i18next';
import { useContextOrThrow } from './context-utils';

import HomePageText from '../pages/homepage/HomePageText.json';
import feetPageText from '../pages/feetpage/feetPageText.json';
import FooterText from '../components/FooterText.json';
import { MenuText } from '../components/Menu';

export enum Language {
  EN = 'en',
  NO = 'no',
}

const allText = {
  ...HomePageText,
  ...feetPageText,
  ...FooterText,
  ...MenuText,
};

export type TranslateTextKeyType = keyof typeof allText;

type Languages = Record<string, string>;

type LanguageContextType = {
  t: TFunction<'translation', undefined>;
  translate: (textKey: TranslateTextKeyType) => string;
  i18n: i18n;
  onClickLanguageChange: ChangeEventHandler<HTMLInputElement>;
  languages: Languages;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const languages: Languages = { en: 'English', no: 'Norsk' };

  const { t, i18n } = useTranslation();

  const onClickLanguageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  const translate = (key: TranslateTextKeyType) => {
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
