import { FC } from 'react';
import classNames from 'classnames';
import image from '../../assets/icons/image_test_560x560.png';
import codingIcon from '../../assets/icons/lightbulb_code.svg';
import websiteIcon from '../../assets/icons/website.svg';
import toolsicon from '../../assets/icons/tools.svg';
import { useLanguageContext } from '../../utils/LanguageProvider';
import GenericButton from '../../components/GenericButton';
import AuthorCard from '../../components/AuthorCard';
import Card, { IconPosition } from './Card';
import styles from './HomePage.module.less';

const HomePage: FC = () => {
  const { translate } = useLanguageContext();
  return (
    <main>
      <section className={styles.heroSection}>
        <img
          src={codingIcon}
          alt={translate('hero.lightbulb.aria')}
          className={styles.heroSectionIconLeft}
        />
        <div>
          <h1>
            {translate('hero.title.part1')}
            <span>{translate('hero.title.part2')}</span>
            {translate('hero.title.part3')}
          </h1>

          <p> {translate('hero.title.description')} </p>
        </div>
        <img
          src={websiteIcon}
          alt={translate('hero.webpage-on-screen.aria')}
          className={styles.heroSectionIconRight}
        />
      </section>
      <div className={styles.mainSection}>
        <AuthorCard author={'arthur'} className={styles.mainSection} />
        <AuthorCard
          author={'nghi'}
          className={styles.mainSection}
          flip={true}
        />

        <Card
          className={styles.mainSectionInfoBox}
          icon={
            <img
              src={toolsicon}
              alt={translate('infobox.angle-tool-pencil.aria')}
              className={styles.icon}
            />
          }
          iconPosition={IconPosition.LEFT}
          aria-label={translate('infobox.angle-tool-pencil.aria')}
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
      </div>
    </main>
  );
};

export default HomePage;
