import { ReactElement, useCallback } from 'react';
import hotToast, { Renderable, ValueOrFunction } from 'react-hot-toast';

import { useDarkmodeContext } from './darkmode-utils.ts';
import { TranslateTextKey, useLanguageContext } from './i18n/language-utils.ts';

interface PromiseProps {
  loader: Promise<unknown>;
  options: {
    loading: Renderable;
    success: ValueOrFunction<Renderable, unknown>;
    error: ValueOrFunction<Renderable, unknown>;
  };
}

export type Toast = ({
  type,
  textKey,
  textParams,
  element,
  promise,
}: {
  type: 'error' | 'success' | 'promise' | 'info';
  textKey?: TranslateTextKey;
  textParams?: Record<string, string>;
  element?: ReactElement;
  promise?: PromiseProps;
}) => void;

export const useToast = (): Toast => {
  const { translate } = useLanguageContext();
  const { theme } = useDarkmodeContext();

  return useCallback(
    ({
      type = 'info',
      textKey,
      textParams,
      element,
      promise,
    }: {
      type: 'error' | 'success' | 'promise' | 'info';
      textKey?: TranslateTextKey;
      textParams?: Record<string, string>;
      element?: ReactElement;
      promise?: PromiseProps;
    }) => {
      const darkmodeStyles =
        theme === 'dark'
          ? {
              style: {
                backgroundColor: '#354c61',
                color: '#ffffff',
              },
            }
          : {};

      const content = element
        ? () => element
        : textKey
          ? translate(textKey, textParams)
          : 'Hot toast burnt';
      switch (type) {
        case 'error':
          hotToast.error(content, {
            ...darkmodeStyles,
          });
          break;
        case 'success':
          hotToast.success(content, {
            ...darkmodeStyles,
            duration: 4000,
          });
          break;
        case 'promise':
          if (promise !== undefined) {
            hotToast.promise(promise.loader, promise.options, {
              ...darkmodeStyles,
            });
          }
          break;
        case 'info':
        default:
          hotToast(content, {
            ...darkmodeStyles,
            duration: 8000,
          });
          break;
      }
    },
    [theme, translate]
  );
};
