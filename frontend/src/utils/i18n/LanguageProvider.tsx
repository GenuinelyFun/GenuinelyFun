import { FC, PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  LanguageContext,
  Languages,
  TranslateTextKey,
  translationTexts,
} from './language-utils.ts';

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
    params?: Record<string, string>
  ) => {
    if (!Object.hasOwn(translationTexts, key)) {
      console.error(
        `Error: This textKey ${key} does not exist in translations.`
      );
      return key;
    }

    const result: Record<string, string> = translationTexts[key];

    if (!Object.prototype.hasOwnProperty.call(result, i18n.language)) {
      console.error(
        `Error: Key ${key} not found in language: ${i18n.language}`
      );
      return key;
    }

    if (params) {
      return result[i18n.language].replace(
        /{([^\\}]+)}/g,
        (match, key) => params[key] || match
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
