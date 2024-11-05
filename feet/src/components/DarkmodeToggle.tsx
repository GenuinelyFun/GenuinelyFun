import { FC, useState } from 'react';
import { ReactComponent as SunIcon } from '../assets/icons/toggle-sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/toggle-moon.svg';
import { Darkmode, useDarkmodeContext } from '../utils/DarkmodeProvider';
import styles from './DarkmodeToggle.module.less';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/LanguageProvider';

interface DarkmodeToggleProps {
  className?: string;
}

const DarkmodeToggle: FC<DarkmodeToggleProps> = ({ className }) => {
  const { translate } = useLanguageContext();
  const { theme, toggleTheme } = useDarkmodeContext();
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    toggleTheme();
    setIsToggled(!isToggled);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={translate(`theme-toggle.${theme}.aria` as TranslateTextKey)}
      className={`${styles.darkmodeToggle} ${className}`}
    >
      {theme === Darkmode.Dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default DarkmodeToggle;
