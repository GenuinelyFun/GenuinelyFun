import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import styles from './GenericButton.module.less';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  onClick?: () => void;
  invert?: boolean;
}

const GenericButton: FC<Props> = ({
  buttonText,
  invert,
  onClick,
  className,
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
      {buttonText}
    </button>
  );
};
export default GenericButton;
