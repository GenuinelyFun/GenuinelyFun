import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import styles from './GenericButton.module.less';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  invert?: boolean;
}

const GenericButton: FC<Props> = ({
  invert,
  onClick,
  className,
  children,
  ...buttonProps
}) => {
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
