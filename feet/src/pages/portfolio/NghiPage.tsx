import { FC, useState } from 'react';
import classNames from 'classnames';
import {
  certificates,
  course,
  nghiLinks,
  skills,
  volunteering,
} from '../../utils/nghi-utils';
import { Darkmode, useDarkmodeContext } from '../../utils/DarkmodeProvider';
import { useLanguageContext } from '../../utils/LanguageProvider';
import nghi from '../../assets/images/nghi_1276x1276.jpg';

import styles from './ArthurNghiPage.module.less';

const ArthurPage: FC = () => {
  const { translate } = useLanguageContext();
  const [visibleContent, setVisibleContent] = useState<number>(1);

  const handleButtonClick = (index: number) => {
    setVisibleContent(index);
  };

  const { theme } = useDarkmodeContext();

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <img
          src={nghi}
          alt={translate('author-card.nghi.aria')}
          className={styles.profileImage}
        />
        <div className={styles.headerContent}>
          <h1 className={styles.profileText}>
            {translate('author-card.nghi.title')},
          </h1>
          <div className={styles.socialMedia}>
            {Object.keys(nghiLinks).map((key) => {
              const link = nghiLinks[key];
              return (
                <a
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classNames({
                    [styles.lightSocialLinks]: theme === Darkmode.Light,
                  })}
                >
                  {link.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <h2>{translate('about.title')}</h2>
      <p>{translate('nghi.about.text.part1')}</p>
      <p>{translate('nghi.about.text.part2')}</p>
      <h3>{translate('experience.title')}</h3>
      <h4>{translate('nghi.experience.Posten-title')}</h4>
      <p>{translate('nghi.experience.Posten-description')}</p>
      <h4>{translate('nghi.experience.SpareBank-title')}</h4>
      <p>{translate('nghi.experience.SpareBank-description')}</p>
      <h4>{translate('nghi.experience.Experis-title')}</h4>
      <p>{translate('nghi.experience.Experis-description')}</p>

      <h3>{translate('education.title')}</h3>
      <h4>{translate('nghi.education.OsloUniversity-title')}</h4>
      <p>
        {translate('nghi.education.OsloUniversity-description')} <br />{' '}
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
          {translate('qualifications.course')}
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
          {course.map((course, index) => (
            <li key={index}>
              <h4>{translate(course.title)}</h4>
              <p>{translate(course.description)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ArthurPage;
