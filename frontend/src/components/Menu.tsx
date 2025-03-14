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
        {translate('tab.homepage')}
      </Link>
      <Link
        to={routePaths.article}
        state={{ prevPage: location.pathname }}
        className={classNames(styles.menuButton, {
          [styles.active]: location.pathname === routePaths.article,
        })}
        onClick={onLinkClick}
      >
        {translate('tab.articles')}
      </Link>
      <DropDownMenu
        buttonClassName={classNames(styles.menuButton, styles.dropdownButton)}
        buttonTextKey={'tab.projects'}
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
            {translate('tab.feet')}
          </Link>,
        ]}
      />
      <DropDownMenu
        buttonClassName={classNames(styles.menuButton, styles.dropdownButton)}
        buttonTextKey={'tab.portfolios'}
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
            {translate('tab.arthur')}
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
            {translate('tab.nghi')}
          </Link>,
        ]}
      />
    </nav>
  );
};

export default Menu;
