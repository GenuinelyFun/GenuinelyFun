import React from 'react';

import { useLanguageContext } from '../../utils/LanguageProvider';
import { journalMetadata } from '../../utils/journal-utils';
import PageHeading from '../../components/PageHeading';
import ClickableCard from '../../components/ClickableCard';

import styles from './ArticlePage.module.less';

const ArticlePage = (): JSX.Element => {
  const { translate } = useLanguageContext();

  return (
    <main className={styles.journalPage}>
      <PageHeading>{translate('article-page.title')}</PageHeading>
      <ul className={styles.cardList}>
        {journalMetadata.map((post) => (
          <li key={post.key}>
            <ClickableCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ArticlePage;
