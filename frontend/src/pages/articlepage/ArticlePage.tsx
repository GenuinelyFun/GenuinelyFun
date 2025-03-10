import { FC } from 'react';

import ClickableCard from '../../components/ClickableCard';
import PageHeading from '../../components/PageHeading';
import { articles } from '../../utils/article-utils';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import styles from './ArticlePage.module.less';

const ArticlePage: FC = () => {
  const { translate } = useLanguageContext();

  return (
    <main className={styles.articlePage}>
      <PageHeading>{translate('article-page.title')}</PageHeading>
      <ul className={styles.cardList}>
        {articles.map((post) => (
          <li key={post.key} className={styles.cardListItem}>
            <ClickableCard post={post} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ArticlePage;
