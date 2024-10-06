import React from 'react';
import { useLanguageContext } from '../utils/LanguageProvider';
import { Link, useLocation } from 'react-router-dom';
import styles from './Menu.module.less';
import classNames from 'classnames';

const Menu: React.FC = () => {
  const { translate } = useLanguageContext();
  const location = useLocation();
  return (
    <nav className={styles.menu}>
      <Link
        className={classNames(styles.link, {
          [styles.active]: location.pathname === '/',
        })}
        to="/"
      >
        {translate('tab.homepage')}
      </Link>
      <Link
        className={classNames(styles.link, {
          [styles.active]: location.pathname === '/feet',
        })}
        to="/feet"
      >
        {translate('tab.feet')}
      </Link>
    </nav>
  );
};

export default Menu;
