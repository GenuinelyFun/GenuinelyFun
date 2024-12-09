import React, { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import arthur from '../../assets/images/arthur_1740x1740.jpg';
import nghi from '../../assets/images/nghi_1276x1276.jpg';
import GithubIcon from '../../assets/icons/github.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import Xicon from '../../assets/icons/x.svg';
import EmailIcon from '../../assets/icons/email.png';
import GenericButton from '../../components/GenericButton';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import { routePaths } from '../../App';
import styles from './AuthorCard.module.less';

export const arthurLinks: {
  [key: string]: { url: string; icon: ReactNode };
} = {
  email: {
    url: 'mailto:arthur.leonard.thomassen@gmail.com',
    icon: <img src={EmailIcon} alt={'Email'} />,
  },
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
  email: {
    url: 'mailto:nguyenbdnghi@gmail.com',
    icon: <img src={EmailIcon} alt={'Email'} />,
  },
  github: {
    url: 'https://github.com/NghiNg',
    icon: <img src={GithubIcon} alt="GitHub" />,
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/nghi-nguyen-519405197/',
    icon: <img src={LinkedinIcon} alt="LinkedIn" />,
  },
};

const AuthorCard: FC<{
  author: 'arthur' | 'nghi';
  className?: string;
  flip?: boolean;
}> = ({ author, className, flip }) => {
  const { translate } = useLanguageContext();

  const links = author === 'arthur' ? arthurLinks : nghiLinks;
  const location = useLocation();

  return (
    <div
      className={classNames(styles.card, className, {
        [styles.flip]: flip,
      })}
    >
      <img
        src={author === 'arthur' ? arthur : nghi}
        alt={translate(`author-card.${author}.aria` as TranslateTextKey)}
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
            to={
              (location.pathname !== '/' ? '../' : '') +
              (author === 'arthur' ? routePaths.arthur : routePaths.nghi)
            }
          >
            To my portfolio page
          </GenericButton>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
