import { useLanguageContext } from '../utils/LanguageProvider';

const LanguageSelect = () => {
  const { languages, onClickLanguageChange, i18n } = useLanguageContext();

  return (
    <form>
      {Object.keys(languages).map((key) => (
        <label key={key}>
          {languages[key]}
          <input
            onChange={onClickLanguageChange}
            type="radio"
            key={key}
            value={key}
            checked={i18n.language === key}
          />
        </label>
      ))}
    </form>
  );
};

export default LanguageSelect;
