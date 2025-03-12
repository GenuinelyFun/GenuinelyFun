import { FC } from 'react';

import { ARTHUR_FIRSTNAME, arthurLinks } from '../utils/arthur-utils';
import {
  COMPANY_ALL_RIGHTS_RESERVED,
  COMPANY_EMAIL,
  COMPANY_NAME,
} from '../utils/constants.tsx';
import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import { NGHI_FIRSTNAME, nghiLinks } from '../utils/nghi-utils';
import { useMobileSizes } from '../utils/useMobileSizes';
import styles from './Footer.module.less';

const Footer: FC = () => {
  const { translate } = useLanguageContext();
  const { isNotDesktop, isDesktop } = useMobileSizes();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <h5>{COMPANY_NAME}</h5>
          <a href={'mailto:' + COMPANY_EMAIL}>
            {isNotDesktop
              ? translate('email-us')
              : `${translate('email')}: ${COMPANY_EMAIL}`}
          </a>
          <p className={styles.allRightsReserved}>
            {COMPANY_ALL_RIGHTS_RESERVED}
            {new Date().getFullYear()} {COMPANY_NAME}
          </p>
        </div>
        <div className={styles.column}>
          <h5>{NGHI_FIRSTNAME}</h5>
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
          <h5>{ARTHUR_FIRSTNAME}</h5>
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
