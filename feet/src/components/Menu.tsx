import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useLanguageContext } from '../utils/LanguageProvider';
import DropDownMenu from './DropDownMenu';
import styles from './Menu.module.less';

const Menu: React.FC = () => {
  const { translate } = useLanguageContext();
  const location = useLocation();

  return (
    <nav className={styles.menu}>
      <Link
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === '/',
        })}
        to="/"
      >
        {translate('tab.homepage')}
      </Link>
      <Link
        to="/feet"
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === '/feet',
        })}
      >
        {translate('tab.feet')}
      </Link>
      <DropDownMenu
        buttonClassName={classNames(styles.menuButton, styles.dropdownButton)}
        buttonTextKey={'tab.journal'}
        listItems={[
          <Link
            key="dropzone"
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === '/dropzone',
            })}
            to="/dropzone"
          >
            {translate('tab.dropzone')}
          </Link>,
        ]}
      />
    </nav>
  );
};

export default Menu;

export const MenuText = {
  'tab-homepage': {
    en: 'Home',
    no: 'Hjem',
  },
  'tab-feet': {
    en: 'FEET',
    no: 'FEET',
  },
};
