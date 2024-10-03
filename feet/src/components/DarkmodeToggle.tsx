import { useState } from 'react';
import { Darkmode, useDarkmodeContext } from '../utils/DarkmodeProvider';
import styles from './DarkmodeToggle.module.less';
import { ReactComponent as SunIcon } from '../assets/icons/toggle-sun.svg';
import { ReactComponent as MoonIcon } from '../assets/icons/toggle-moon.svg';

interface DarkmodeToggleProps {
  className?: string;
}

const DarkmodeToggle: React.FC<DarkmodeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useDarkmodeContext();
  const [isToggled, setIsToggled] = useState(false);

  const handleClick = () => {
    toggleTheme();
    setIsToggled(!isToggled);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Toggle ${theme === Darkmode.Dark ? 'light' : 'dark'} mode`}
      className={`${styles.darkmodeToggle} ${className}`}
    >
      {theme === Darkmode.Dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default DarkmodeToggle;
