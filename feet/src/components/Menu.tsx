import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Menu.module.less';
import classNames from 'classnames';

const Menu: React.FC = () => {
  const location = useLocation();
  return (
    <nav className={styles.menu}>
      <Link
        className={classNames(styles.link, {
          [styles.active]: location.pathname === '/',
        })}
        to="/"
      >
        Home
      </Link>
      <Link
        className={classNames(styles.link, {
          [styles.active]: location.pathname === '/feet',
        })}
        to="/feet"
      >
        Feet
      </Link>
    </nav>
  );
};

export default Menu;
