import { ReactNode } from 'react';

import EmailIcon from '../assets/icons/EmailCircleIcon.png';
import GithubIcon from '../assets/icons/GitHubIcon';
import LinkedinIcon from '../assets/icons/LinkedInIcon';
import LinkIcon from '../components/LinkIcon';
import { TranslateTextKey } from './i18n/language-utils.ts';

export const NGHI_FIRSTNAME = 'Nghi';
export const NGHI_LASTNAME = 'Nguyen';
export const NGHI_FULLNAME = `${NGHI_FIRSTNAME} ${NGHI_LASTNAME}`;

export const nghiLinks: {
  [key: string]: { url: string; icon: ReactNode; name: string };
} = {
  email: {
    url: 'mailto:nguyenbdnghi@gmail.com',
    icon: <LinkIcon src={EmailIcon} ariaLabel={'Email'} />,
    name: 'Email',
  },
  github: {
    url: 'https://github.com/NghiNg',
    icon: <LinkIcon icon={GithubIcon} ariaLabel="GitHub" />,
    name: 'GitHub',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/nghi-nguyen-519405197/',
    icon: <LinkIcon icon={LinkedinIcon} ariaLabel="LinkedIn" />,
    name: 'LinkedIn',
  },
};

export const certificates: Record<string, TranslateTextKey>[] = [
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

export const additionalWork: Record<string, TranslateTextKey>[] = [
  {
    title: 'nghi.other.dance-title',
    description: 'nghi.other.dance-description',
  },
  {
    title: 'nghi.other.FF-title',
    description: 'nghi.other.FF-description',
  },
];

export const course: Record<string, TranslateTextKey>[] = [
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
