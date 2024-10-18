import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useWindowSize } from 'usehooks-ts';

import { useLanguageContext } from '../utils/LanguageProvider';
import DropDownMenu from './DropDownMenu';

import styles from './Menu.module.less';

const Menu: FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  const { translate } = useLanguageContext();
  const location = useLocation();
  const { width } = useWindowSize();

  return (
    <nav className={styles.menu}>
      <Link
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === '/',
        })}
        to="/"
        onClick={onLinkClick}
      >
        {translate('tab.homepage')}
      </Link>
      <Link
        to="/feet"
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === '/feet',
        })}
        onClick={onLinkClick}
      >
        {translate('tab.feet')}
      </Link>
      <DropDownMenu
        buttonClassName={classNames(styles.menuButton, styles.dropdownButton)}
        buttonTextKey={'tab.journal'}
        listItems={[
          <Link
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === '/dropzone',
            })}
            to="/dropzone"
            onClick={onLinkClick}
          >
            {translate('tab.dropzone')}
          </Link>,
          <Link
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === '/tech-best-practice',
            })}
            to="/tech-best-practice"
            onClick={onLinkClick}
          >
            {translate('tab.tech.best.practice')}
          </Link>,
        ]}
      />
    </nav>
  );
};

export default Menu;
