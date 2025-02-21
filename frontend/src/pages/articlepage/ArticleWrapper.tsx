import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/LanguageProvider';
import { ArticleType } from '../../utils/article-utils';
import PageHeading from '../../components/PageHeading';
import Card from '../../components/AuthorCard';

import styles from './ArticleWrapper.module.less';
import { routePaths } from '../../index';

export const ArticleWrapper: FC<{ article: ArticleType }> = ({ article }) => {
  const { translate } = useLanguageContext();
  const { key, textFile, author } = article;

  const textKeys = Object.keys(
    require(`./${textFile}PageText.json`),
  ) as TranslateTextKey[];

  const title = textKeys.find((textKey) => textKey === key + '.title');
  const paragraphs = Object.groupBy(
    textKeys,
    (textKey) => textKey.split('.')[1],
  );

  return (
    <main className={styles.article}>
      <article>
        <PageHeading>{translate(title!)}</PageHeading>
        <Link to={'/' + routePaths.article} className={styles.backButton}>
          {translate('article-page.back-button')}
        </Link>
        {Object.keys(paragraphs).map((number) =>
          paragraphs[number]?.map((textKey) =>
            textKey.includes('title') ? (
              <h2 key={textKey}>{translate(textKey)}</h2>
            ) : (
              <p key={textKey}>{translate(textKey)}</p>
            ),
          ),
        )}

        <Card author={author} />
      </article>
    </main>
  );
};
