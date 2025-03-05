import classNames from 'classnames';
import styles from './LinkIcon.module.less';
import { Darkmode, useDarkmodeContext } from '../utils/DarkmodeProvider';
import React, { FC, ImgHTMLAttributes } from 'react';

const LinkIcon: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  alt,
  className,
}) => {
  const { theme } = useDarkmodeContext();
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(
        styles.linkIcon,
        {
          [styles.light]: theme === Darkmode.Light,
        },
        className,
      )}
    />
  );
};

export default LinkIcon;
