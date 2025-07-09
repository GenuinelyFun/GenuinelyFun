import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import MoonImage from '../../assets/images/MoonImage.tsx';
import RocketImage from '../../assets/images/RocketImage.tsx';
import WorkingAstronautImage from '../../assets/images/WorkingAstronautImage.tsx';
import GenericButton from '../../components/GenericButton';
import PageHeading from '../../components/PageHeading';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import styles from './NotFoundPage.module.less';

const NotFoundPage: FC = () => {
  const { translate } = useLanguageContext();
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <PageHeading className={styles.title}>{translate('not-found-page.title')}</PageHeading>
        <p className={styles.description}>{translate('not-found-page.paragraph')}</p>
        <GenericButton className={styles.button} onClick={() => navigate('/')}>
          {translate('not-found-page.button')}
        </GenericButton>
      </div>

      <MoonImage className={styles.moon} aria-label={translate('not-found-page.alt.moon')} />
      <RocketImage
        className={styles.rocket}
        aria-label={translate('not-found-page.alt.rocket')}
      />
      <WorkingAstronautImage
        className={styles.astronaut}
        aria-label={translate('not-found-page.alt.astronaut')}
      />
    </main>
  );
};

export default NotFoundPage;
