import { ReactElement, useCallback } from 'react';
import hotToast, { Renderable, ValueOrFunction } from 'react-hot-toast';
import { TranslateTextKey, useLanguageContext } from './LanguageProvider';
import { useDarkmodeContext } from './DarkmodeProvider';

export const useToast = () => {
  const { translate } = useLanguageContext();
  const { theme } = useDarkmodeContext();

  const darkmodeStyles =
    theme === 'dark'
      ? {
          style: {
            backgroundColor: '#354c61',
            color: '#ffffff',
          },
        }
      : {};

  interface PromiseProps {
    loader: Promise<any>;
    options: {
      loading: Renderable;
      success: ValueOrFunction<Renderable, unknown>;
      error: ValueOrFunction<Renderable, any>;
    };
  }

  return useCallback(
    ({
      type = 'info',
      textKey,
      element,
      promise,
    }: {
      type: 'error' | 'success' | 'promise' | 'info';
      textKey?: TranslateTextKey;
      element?: ReactElement;
      promise?: PromiseProps;
    }) => {
      const content = element
        ? () => element
        : textKey
          ? translate(textKey)
          : 'Hot toast burnt';
      switch (type) {
        case 'error':
          hotToast.error(content, {
            ariaProps: { role: 'alert', 'aria-live': 'assertive' },
            ...darkmodeStyles,
          });
          break;
        case 'success':
          hotToast.success(content, {
            ariaProps: { role: 'alert', 'aria-live': 'assertive' },
            ...darkmodeStyles,
            duration: 4000,
          });
          break;
        case 'promise':
          if (promise !== undefined) {
            hotToast.promise(promise.loader, promise.options, {
              ariaProps: { role: 'alert', 'aria-live': 'assertive' },
              ...darkmodeStyles,
            });
          }
          break;
        case 'info':
        default:
          hotToast(content, {
            ariaProps: { role: 'alert', 'aria-live': 'assertive' },
            ...darkmodeStyles,
          });
          break;
      }
    },
    [theme],
  );
};
