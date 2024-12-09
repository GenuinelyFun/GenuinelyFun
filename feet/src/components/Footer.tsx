import { FC } from 'react';
import { useLanguageContext } from '../utils/LanguageProvider';
import styles from './Footer.module.less';

const Footer: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h5>GenuinelyFun</h5>
          <a href={'mailto:post@genuinelyfun.com'}>
            {translate('email')}: post@genuinelyfun.com
          </a>
          <p className={styles.allRightsReserved}>© 2024 GenuinelyFun.</p>
        </div>
        <div className={styles.column}>
          <h5>Nghi</h5>
        </div>
        <div className={styles.column}>
          <h5>Arthur</h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
