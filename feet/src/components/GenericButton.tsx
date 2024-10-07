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
  disabled,
}) => {
  return (
    <button
      className={classNames(styles.button, { [styles.invert]: invert })}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};
export default GenericButton;
