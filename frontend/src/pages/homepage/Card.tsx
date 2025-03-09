import classNames from 'classnames';
import { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './Card.module.less';

export enum IconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

interface Props extends PropsWithChildren {
  icon?: ReactNode;
  iconPosition?: IconPosition;
  className?: string;
}

const Card: FC<Props> = ({ icon, iconPosition, children, className }) => {
  return (
    <div className={classNames(styles.card, className)}>
      {iconPosition === IconPosition.LEFT && icon}
      {children}
      {iconPosition === IconPosition.RIGHT && icon}
    </div>
  );
};

export default Card;
