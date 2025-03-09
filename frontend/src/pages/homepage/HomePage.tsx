import { FC } from 'react';

import AuthorCard from '../../components/AuthorCard';
import PageHeading from '../../components/PageHeading';
import { ARTHUR_FIRSTNAME } from '../../utils/arthur-utils';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { NGHI_FIRSTNAME } from '../../utils/nghi-utils';
import { COMPANY_NAME } from '../../utils/route-utils.ts';
import styles from './HomePage.module.less';

const HomePage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <main>
      <section className={styles.heroSection}>
        <PageHeading>
          {translate('hero.title', {
            firstname: NGHI_FIRSTNAME,
            secondname: ARTHUR_FIRSTNAME,
          })}
        </PageHeading>
        <h2>{translate('hero.subtitle', { companyName: COMPANY_NAME })}</h2>
      </section>
      <div className={styles.mainSection}>
        <AuthorCard author={'arthur'} className={styles.mainSection} />
        <AuthorCard
          author={'nghi'}
          className={styles.mainSection}
          flip={true}
        />
      </div>
    </main>
  );
};

export default HomePage;
