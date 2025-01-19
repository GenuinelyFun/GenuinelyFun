import { FC } from 'react';
import classNames from 'classnames';
import image from '../../assets/icons/image_test_560x560.png';
import toolsicon from '../../assets/icons/tools.svg';
import { useLanguageContext } from '../../utils/LanguageProvider';
import GenericButton from '../../components/GenericButton';
import AuthorCard from '../../components/AuthorCard';
import Card, { IconPosition } from './Card';
import styles from './HomePage.module.less';
import { useToggle } from '../togglePage/useToggle';

const HomePage: FC = () => {
  const { translate } = useLanguageContext();
  const { isAdvertisementShowing, isAboutUsShowing } = useToggle();
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
        {isAdvertisementShowing && (
          <Card
            className={styles.mainSectionInfoBox}
            iconPosition={IconPosition.LEFT}
          >
            <div className={classNames(styles.cardContent, styles.mainContent)}>
              <h2>
                {translate('infobox.title.part1')}
                <span>{translate('infobox.title.part2')}</span>
                {translate('infobox.title.part3')}
              </h2>
              <p>{translate('infobox.description')}</p>
              <GenericButton
                onClick={() => console.log('I DO NOTHING YET TODO TODO TODO')}
                invert={true}
              >
                {translate('infobox.button')}
              </GenericButton>
            </div>
          </Card>
        )}
        {isAboutUsShowing && (
          <Card
            icon={
              <img
                src={image}
                alt={translate('about-us.test-image.aria')}
                className={styles.genericImage}
              />
            }
            iconPosition={IconPosition.RIGHT}
          >
            <div className={styles.cardContent}>
              <h2>{translate('about-us.title')}</h2>
              <p>{translate('about-us.description')}</p>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
};

export default HomePage;
