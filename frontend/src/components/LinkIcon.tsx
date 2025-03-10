import classNames from 'classnames';
import { ElementType, FC } from 'react';

import { Darkmode, useDarkmodeContext } from '../utils/darkmode-utils.ts';
import styles from './LinkIcon.module.less';

const LinkIcon: FC<{
  icon?: ElementType;
  src?: string;
  ariaLabel: string;
  className?: string;
}> = ({ icon, src, ariaLabel, className }) => {
  const { theme } = useDarkmodeContext();

  const Icon = icon || 'img';
  return (
    <Icon
      {...(icon ? { 'aria-label': ariaLabel } : { alt: ariaLabel })}
      {...(icon ? {} : { src })}
      className={classNames(
        styles.linkIcon,
        {
          [styles.light]: theme === Darkmode.Light,
        },
        className
      )}
    />
  );
};

export default LinkIcon;
