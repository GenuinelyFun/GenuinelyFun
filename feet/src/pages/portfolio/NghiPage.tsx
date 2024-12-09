import { FC, useState } from 'react';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import nghi from '../../assets/images/nghi_1276x1276.jpg';
import { nghiLinks } from '../journalpage/AuthorCard';
import styles from './ArthurPage.module.less';
import classNames from 'classnames';
import { Darkmode, useDarkmodeContext } from '../../utils/DarkmodeProvider';

const ArthurPage: FC = () => {
  const { translate } = useLanguageContext();
  const [visibleContent, setVisibleContent] = useState<number>(1);

  const handleButtonClick = (index: number) => {
    setVisibleContent(index);
  };

  const certificates: Record<string, TranslateTextKey>[] = [
    {
      title: 'nghi.certificate.MicrosoftHTML5-title',
      description: 'nghi.certificate.MicrosoftHTML5-description',
    },
    {
      title: 'nghi.certificate.MicrosoftHTML5-title',
      description: 'nghi.certificate.MicrosoftHTML5-description',
    },
    {
      title: 'nghi.certificate.AndroidAppComponents-title',
      description: 'nghi.certificate.AndroidAppComponents-description',
    },
    {
      title: 'nghi.certificate.JavaForAndroid-title',
      description: 'nghi.certificate.JavaForAndroid-description',
    },
    {
      title: 'nghi.certificate.CodingInterviewPreparation-title',
      description: 'nghi.certificate.CodingInterviewPreparation-description',
    },
    {
      title: 'nghi.certificate.FrontEndDeveloperCapstone-title',
      description: 'nghi.certificate.FrontEndDeveloperCapstone-description',
    },
    {
      title: 'nghi.certificate.MetaFrontendDeveloperSpecialization-title',
      description:
        'nghi.certificate.MetaFrontendDeveloperSpecialization-description',
    },
    {
      title: 'nghi.certificate.HTMLandCSSInDepth-title',
      description: 'nghi.certificate.HTMLandCSSInDepth-description',
    },
    {
      title: 'nghi.certificate.PrinciplesOfUXUIDesign-title',
      description: 'nghi.certificate.PrinciplesOfUXUIDesign-description',
    },
    {
      title: 'nghi.certificate.AdvancedReact-title',
      description: 'nghi.certificate.AdvancedReact-description',
    },
    {
      title: 'nghi.certificate.ReactBasics-title',
      description: 'nghi.certificate.ReactBasics-description',
    },
    {
      title: 'nghi.certificate.IntroductionToFrontendDevelopment-title',
      description:
        'nghi.certificate.IntroductionToFrontendDevelopment-description',
    },
    {
      title: 'nghi.certificate.ProgrammingWithJavaScript-title',
      description: 'nghi.certificate.ProgrammingWithJavaScript-description',
    },
    {
      title: 'nghi.certificate.IntroductionToBackendDevelopment-title',
      description:
        'nghi.certificate.IntroductionToBackendDevelopment-description',
    },
    {
      title: 'nghi.certificate.VersionControl-title',
      description: 'nghi.certificate.VersionControl-description',
    },
    {
      title: 'nghi.certificate.UnitTestingInJest-title',
      description: 'nghi.certificate.UnitTestingInJest-description',
    },
    {
      title: 'nghi.certificate.KotlinForJavaDevelopers-title',
      description: 'nghi.certificate.KotlinForJavaDevelopers-description',
    },
    {
      title: 'nghi.certificate.LearningHowToLearn-title',
      description: 'nghi.certificate.LearningHowToLearn-description',
    },
    {
      title: 'nghi.certificate.InformationVisualization-title',
      description: 'nghi.certificate.InformationVisualization-description',
    },
    {
      title: 'nghi.certificate.ProgrammingHTML5-title',
      description: 'nghi.certificate.ProgrammingHTML5-description',
    },
    {
      title: 'nghi.certificate.AdvancedBackendCloudSecurity-title',
      description: 'nghi.certificate.AdvancedBackendCloudSecurity-description',
    },
    {
      title: 'nghi.certificate.AcceleratedLearning-title',
      description: 'nghi.certificate.AcceleratedLearning-description',
    },
  ];

  const skills: Record<string, TranslateTextKey>[] = [
    {
      title: 'nghi.skills.developer-title',
      description: 'nghi.skills.developer-description',
    },
  ];

  const volunteering: Record<string, TranslateTextKey>[] = [
    {
      title: 'nghi.volunteering.DKC-title',
      description: 'nghi.volunteering.DKC-description',
    },
    {
      title: 'nghi.volunteering.FF-title',
      description: 'nghi.volunteering.FF-description',
    },
  ];

  const cours: Record<string, TranslateTextKey>[] = [
    {
      title: 'nghi.course.MAT1100-title',
      description: 'nghi.course.MAT1100-description',
    },
    {
      title: 'nghi.course.MAT1110-title',
      description: 'nghi.course.MAT1110-description',
    },
    {
      title: 'nghi.course.IN2090-title',
      description: 'nghi.course.IN2090-description',
    },
    {
      title: 'nghi.course.IN2040-title',
      description: 'nghi.course.IN2040-description',
    },
    {
      title: 'nghi.course.KJM1100-title',
      description: 'nghi.course.KJM1100-description',
    },
    {
      title: 'nghi.course.IN1020-title',
      description: 'nghi.course.IN1020-description',
    },
    {
      title: 'nghi.course.IN1900-title',
      description: 'nghi.course.IN1900-description',
    },
    {
      title: 'nghi.course.MAT1120-title',
      description: 'nghi.course.MAT1120-description',
    },
    {
      title: 'nghi.course.IN1150-title',
      description: 'nghi.course.IN1150-description',
    },
    {
      title: 'nghi.course.MAT1060-title',
      description: 'nghi.course.MAT1060-description',
    },
    {
      title: 'nghi.course.IN1010-title',
      description: 'nghi.course.IN1010-description',
    },
    {
      title: 'nghi.course.KJM1110-title',
      description: 'nghi.course.KJM1110-description',
    },
    {
      title: 'nghi.course.IN2030-title',
      description: 'nghi.course.IN2030-description',
    },
    {
      title: 'nghi.course.STK1100-title',
      description: 'nghi.course.STK1100-description',
    },
    {
      title: 'nghi.course.PROF1015-title',
      description: 'nghi.course.PROF1015-description',
    },
    {
      title: 'nghi.course.IN1910-title',
      description: 'nghi.course.IN1910-description',
    },
    {
      title: 'nghi.course.MAT-INF1100L-title',
      description: 'nghi.course.MAT-INF1100L-description',
    },
    {
      title: 'nghi.course.IN1030-title',
      description: 'nghi.course.IN1030-description',
    },
    {
      title: 'nghi.course.MEK1100-title',
      description: 'nghi.course.MEK1100-description',
    },
  ];

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
          {translate('qualifications.cours')}
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
          {cours.map((cours, index) => (
            <li key={index}>
              <h4>{translate(cours.title)}</h4>
              <p>{translate(cours.description)}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ArthurPage;
