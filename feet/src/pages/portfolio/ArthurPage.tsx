import { FC, useEffect, useState } from 'react';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import arthur from '../../assets/images/arthur_1740x1740.jpg';
import { arthurLinks } from '../journalpage/AuthorCard';
import styles from './ArthurPage.module.less';
import classNames from 'classnames';
import { Darkmode, useDarkmodeContext } from '../../utils/DarkmodeProvider';
import { useLocation } from 'react-router-dom';

const ArthurPage: FC = () => {
  const { translate } = useLanguageContext();
  const [visibleContent, setVisibleContent] = useState<number>(1);

  const handleButtonClick = (index: number) => {
    setVisibleContent(index);
  };

  const certificates: Record<string, TranslateTextKey>[] = [
    {
      title: 'arthur.certificate.FG750-title',
      description: 'arthur.certificate.FG750-description',
    },
    {
      title: 'arthur.certificate.EPC-title',
      description: 'arthur.certificate.EPC-description',
    },
    {
      title: 'arthur.certificate.TOA-title',
      description: 'arthur.certificate.TOA-description',
    },
    {
      title: 'arthur.certificate.ASD531-title',
      description: 'arthur.certificate.ASD531-description',
    },
    {
      title: 'arthur.certificate.Securiton-title',
      description: 'arthur.certificate.Securiton-description',
    },
    {
      title: 'arthur.certificate.CEAG-title',
      description: 'arthur.certificate.CEAG-description',
    },
    {
      title: 'arthur.certificate.DARDO-title',
      description: 'arthur.certificate.DARDO-description',
    },
    {
      title: 'arthur.certificate.Eltek-title',
      description: 'arthur.certificate.Eltek-description',
    },
    {
      title: 'arthur.certificate.Autosafe-title',
      description: 'arthur.certificate.Autosafe-description',
    },
    {
      title: 'arthur.certificate.ElectricalControl-title',
      description: 'arthur.certificate.ElectricalControl-description',
    },
    {
      title: 'arthur.certificate.Thermography-title',
      description: 'arthur.certificate.Thermography-description',
    },
    {
      title: 'arthur.certificate.Autoprime-title',
      description: 'arthur.certificate.Autoprime-description',
    },
    {
      title: 'arthur.certificate.FXNET-title',
      description: 'arthur.certificate.FXNET-description',
    },
    {
      title: 'arthur.certificate.PRODEX-title',
      description: 'arthur.certificate.PRODEX-description',
    },
    {
      title: 'arthur.certificate.FirePrevention-title',
      description: 'arthur.certificate.FirePrevention-description',
    },
    {
      title: 'arthur.certificate.Magnum-title',
      description: 'arthur.certificate.Magnum-description',
    },
  ];

  const skills: Record<string, TranslateTextKey>[] = [
    {
      title: 'arthur.skills.developer-title',
      description: 'arthur.skills.developer-description',
    },
    {
      title: 'arthur.skills.technician-title',
      description: 'arthur.skills.technician-description',
    },
  ];

  const volunteering: Record<string, TranslateTextKey>[] = [
    {
      title: 'arthur.volunteering.RK-title',
      description: 'arthur.volunteering.RK-description',
    },
    {
      title: 'arthur.volunteering.visual-design-title',
      description: 'arthur.volunteering.visual-design-description',
    },
    {
      title: 'arthur.volunteering.BSU-title',
      description: 'arthur.volunteering.BSU-description',
    },
  ];

  const honors: Record<string, TranslateTextKey>[] = [
    {
      title: 'arthur.honors.world-skills-norway-title',
      description: 'arthur.honors.world-skills-norway-description',
    },
    {
      title: 'arthur.honors.norwaycup-sanshou-title',
      description: 'arthur.honors.norwaycup-sanshou-description',
    },
  ];

  const { theme } = useDarkmodeContext();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
                <a
                  key={key}
                  href={link.url}
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
