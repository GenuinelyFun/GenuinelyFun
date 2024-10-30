import { FC } from 'react';
import classNames from 'classnames';
import image from '../../assets/icons/image_test_560x560.png';
import codingIcon from '../../assets/icons/lightbulb_code.svg';
import websiteIcon from '../../assets/icons/website.svg';
import nghi from '../../assets/images/nghi_1276x1276.jpg';
import arthur from '../../assets/images/arthur_1740x1740.jpg';
import toolsicon from '../../assets/icons/tools.svg';
import { useLanguageContext } from '../../utils/LanguageProvider';
import GenericButton from '../../components/GenericButton';
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
        <Card
          icon={
            <img
              src={nghi}
              alt={translate('author-card.nghi.aria')}
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.LEFT}
        >
          <div className={styles.cardContent}>
            <h2>{translate('about-card.nghi.title')} </h2>
            <p>{translate('about-card.nghi.description')} </p>
          </div>
        </Card>

        <Card
          icon={
            <img
              src={arthur}
              alt={translate('author-card.arthur.aria')}
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.RIGHT}
        >
          <div className={styles.cardContent}>
            <h2>{translate('about-card.arthur.title')} </h2>
            <p>{translate('about-card.arthur.description')} </p>
          </div>
        </Card>

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
