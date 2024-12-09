import React from 'react';
import { useLanguageContext } from '../../utils/LanguageProvider';
import Card from '../../components/AuthorCard';
import { ArticleWrapper } from './ArticleWrapper';

const TechBestPracticePage = (): JSX.Element => {
  const { translate } = useLanguageContext();
  return (
    <ArticleWrapper>
      <h1>{translate('main.title')}</h1>
      <p>{translate('main.paragraph')}</p>

      <h2>{translate('routine.title')}</h2>
      <p>{translate('routine.paragraph.first')}</p>
      <p>{translate('routine.paragraph.second')}</p>

      <h2>{translate('understanding.title')}</h2>
      <p>{translate('understanding.paragraph')}</p>

      <h2>{translate('pitfall.title')}</h2>
      <p>{translate('pitfall.paragraph')}</p>

      <h2>{translate('efficiency.title')}</h2>
      <p>{translate('efficiency.paragraph')}</p>

      <h2>{translate('learning.title')}</h2>
      <p>{translate('learning.paragraph')}</p>

      <h2>{translate('summary.title')}</h2>
      <p>{translate('summary.paragraph.first')}</p>
      <p>{translate('summary.paragraph.second')}</p>
      <Card author={'arthur'} />
    </ArticleWrapper>
  );
};

export default TechBestPracticePage;
