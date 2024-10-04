import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import DarkmodeToggle from './DarkmodeToggle';
import styles from './Header.module.less';
import iconGenuinelyFun from '../assets/icons/icon_genuinely_fun_381x353.png';
import LanguageButton from './LanguageButton';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img
          src={iconGenuinelyFun}
          alt="Genuinely Fun Icon"
          className={styles.funIcon}
        />
      </Link>
      <div className={styles.menuContainer}>
        <Menu />
      </div>
      <div className={styles.buttonContainer}>
        <DarkmodeToggle />
        <LanguageButton />
      </div>
    </header>
  );
};

export default Header;
