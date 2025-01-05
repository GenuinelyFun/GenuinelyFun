import * as React from 'react';
import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import styles from './GenericButton.module.less';
import { Link, LinkProps } from 'react-router-dom';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  invert?: boolean;
  className?: string;
  href?: string;
  to?: string;
  as?: 'a' | 'button' | 'link';
}

const GenericButton: FC<Props> = ({
  invert,
  onClick,
  className,
  children,
  as = 'button',
  ...buttonProps
}) => {
  if (as === 'a') {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(className, {
          [styles.invert]: invert,
        })}
        onClick={onClick}
        {...(buttonProps as LinkProps)}
      >
        {children}
      </a>
    );
  }

  if (as === 'link' && buttonProps.to !== undefined) {
    return (
      <Link
        className={classNames(styles.button, className, {
          [styles.invert]: invert,
        })}
        onClick={onClick}
        {...(buttonProps as LinkProps)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.invert]: invert,
      })}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
export default GenericButton;
