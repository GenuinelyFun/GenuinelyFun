import { useLanguageContext } from '../../utils/LanguageProvider';
import { articles } from '../../utils/article-utils';
import PageHeading from '../../components/PageHeading';
import ClickableCard from '../../components/ClickableCard';

import styles from './ArticlePage.module.less';

const ArticlePage = (): JSX.Element => {
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
