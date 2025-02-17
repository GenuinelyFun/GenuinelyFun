import React, { ReactNode } from 'react';
import { ReactComponent as QuestionMarkIcon } from '../assets/icons/question-mark.svg';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/LanguageProvider';
import { useModal } from '../utils/useModal';
import Modal from './Modal';
import GenericButton from './GenericButton';

import styles from './InfoBox.module.less';

interface InfoBoxProps {
  message?: string;
  header: string;
  altText?: TranslateTextKey;
  messageContent?: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  message,
  header,
  altText,
  messageContent,
}) => {
  const modal = useModal();
  const { translate } = useLanguageContext();

  return (
    <>
      <button
        onClick={modal.openModal}
        className={styles.infoButton}
        aria-label={translate(altText ? altText : 'more-info')}
        role={'button'}
        type={'button'}
      >
        <QuestionMarkIcon className={styles.icon} />
      </button>
      <Modal isOpen={modal.isOpen} onClose={modal.closeModal}>
        <h1>{header}</h1>
        {message ? <p>{message}</p> : messageContent}
        <GenericButton
          className={styles.closeButton}
          onClick={modal.closeModal}
        >
          {translate('close')}
        </GenericButton>
      </Modal>
    </>
  );
};

export default InfoBox;
