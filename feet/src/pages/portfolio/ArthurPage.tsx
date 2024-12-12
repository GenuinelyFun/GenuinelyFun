import { FC, useState } from 'react';
import classNames from 'classnames';
import {
  arthurLinks,
  certificates,
  honors,
  skills,
  volunteering,
} from '../../utils/arthur-utils';
import { useLanguageContext } from '../../utils/LanguageProvider';
import arthur from '../../assets/images/arthur_1740x1740.jpg';

import styles from './ArthurPage.module.less';

const ArthurPage: FC = () => {
  const { translate } = useLanguageContext();
  const [visibleContent, setVisibleContent] = useState<number>(1);

  const handleButtonClick = (index: number) => {
    setVisibleContent(index);
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <img
          src={arthur}
          alt={translate('author-card.arthur.aria')}
          className={styles.profileImage}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.profileText}>
            {translate('author-card.arthur.title')},
          </h1>
          <div className={styles.socialMedia}>
            {Object.keys(arthurLinks).map((key) => {
              const link = arthurLinks[key];
              return (
                <a key={key} href={link.url}>
                  {link.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <h2>{translate('about.title')}</h2>
      <p>{translate('arthur.about.text.part1')}</p>
      <p>{translate('arthur.about.text.part2')}</p>
      <h3>{translate('experience.title')}</h3>
      <h4>{translate('arthur.experience.EDA2-title')}</h4>
      <p>{translate('arthur.experience.EDA2-description')}</p>
      <h4>{translate('arthur.experience.SE-title')}</h4>
      <p>{translate('arthur.experience.SE-description')}</p>
      <h4>{translate('arthur.experience.EDA1-title')}</h4>
      <p>{translate('arthur.experience.EDA1-description')}</p>
      <h4>{translate('arthur.experience.Sonnico-title')}</h4>
      <p>{translate('arthur.experience.Sonnico-description')}</p>
      <h3>{translate('education.title')}</h3>
      <h4>{translate('arthur.education.JessheimVGS-title')}</h4>
      <p>
        {translate('arthur.education.JessheimVGS-description')} <br />{' '}
        {translate('arthur.education.JessheimVGS-description-extra')}
      </p>
      <h3>{translate('qualifications.title')}</h3>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => handleButtonClick(1)}
          className={classNames({
            [styles.activeButton]: visibleContent === 1,
          })}
        >
          {translate('qualifications.certificate')}
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          className={classNames({
            [styles.activeButton]: visibleContent === 2,
          })}
        >
          {translate('qualifications.skills')}
        </button>
        <button
          onClick={() => handleButtonClick(3)}
          className={classNames({
            [styles.activeButton]: visibleContent === 3,
          })}
        >
          {translate('qualifications.volunteering')}
        </button>
        <button
          onClick={() => handleButtonClick(4)}
          className={classNames({
            [styles.activeButton]: visibleContent === 4,
          })}
        >
          {translate('qualifications.honors')}
        </button>
      </div>
      {visibleContent === 1 && (
        <ul>
          {certificates.map((skills, index) => (
            <li key={index}>
              <h4>{translate(skills.title)}</h4>
              <p>{translate(skills.description)}</p>
            </li>
          ))}
        </ul>
      )}
      {visibleContent === 2 && (
        <ul>
          {skills.map((certificate, index) => (
            <li key={index}>
              <h4>{translate(certificate.title)}</h4>
              <p>{translate(certificate.description)}</p>
            </li>
          ))}
        </ul>
      )}
      {visibleContent === 3 && (
        <ul>
          {volunteering.map((volunteering, index) => (
            <li key={index}>
              <h4>{translate(volunteering.title)}</h4>
              <p>{translate(volunteering.description)}</p>
            </li>
          ))}
        </ul>
      )}
      {visibleContent === 4 && (
        <ul>
          {honors.map((honors, index) => (
            <li key={index}>
              <h4>{translate(honors.title)}</h4>
              <p>{translate(honors.description)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ArthurPage;
