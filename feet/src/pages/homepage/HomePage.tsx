import { FC } from 'react';
import { useLanguageContext } from '../../utils/LanguageProvider';
import AuthorCard from '../../components/AuthorCard';
import styles from './HomePage.module.less';

const HomePage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <main>
      <section className={styles.heroSection}>
        <h1>
          {translate('hero.title', {firstname: translate('nghi.firstname'), secondname:translate('arthur.firstname')})}
        </h1>
        <h2>
          {translate('hero.subtitle', {companyName: translate('genuinelyfun.name')})}
        </h2>
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
