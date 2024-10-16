import classNames from 'classnames';
import {
  TranslateTextKeyType,
  useLanguageContext,
} from '../utils/LanguageProvider';
import styles from './LanguageButton.module.less';
import DropDownMenu from './DropDownMenu';

const LanguageButton = () => {
  const { languages, onClickLanguageChange, i18n, translate } =
    useLanguageContext();

  return (
    <DropDownMenu
      buttonTextKey={i18n.language as TranslateTextKeyType}
      buttonClassName={styles.button}
      listItems={Object.keys(languages).map((key) => (
        <button
          key={key}
          value={key}
          className={classNames(styles.dropdown, {
            [styles.active]: i18n.language === key,
          })}
          onClick={() => onClickLanguageChange(key)}
        >
          {languages[key]}
        </button>
      ))}
    />
  );
};

export default LanguageButton;

export const languageText = {
  'language.aria-label': {
    en: 'Select language',
    no: 'Velg språk',
    nn: 'Vel språk',
  },
  no: {
    en: 'Norsk',
    no: 'Norsk',
    nn: 'Norsk',
  },
  nn: {
    en: 'Nynorsk',
    no: 'Nynorsk',
    nn: 'Nynorsk',
  },
  en: {
    en: 'English',
    no: 'English',
    nn: 'English',
  },
};
