import React from 'react';
import styles from './Footer.module.less';
import { useLanguageContext } from '../utils/LanguageProvider';

const Footer = (): JSX.Element => {
  const { translate } = useLanguageContext();
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h5>GenuinelyFun</h5>
          <p>{translate('email')}: post@genuinelyfun.com</p>
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
