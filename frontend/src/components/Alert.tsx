import React, { forwardRef, useState } from 'react';

import CheckmarkCircleIcon from '../assets/icons/CheckmarkCircleIcon';
import CrossIcon from '../assets/icons/CrossIcon';
import ExclamationmarkTriangleIcon from '../assets/icons/ExclamationmarkTriangleIcon';
import InformationSquareIcon from '../assets/icons/InformationSquareIcon';
import XMarkSquareIcon from '../assets/icons/XMarkSquareIcon';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/i18n/language-utils.ts';
import styles from './Alert.module.less';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant: 'error' | 'warning' | 'info' | 'success';
  title?: TranslateTextKey;
}

const iconMap = {
  error: XMarkSquareIcon,
  warning: ExclamationmarkTriangleIcon,
  info: InformationSquareIcon,
  success: CheckmarkCircleIcon,
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { children, variant, title, ...rest },
  ref
) {
  const [showBanner, setShowBanner] = useState(true);
  const Icon = iconMap[variant];
  const { translate } = useLanguageContext();

  if (!showBanner) return null;

  return (
    <div
      {...rest}
      data-variant={variant}
      ref={ref}
      className={styles.alertContainer}
    >
      <Icon className={styles.alertIcon} />
      <div className={styles.alertContent}>
        {title && <h1 className={styles.alertTitle}>{translate(title)}</h1>}
        <p className={styles.alertDescription}>{children}</p>
      </div>
      <button
        type="button"
        className={styles.closeBannerButton}
        onClick={() => setShowBanner(false)}
        aria-label={translate('alert.close')}
      >
        <CrossIcon className={styles.closeBannerIcon} />
      </button>
    </div>
  );
});

export default Alert;
