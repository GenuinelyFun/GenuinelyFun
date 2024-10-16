import { FC } from 'react';
import classNames from 'classnames';
import image from '../../assets/icons/image_test_560x560.png';
import codingIcon from '../../assets/icons/lightbulb_code.svg';
import websiteIcon from '../../assets/icons/website.svg';
import nghi from '../../assets/images/nghi_1276x1276.jpg';
import arthur from '../../assets/images/arthur_1740x1740.jpg';
import { ReactComponent as ToolsIcon } from '../../assets/icons/tools.svg';
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
          alt="Coding Icon"
          className={styles.heroSectionIconLeft}
        />
        <div>
          <h1>
            {translate('hero-section.title-part1')}
            <span>{translate('hero-section.title-part2')}</span>
            {translate('hero-section.title-part3')}
          </h1>

          <p> {translate('hero-section.description')} </p>
        </div>
        <img
          src={websiteIcon}
          alt="Website Icon"
          className={styles.heroSectionIconRight}
        />
      </section>
      <div className={styles.mainSection}>
        <Card
          icon={
            <img
              src={nghi}
              alt="A picture of Nghi"
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.LEFT}
        >
          <div className={styles.cardContent}>
            <h2>{translate('main.nghi.title')} </h2>
            <p>{translate('main.nghi.description')} </p>
          </div>
        </Card>

        <Card
          icon={
            <img
              src={arthur}
              alt="A picture of Arthur"
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.RIGHT}
        >
          <div className={styles.cardContent}>
            <h2>{translate('main.arthur.title')} </h2>
            <p>{translate('main.arthur.description')} </p>
          </div>
        </Card>

        <Card
          className={styles.mainSectionInfoBox}
          icon={<ToolsIcon className={styles.icon} />}
          iconPosition={IconPosition.LEFT}
        >
          <div className={classNames(styles.cardContent, styles.mainContent)}>
            <h2>
              {translate('main-section.infobox.title-part1')}
              <span>{translate('main-section.infobox.title-part2')}</span>
              {translate('main-section.infobox.title-part3')}
            </h2>
            <p>{translate('main-section.infobox-description')}</p>
            <GenericButton
              onClick={() => console.log('I DO NOTHING YET TODO TODO TODO')}
              buttonText={translate('main-section.infobox-button')}
              invert={true}
            />
          </div>
        </Card>
        <Card
          icon={
            <img
              src={image}
              alt="A test image"
              className={styles.genericImage}
            />
          }
          iconPosition={IconPosition.RIGHT}
        >
          <div className={styles.cardContent}>
            <h2>{translate('main-section.footsteps.title')}</h2>
            <p>{translate('main-section.footsteps.description')}</p>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
