import React from 'react';
import styles from './Footer.module.less';

const Footer = (): JSX.Element => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h5>GenuinelyFun</h5>
          <p>E-mail: post@genuinelyfun.com</p>
          <p className={styles.allRightsReserved}>© 2024 GenuinelyFun.</p>
        </div>
        <div className={styles.column}>
          <h5>Nghi</h5>
        </div>
        <div className={styles.column}>
          <h5>Arthur</h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
