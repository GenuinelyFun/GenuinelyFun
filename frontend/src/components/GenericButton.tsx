import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import styles from './GenericButton.module.less';

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
  const location = useLocation();

  if (as === 'a') {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
          {
            [styles.invert]: invert,
          },
          styles.button,
          className
        )}
        href={buttonProps.href}
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
        state={{ prevPage: location.pathname }}
        className={classNames(
          {
            [styles.invert]: invert,
          },
          styles.button,
          className
        )}
        onClick={onClick}
        {...(buttonProps as LinkProps)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={classNames(
        {
          [styles.invert]: invert,
        },
        styles.button,
        className
      )}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
export default GenericButton;
