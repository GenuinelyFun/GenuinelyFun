import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/icon_genuinely_fun_381x353.png';
import Menu from './Menu';
import styles from './Header.module.less';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} className={styles.logo} alt="Icon ice cube" />
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
