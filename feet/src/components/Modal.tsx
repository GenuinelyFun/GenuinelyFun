import { FC, PropsWithChildren } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { ReactComponent as CrossIcon } from '../assets/icons/thin-cross.svg';
import { useLanguageContext } from '../utils/LanguageProvider';

import styles from './Modal.module.less';

interface Props extends PropsWithChildren {
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
  isOpen: boolean;
  className?: string;
  crossAriaLabel?: string;
  overlayClassname?: string;
}

const Modal: FC<Props> = ({
  children,
  onClose,
  isOpen,
  className,
  crossAriaLabel,
  overlayClassname,
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
      overlayClassName={classNames(styles.overlay, overlayClassname)}
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
      <div className={styles.modalContent}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
