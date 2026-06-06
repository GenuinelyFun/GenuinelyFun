import { ReactNode } from 'react';

import EmailIcon from '../assets/icons/EmailCircleIcon.png';
import GithubIcon from '../assets/icons/GitHubIcon';
import LinkedinIcon from '../assets/icons/LinkedInIcon';
import LinkIcon from '../components/LinkIcon';

export const NGHI_FIRSTNAME = 'Nghi';
export const NGHI_EMAIL = 'nguyenbdnghi@gmail.com';
export const NGHI_GITHUB_URL = 'https://github.com/NghiNg';
export const NGHI_LINKEDIN_URL =
  'https://www.linkedin.com/in/nghi-nguyen-519405197/';

export const nghiLinks: {
  [key: string]: { url: string; icon: ReactNode; name: string };
} = {
  email: {
    url: 'mailto:' + NGHI_EMAIL,
    icon: <LinkIcon src={EmailIcon} ariaLabel={'Email'} />,
    name: 'Email',
  },
  github: {
    url: NGHI_GITHUB_URL,
    icon: <LinkIcon icon={GithubIcon} ariaLabel="GitHub" />,
    name: 'GitHub',
  },
  linkedin: {
    url: NGHI_LINKEDIN_URL,
    icon: <LinkIcon icon={LinkedinIcon} ariaLabel="LinkedIn" />,
    name: 'LinkedIn',
  },
};
