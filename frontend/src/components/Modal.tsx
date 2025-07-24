import classNames from 'classnames';
import { FC } from 'react';
import ReactModal from 'react-modal';

import CrossIcon from '../assets/icons/CrossIcon.tsx';
import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import styles from './Modal.module.less';

interface Props extends ReactModal.Props {
  onClose: ReactModal.Props['onRequestClose'];
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
      <div className={styles.modalContent}>{children}</div>
      <button
        className={styles.closeButton}
        type="button"
        onClick={onClose}
        aria-label={crossAriaLabel || translate('modal.close.aria')}
      >
        <CrossIcon className={styles.crossIcon} />
      </button>
    </ReactModal>
  );
};

export default Modal;
