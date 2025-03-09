import { FC, useState } from 'react';

import MoonIcon from '../assets/icons/MoonIcon';
import SunIcon from '../assets/icons/SunIcon';
import { Darkmode, useDarkmodeContext } from '../utils/darkmode-utils.ts';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/i18n/language-utils.ts';
import styles from './DarkmodeToggle.module.less';

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
