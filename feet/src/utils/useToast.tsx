import { ReactElement, useCallback } from 'react';
import hotToast, { Renderable, ValueOrFunction } from 'react-hot-toast';
import { TranslateTextKeyType, useLanguageContext } from './LanguageProvider';
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
      textKey?: TranslateTextKeyType;
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
          hotToast.error(content, darkmodeStyles);
          break;
        case 'success':
          hotToast.success(content, { ...darkmodeStyles, duration: 4000 });
          break;
        case 'promise':
          if (promise !== undefined) {
            hotToast.promise(promise.loader, promise.options, darkmodeStyles);
          }
          break;
        case 'info':
        default:
          hotToast(content, darkmodeStyles);
          break;
      }
    },
    [theme],
  );
};
