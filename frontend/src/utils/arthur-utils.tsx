import { ReactNode } from 'react';

import EmailIcon from '../assets/icons/EmailCircleIcon.png';
import GithubIcon from '../assets/icons/GitHubIcon';
import LinkedinIcon from '../assets/icons/LinkedInIcon';
import XIcon from '../assets/icons/XIcon.svg';
import LinkIcon from '../components/LinkIcon';
import { TranslateTextKey } from './i18n/language-utils.ts';

export const ARTHUR_FIRSTNAME = 'Arthur';
export const ARTHUR_MIDDLE_NAME = 'Leonard';
export const ARTHUR_LASTNAME = 'Thomassen';
export const ARTHUR_FULLNAME = `${ARTHUR_FIRSTNAME} ${ARTHUR_MIDDLE_NAME} ${ARTHUR_LASTNAME}`;
export const ARTHUR_EMAIL = 'alt.post.inbox+genuinelyfun@gmail.com';
export const ARTHUR_GITHUB = 'https://github.com/Friftycode';
export const ARTHUR_LINKEDIN = 'https://www.linkedin.com/in/arthur90/';
export const ARTHUR_X = 'https://x.com/ThomassenArthur';

export const arthurLinks: {
  [key: string]: { url: string; icon: ReactNode; name: string };
} = {
  email: {
    url: 'mailto:' + ARTHUR_EMAIL,
    icon: <LinkIcon src={EmailIcon} ariaLabel={'Email'} />,
    name: 'Email',
  },
  github: {
    url: ARTHUR_GITHUB,
    icon: <LinkIcon icon={GithubIcon} ariaLabel="GitHub" />,
    name: 'GitHub',
  },
  linkedin: {
    url: ARTHUR_LINKEDIN,
    icon: <LinkIcon icon={LinkedinIcon} ariaLabel="LinkedIn" />,
    name: 'LinkedIn',
  },
  x: {
    url: ARTHUR_X,
    icon: <LinkIcon src={XIcon} ariaLabel="X previously Twitter" />,
    name: 'X',
  },
};

export const certificates: Record<string, TranslateTextKey>[] = [
  {
    title: 'arthur.certificate.fg750-title',
    description: 'arthur.certificate.fg750-description',
  },
  {
    title: 'arthur.certificate.security-expert-title',
    description: 'arthur.certificate.security-expert-description',
  },
  {
    title: 'arthur.certificate.ebo-title',
    description: 'arthur.certificate.ebo-description',
  },
  {
    title: 'arthur.certificate.typescript-essential-title',
    description: 'arthur.certificate.typescript-essential-description',
  },
  {
    title: 'arthur.certificate.netdok-title',
    description: 'arthur.certificate.netdok-description',
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
  {
    title: 'arthur.certificate.emergency-responder-title',
    description: 'arthur.certificate.emergency-responder-description',
  },
  {
    title: 'arthur.certificate.dnk-instructor-title',
    description: 'arthur.certificate.dnk-instructor-description',
  },
  {
    title: 'arthur.certificate.witness-support-title',
    description: 'arthur.certificate.witness-support-description',
  },
  {
    title: 'arthur.certificate.kfor-title',
    description: 'arthur.certificate.kfor-description',
  },
  {
    title: 'arthur.certificate.ksor-winter-title',
    description: 'arthur.certificate.ksor-winter-description',
  },
  {
    title: 'arthur.certificate.ksor-summer-title',
    description: 'arthur.certificate.ksor-summer-description',
  },
];

export const skills: Record<string, TranslateTextKey>[] = [
  {
    title: 'arthur.skills.developer-title',
    description: 'arthur.skills.developer-description',
  },
  {
    title: 'arthur.skills.technician-title',
    description: 'arthur.skills.technician-description',
  },
];

export const volunteering: Record<string, TranslateTextKey>[] = [
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

export const honors: Record<string, TranslateTextKey>[] = [
  {
    title: 'arthur.honors.world-skills-norway-title',
    description: 'arthur.honors.world-skills-norway-description',
  },
  {
    title: 'arthur.honors.norwaycup-sanshou-title',
    description: 'arthur.honors.norwaycup-sanshou-description',
  },
];
