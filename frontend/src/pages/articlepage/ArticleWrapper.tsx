import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthorCard from '../../components/AuthorCard';
import PageHeading from '../../components/PageHeading';
import { ArticleType } from '../../utils/article-utils';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../../utils/i18n/language-utils.ts';
import { routePaths } from '../../utils/route-utils';
import styles from './ArticleWrapper.module.less';

export const ArticleWrapper: FC<{ article: ArticleType }> = ({ article }) => {
  const { translate } = useLanguageContext();
  const { key, textFile, author } = article;
  const [textKeys, setTextKeys] = useState<TranslateTextKey[]>([]);

  useEffect(() => {
    if (textKeys.length === 0) {
      import(`./${textFile}PageText.json`).then((texts) =>
        setTextKeys(Object.keys(texts.default) as TranslateTextKey[])
      );
    }
  }, [textFile, textKeys]);

  const title = textKeys.find((textKey) => textKey === key + '.title');

  const paragraphs = Object.groupBy(
    textKeys,
    (textKey: TranslateTextKey) => textKey.split('.')[1]
  );

  /*
  TODO NGHI Is this change necessary? Are they different somehow or was this simply due to old typescript versjon error?
  
  const paragraphs: { [key: string]: TranslateTextKey[] } = textKeys.reduce(
    (acc, textKey) => {
      const paragraphKey: string = textKey.split('.')[1];
      if (!acc[paragraphKey]) {
        acc[paragraphKey] = [textKey];
      } else {
        acc[paragraphKey].push(textKey);
      }
      return acc;
    },
    {} as { [key: string]: TranslateTextKey[] },
   */

  return (
    <main className={styles.article}>
      <article>
        {title && <PageHeading>{translate(title)}</PageHeading>}
        <Link to={'/' + routePaths.article} className={styles.backButton}>
          {translate('article-page.back-button')}
        </Link>
        {Object.keys(paragraphs).map((number) =>
          paragraphs[number]?.map((textKey: TranslateTextKey) =>
            textKey.includes('title') ? (
              <h2 key={textKey}>{translate(textKey)}</h2>
            ) : (
              <p key={textKey}>{translate(textKey)}</p>
            )
          )
        )}

        <AuthorCard author={author} />
      </article>
    </main>
  );
};
