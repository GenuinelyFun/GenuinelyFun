import { FC, JSX } from 'react';
import { Link } from 'react-router-dom';

import { ArticleType } from '../utils/article-utils';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/i18n/language-utils.ts';
import styles from './ClickableCard.module.less';

const ClickableCard: FC<{
  titleLevel?: 1 | 2 | 3 | 4 | 5;
  post: ArticleType;
}> = ({ titleLevel = 2, post }) => {
  const TitleComponent = `h${titleLevel}` as keyof JSX.IntrinsicElements;
  const { translate } = useLanguageContext();

  return (
    <Link className={styles.card} to={post.path}>
      <TitleComponent className={styles.title}>
        {translate((post.key + '.title') as TranslateTextKey)}
      </TitleComponent>
      <p className={styles.text}>
        {translate((post.key + '.description') as TranslateTextKey)}
      </p>
      <p className={styles.action}>{translate('article-page.read-more')}</p>
    </Link>
  );
};

export default ClickableCard;
