import React, { FC, ReactNode } from 'react';
import arthur from '../../assets/images/arthur_1740x1740.jpg';
import nghi from '../../assets/images/nghi_1276x1276.jpg';
import GithubIcon from '../../assets/icons/github.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import Xicon from '../../assets/icons/x.svg';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import styles from './AuthorCard.module.less';
import GenericButton from '../../components/GenericButton';
import { routePaths } from '../../App';

export const arthurLinks: {
  [key: string]: { url: string; icon: ReactNode };
} = {
  github: {
    url: 'https://github.com/Friftycode',
    icon: <img src={GithubIcon} alt="GitHub" />,
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/arthur90/',
    icon: <img src={LinkedinIcon} alt="LinkedIn" />,
  },
  x: {
    url: 'https://x.com/ThomassenArthur',
    icon: <img src={Xicon} alt="X" />,
  },
};

export const nghiLinks: {
  [key: string]: { url: string; icon: ReactNode };
} = {
  github: {
    url: 'https://github.com/NghiNg',
    icon: <img src={GithubIcon} alt="GitHub" />,
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/nghi-nguyen-519405197/',
    icon: <img src={LinkedinIcon} alt="LinkedIn" />,
  },
};

const AuthorCard: FC<{ author: 'arthur' | 'nghi' }> = ({ author }) => {
  const { translate } = useLanguageContext();

  const links = author === 'arthur' ? arthurLinks : nghiLinks;

  return (
    <div className={styles.card}>
      <img
        src={author === 'arthur' ? arthur : nghi}
        alt={translate(`author-card.${author}.aria` as TranslateTextKey)}
        className={styles.genericImage}
      />
      <div className={styles.textContainer}>
        <h2>{translate('author-card.about')}</h2>
        <p>{translate(`author-card.${author}.title` as TranslateTextKey)}</p>
        <p>
          {translate(`author-card.${author}.paragraph` as TranslateTextKey)}
        </p>
        <div className={styles.iconRow}>
          {Object.keys(links).map((link) => (
            <a
              key={link}
              href={links[link].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {links[link].icon}
            </a>
          ))}
          <GenericButton
            className={styles.button}
            invert={true}
            as={'link'}
            to={routePaths.arthur}
          >
            To my portfolio page
          </GenericButton>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
