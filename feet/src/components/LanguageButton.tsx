import { useLanguageContext } from '../utils/LanguageProvider';
import styles from './LanguageButton.module.less';

const LanguageButton = () => {
  const { languages, onClickLanguageChange, i18n, translate } =
    useLanguageContext();

  return (
    <select
      onChange={(e) => onClickLanguageChange(e.target.value)}
      value={i18n.language}
      className={styles.button}
      aria-label={translate('language-aria-label')}
    >
      {Object.keys(languages).map((key) => (
        <option key={key} value={key} className={styles.dropdown}>
          {languages[key]}
        </option>
      ))}
    </select>
  );
};

export default LanguageButton;

export const languageText = {
  'language-aria-label': {
    en: 'Select language',
    no: 'Velg språk',
  },
};
