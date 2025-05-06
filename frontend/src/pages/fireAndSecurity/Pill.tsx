import classNames from 'classnames';

import styles from './Pill.module.less';

const Pill = ({
  status,
  style,
}: {
  status: string;
  style: Record<string, unknown>;
}) => {
  return (
    <div className={classNames(styles.pill)} style={style}>
      {status}
    </div>
  );
};
export default Pill;
