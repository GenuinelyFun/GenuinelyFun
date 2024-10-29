import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguageContext } from '../../utils/LanguageProvider';
import moon from '../../assets/icons/moon.svg';
import rocket from '../../assets/icons/rocket.svg';
import astronaut from '../../assets/icons/astronaut_working.svg';
import GenericButton from '../../components/GenericButton';
import styles from './NotFoundPage.module.less';

const NotFoundPage = (): JSX.Element => {
  const { translate } = useLanguageContext();
  const navigate = useNavigate();

  return (
    <main className={styles.pagenotfound}>
      <h1>{translate('title')}</h1>
      <p>{translate('paragraph')}</p>

      <GenericButton className={styles.button} onClick={() => navigate('/')}>
        {translate('button')}
      </GenericButton>
      <img src={moon} className={styles.moon} alt={translate('alt.moon')} />
      <img
        src={rocket}
        className={styles.rocket}
        alt={translate('alt.rocket')}
      />
      <img
        src={astronaut}
        className={styles.astronaut}
        alt={translate('alt.astronaut')}
      />
    </main>
  );
};

export default NotFoundPage;
