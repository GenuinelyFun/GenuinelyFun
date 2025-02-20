import { FC } from 'react';
import { JournalType } from '../utils/journal-utils';

import styles from './ClickableCard.module.less';
import { Link } from 'react-router-dom';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/LanguageProvider';

const ClickableCard: FC<{
  titleLevel?: 1 | 2 | 3 | 4 | 5;
  post: JournalType;
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
      <p className={styles.action}>Read more</p>
    </Link>
  );
};

export default ClickableCard;
