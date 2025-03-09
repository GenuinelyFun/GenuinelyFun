import classNames from 'classnames';
import { FC, useState } from 'react';

import nghi from '../../assets/images/nghi_1276x1276.jpg';
import PageHeading from '../../components/PageHeading';
import { Darkmode, useDarkmodeContext } from '../../utils/DarkmodeProvider';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import {
  additionalWork,
  certificates,
  course,
  NGHI_FIRSTNAME,
  NGHI_FULLNAME,
  nghiLinks,
} from '../../utils/nghi-utils';
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
          alt={translate('author-card.aria', { name: NGHI_FIRSTNAME })}
          className={styles.profileImage}
        />
        <div className={styles.headerContent}>
          <PageHeading className={styles.profileText}>
            {translate('author-card.title', { name: NGHI_FULLNAME })}
          </PageHeading>
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
      <h2>{translate('nghi.about.title')}</h2>
      <p className={styles.paragraph}>{translate('nghi.about.intro')}</p>
      <p className={styles.paragraph}>{translate('nghi.about.reliable')}</p>
      <p className={styles.paragraph}>
        {translate('nghi.about.accessibility')}
      </p>
      <h3 className={styles.categoryTitle}>
        {translate('nghi.experience.title')}
      </h3>
      <h4 className={styles.categorySubtitle}>
        {translate('nghi.experience.Posten-title')}
      </h4>
      <p className={styles.paragraph}>
        {translate('nghi.experience.Posten-description')}
      </p>
      <h4 className={styles.categorySubtitle}>
        {translate('nghi.experience.SpareBank-title')}
      </h4>
      <p className={styles.paragraph}>
        {translate('nghi.experience.SpareBank-description')}
      </p>
      <h4 className={styles.categorySubtitle}>
        {translate('nghi.experience.Experis-title')}
      </h4>
      <p className={styles.paragraph}>
        {translate('nghi.experience.Experis-description')}
      </p>

      <h3 className={styles.categoryTitle}>
        {translate('nghi.education.title')}
      </h3>
      <h4 className={styles.categorySubtitle}>
        {translate('nghi.education.OsloUniversity-title')}
      </h4>
      <p className={styles.paragraph}>
        {translate('nghi.education.OsloUniversity-description')} <br />{' '}
      </p>
      <h3 className={styles.categoryTitle}>
        {translate('nghi.qualifications.title', { test: 'hullo' })}
      </h3>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => handleButtonClick(1)}
          className={classNames(styles.button, {
            [styles.activeButton]: visibleContent === 1,
          })}
        >
          {translate('nghi.qualifications.certificate')}
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          className={classNames(styles.button, {
            [styles.activeButton]: visibleContent === 2,
          })}
        >
          {translate('nghi.qualifications.work')}
        </button>
        <button
          onClick={() => handleButtonClick(3)}
          className={classNames(styles.button, {
            [styles.activeButton]: visibleContent === 3,
          })}
        >
          {translate('nghi.qualifications.course')}
        </button>
      </div>
      {visibleContent === 1 && (
        <ul>
          {certificates.map((skills, index) => (
            <li key={index}>
              <h4 className={styles.categorySubtitle}>
                {translate(skills.title)}
              </h4>
              <p className={styles.paragraph}>
                {translate(skills.description)}
              </p>
            </li>
          ))}
        </ul>
      )}
      {visibleContent === 2 && (
        <ul>
          {additionalWork.map((other, index) => (
            <li key={index}>
              <h4 className={styles.categorySubtitle}>
                {translate(other.title)}
              </h4>
              <p className={styles.paragraph}>{translate(other.description)}</p>
            </li>
          ))}
        </ul>
      )}
      {visibleContent === 3 && (
        <ul>
          {course.map((course, index) => (
            <li key={index}>
              <h4 className={styles.categorySubtitle}>
                {translate(course.title)}
              </h4>
              <p className={styles.paragraph}>
                {translate(course.description)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ArthurPage;
