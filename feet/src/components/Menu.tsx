import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.less';

const Menu: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <Link to="/">Home</Link>
      <Link to="/feet">Feet</Link>
    </nav>
  );
};

export default Menu;
