import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import { routePaths } from '../utils/route-utils';
import DropDownMenu from './DropDownMenu';
import styles from './Menu.module.less';

const Menu: FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  const { translate } = useLanguageContext();
  const location = useLocation();
  console.log(location.pathname);
  console.log(location.pathname === routePaths.feet);

  return (
    <nav className={styles.menu}>
      <Link
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === routePaths.home,
        })}
        to={routePaths.home}
        state={{ prevPage: location.pathname }}
        onClick={onLinkClick}
      >
        {translate('menu.homepage')}
      </Link>
      <Link
        to={routePaths.article}
        state={{ prevPage: location.pathname }}
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === routePaths.article,
        })}
        onClick={onLinkClick}
      >
        {translate('menu.articles')}
      </Link>
      <DropDownMenu
        buttonClassName={classNames(styles.menuButton, styles.dropdownButton)}
        buttonTextKey={'menu.projects'}
        listItems={[
          <Link
            key={routePaths.feet}
            to={routePaths.feet}
            state={{ prevPage: location.pathname }}
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === routePaths.feet,
            })}
            onClick={onLinkClick}
          >
            {translate('menu.feet')}
          </Link>,
          <Link
            key={routePaths.fweet}
            to={routePaths.fweet}
            state={{ prevPage: location.pathname }}
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === routePaths.fweet,
            })}
            onClick={onLinkClick}
          >
            {translate('menu.fweet')}
          </Link>,
          <Link
            key={routePaths.inno}
            to={routePaths.inno}
            state={{ prevPage: location.pathname }}
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === routePaths.inno,
            })}
            onClick={onLinkClick}
          >
            {translate('menu.inno')}
          </Link>,
        ]}
      />
      <DropDownMenu
        buttonClassName={classNames(styles.menuButton, styles.dropdownButton)}
        buttonTextKey={'menu.portfolios'}
        listItems={[
          <Link
            key={routePaths.arthur}
            state={{ prevPage: location.pathname }}
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === routePaths.arthur,
            })}
            to={routePaths.arthur}
            onClick={onLinkClick}
          >
            {translate('menu.arthur')}
          </Link>,
          <Link
            key={routePaths.nghi}
            state={{ prevPage: location.pathname }}
            className={classNames(styles.menuButton, styles.dropdownItem, {
              [styles.active]: location.pathname === routePaths.nghi,
            })}
            to={routePaths.nghi}
            onClick={onLinkClick}
          >
            {translate('menu.nghi')}
          </Link>,
        ]}
      />
    </nav>
  );
};

export default Menu;
