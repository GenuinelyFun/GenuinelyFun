import { FC } from 'react';
import { useLanguageContext } from '../utils/LanguageProvider';
import { useMobileSizes } from '../utils/useMobileSizes';
import { nghiLinks } from '../utils/nghi-utils';
import { arthurLinks } from '../utils/arthur-utils';
import styles from './Footer.module.less';

const Footer: FC = () => {
  const { translate } = useLanguageContext();
  const { isNotDesktop, isDesktop } = useMobileSizes();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h5>{translate('genuinelyfun.name')}</h5>
          <a href={'mailto:' + translate('genuinelyfun.email')}>
            {isNotDesktop
              ? translate('email-us')
              : `${translate('email')}: ${translate('genuinelyfun.email')}`}
          </a>
          <p className={styles.allRightsReserved}>
            {translate('genuinelyfun.all_rights_reserved') +
              ' ' +
              translate('genuinelyfun.name')}
          </p>
        </div>
        <div className={styles.column}>
          <h5>{translate('nghi.firstname')}</h5>
          <ul className={styles.linkList}>
            {Object.values(nghiLinks).map((link) => (
              <li key={link.name} className={styles.link}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  {isDesktop && link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h5>{translate('arthur.firstname')}</h5>
          <ul className={styles.linkList}>
            {Object.values(arthurLinks).map((link) => (
              <li key={link.name} className={styles.link}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                  {isDesktop && link.name}
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
