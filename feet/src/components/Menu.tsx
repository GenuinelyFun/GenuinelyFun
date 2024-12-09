import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useWindowSize } from 'usehooks-ts';

import { useLanguageContext } from '../utils/LanguageProvider';
import { routePaths } from '../index';
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
          [styles.active]: location.pathname === routePaths.home,
        })}
        to="/"
        onClick={onLinkClick}
      >
        {translate('tab.homepage')}
      </Link>
      <Link
        to="/feet"
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === routePaths.feet,
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
              [styles.active]: location.pathname === routePaths.dropzone,
            })}
            to={routePaths.dropzone}
            onClick={onLinkClick}
          >
            {translate('tab.dropzone')}
          </Link>,
          <Link
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]:
                location.pathname === routePaths.techBestPractice,
            })}
            to={routePaths.techBestPractice}
            onClick={onLinkClick}
          >
            {translate('tab.tech-best-practice')}
          </Link>,
        ]}
      />
      <DropDownMenu
        buttonClassName={classNames(styles.menuButton, styles.dropdownButton)}
        buttonTextKey={'tab.portfolio'}
        listItems={[
          <Link
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === routePaths.arthur,
            })}
            to={routePaths.arthur}
            onClick={onLinkClick}
          >
            {translate('tab.arthur')}
          </Link>,
          <Link
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === routePaths.nghi,
            })}
            to={routePaths.nghi}
            onClick={onLinkClick}
          >
            {translate('tab.nghi')}
          </Link>,
        ]}
      />
    </nav>
  );
};

export default Menu;
