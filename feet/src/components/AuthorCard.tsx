import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import arthur from '../assets/images/arthur_1740x1740.jpg';
import nghi from '../assets/images/nghi_1276x1276.jpg';
import GenericButton from '../components/GenericButton';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/LanguageProvider';
import { nghiLinks } from '../utils/nghi-utils';
import { routePaths } from '../index';
import styles from './AuthorCard.module.less';
import { arthurLinks } from '../utils/arthur-utils';

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
        className={styles.profileImage}
      />
      <div className={styles.textContainer}>
        <h2>{translate('author-card.about')}</h2>
        <p>
          {translate(`author-card.${author}.title` as TranslateTextKey)}{' '}
          {translate(`${author}.firstname`)}
        </p>
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
        </div>
        <GenericButton
          className={styles.button}
          invert={true}
          as={'link'}
          to={
            (location.pathname !== '/' ? '../' : '') +
            (author === 'arthur' ? routePaths.arthur : routePaths.nghi)
          }
        >
          {translate('author-card.portfolio-button')}
        </GenericButton>
      </div>
    </div>
  );
};

export default AuthorCard;
