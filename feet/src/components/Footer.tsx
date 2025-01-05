import { FC } from 'react';
import { useLanguageContext } from '../utils/LanguageProvider';
import styles from './Footer.module.less';
import { nghiLinks } from '../utils/nghi-utils';
import { arthurLinks } from '../utils/arthur-utils';
import { useMobileSizes } from '../utils/useMobileSizes';

const Footer: FC = () => {
  const { translate } = useLanguageContext();
  const { isNotDesktop } = useMobileSizes();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h5>GenuinelyFun</h5>
          <a href={'mailto:post@genuinelyfun.com'}>
            {isNotDesktop
              ? translate('email-us')
              : `${translate('email')}: post@genuinelyfun.com`}
          </a>
          <p className={styles.allRightsReserved}>© 2024 GenuinelyFun.</p>
        </div>
        <div className={styles.column}>
          <h5>Nghi</h5>
          <ul className={styles.linkList}>
            {Object.values(nghiLinks).map((link) => (
              <li key={link.name} className={styles.link}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  {isNotDesktop && link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h5>Arthur</h5>
          <ul className={styles.linkList}>
            {Object.values(arthurLinks).map((link) => (
              <li key={link.name} className={styles.link}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  {isNotDesktop && link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
