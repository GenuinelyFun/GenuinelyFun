import React, { FC, ReactNode } from 'react';
import arthur from '../../assets/images/arthur_1740x1740.jpg';
import nghi from '../../assets/images/nghi_1276x1276.jpg';
import { ReactComponent as GithubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as Xicon } from '../../assets/icons/x.svg';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import styles from './AuthorCard.module.less';

const AuthorCard: FC<{ author: 'arthur' | 'nghi' }> = ({ author }) => {
  const { translate } = useLanguageContext();

  const arthurLinks: {
    [key: string]: { url: string; icon: ReactNode };
  } = {
    github: {
      url: 'https://github.com/Friftycode',
      icon: <GithubIcon aria-label="GitHub" />,
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/arthur90/',
      icon: <LinkedinIcon aria-label="LinkedIn" />,
    },
    x: {
      url: 'https://x.com/ThomassenArthur',
      icon: <Xicon aria-label="X" />,
    },
  };
  const nghiLinks: {
    [key: string]: { url: string; icon: ReactNode };
  } = {
    github: {
      url: 'https://github.com/NghiNg',
      icon: <GithubIcon aria-label="GitHub" />,
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/nghi-nguyen-519405197/',
      icon: <LinkedinIcon aria-label="LinkedIn" />,
    },
  };

  const links = author === 'arthur' ? arthurLinks : nghiLinks;

  return (
    <div className={styles.card}>
      <img
        src={author === 'arthur' ? arthur : nghi}
        alt={translate(`${author}.image.aria-label` as TranslateTextKey)}
        className={styles.genericImage}
      />
      <div className={styles.textContainer}>
        <h2>{translate('about')}</h2>
        <p>{translate(`${author}.title` as TranslateTextKey)}</p>
        <p>{translate(`${author}.paragraph` as TranslateTextKey)}</p>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
