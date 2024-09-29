import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/icon_genuinely_fun_381x353.png';
import Menu from './Menu';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__icon-logo" alt="Icon ice cube" />
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
