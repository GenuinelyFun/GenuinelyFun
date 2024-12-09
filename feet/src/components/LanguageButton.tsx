import classNames from 'classnames';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/LanguageProvider';
import DropDownMenu from './DropDownMenu';
import styles from './LanguageButton.module.less';

const LanguageButton = () => {
  const { languages, onClickLanguageChange, i18n, translate } =
    useLanguageContext();

  return (
    <DropDownMenu
      buttonTextKey={i18n.language as TranslateTextKey}
      buttonClassName={styles.button}
      buttonAriaLabel={translate('language.aria-label')}
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
