import classNames from 'classnames';
import { FC, PropsWithChildren, useState } from 'react';
import ReactModal from 'react-modal';
import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';
import { useLanguageContext } from '../utils/LanguageProvider';

import styles from './Modal.module.less';

interface Props extends PropsWithChildren {
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
  isOpen: boolean;
  className?: string;
  crossAriaLabel?: string;
}

const Modal: FC<Props> = ({
  onClose,
  isOpen,
  className,
  crossAriaLabel,
  children,
}) => {
  const { translate } = useLanguageContext();
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={true}
      overlayClassName={styles.overlay}
      className={classNames(styles.modal, className)}
      appElement={document.getElementById('root') as HTMLElement}
    >
      <button
        className={styles.closeButton}
        type="button"
        onClick={onClose}
        aria-label={crossAriaLabel && translate('close')}
      >
        <CrossIcon />
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
