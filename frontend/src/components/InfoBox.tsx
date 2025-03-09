import { FC, ReactNode } from 'react';

import QuestionMarkIcon from '../assets/icons/QuestionMarkIcon';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/i18n/language-utils.ts';
import { useModal } from '../utils/useModal';
import GenericButton from './GenericButton';
import styles from './InfoBox.module.less';
import Modal from './Modal';

interface InfoBoxProps {
  message?: string;
  header: string;
  altText?: TranslateTextKey;
  messageContent?: ReactNode;
}

const InfoBox: FC<InfoBoxProps> = ({
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
