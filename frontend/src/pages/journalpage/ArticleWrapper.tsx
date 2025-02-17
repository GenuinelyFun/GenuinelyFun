import { FC, PropsWithChildren } from 'react';

import styles from './ArticleWrapper.module.less';

export const ArticleWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.article}>
      <article>{children}</article>
    </main>
  );
};
