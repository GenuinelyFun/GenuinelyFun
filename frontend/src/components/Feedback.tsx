import Bowser from 'bowser';
import classNames from 'classnames';
import { FormEventHandler, useCallback, useState } from 'react';

import AngryFilled from '../assets/icons/AngryFilled.tsx';
import AngryOutlined from '../assets/icons/AngryOutlined.tsx';
import FeedbackIcon from '../assets/icons/FeedbackIcon.tsx';
import HappyFilled from '../assets/icons/HappyFilled.tsx';
import HappyOutlined from '../assets/icons/HappyOutlined.tsx';
import LoveFilled from '../assets/icons/LoveFilled.tsx';
import LoveOutlined from '../assets/icons/LoveOutlined.tsx';
import NeutralFilled from '../assets/icons/NeutralFilled.tsx';
import NeutralOutlined from '../assets/icons/NeutralOutlined.tsx';
import SadFilled from '../assets/icons/SadFilled.tsx';
import SadOutlined from '../assets/icons/SadOutlined.tsx';
import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import { useModal } from '../utils/useModal.ts';
import styles from './Feedback.module.less';
import GenericButton from './GenericButton.tsx';
import Modal from './Modal.tsx';

const usePostFeedbackToGoogleSheets = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const clientInfo = `OS: ${browser.getOSName()}. Browser: ${browser.getBrowserName()} ${browser.getBrowserVersion()}`;
  const screenSize = `. ScreenSize: ${window.screen.height}x${window.screen.width}`;
  const browserSize = `. WindowSize: ${window.innerHeight}x${window.innerWidth}`;
  const userLocation = `${window.location.hostname}${window.location.pathname}`;
  const extraInfo = clientInfo + screenSize + browserSize;
  const URL =
    'https://script.google.com/macros/s/AKfycbxg3HIqH1YvwtF533UmOy_R4aKAqs49IuHJ2mK2KbAVJoydSYBhuAhf_MmoQ2WfoapM/exec';

  return useCallback(
    async (rating: number, feedback?: string) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      };

      const formData = {
        Time: new Date(),
        Feedback: feedback,
        Rating: rating,
        URL: userLocation,
        UserAgent: extraInfo,
      };

      fetch(URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit feedback: ' + response.statusText);
        }
      });
    },
    [extraInfo, userLocation]
  );
};

const Feedback = () => {
  const submitFeedback = usePostFeedbackToGoogleSheets();
  const { translate } = useLanguageContext();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [errorEmptyForm, setErrorEmptyForm] = useState(false);
  const feedbackModal = useModal();
  const confirmationModal = useModal();
  const errorModal = useModal();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (rating === 0 && feedback === '') {
      setErrorEmptyForm(true);
      return;
    }
    submitFeedback(rating, feedback)
      .then(() => {
        feedbackModal.closeModal();
        confirmationModal.openModal();
        setRating(0);
        setFeedback('');
        setErrorEmptyForm(false);
      })
      .catch((error) => {
        console.error('Failed to submit feedback: ', error);
        errorModal.openModal();
      });
  };

  const feedbackEmojis = [
    {
      value: 1,
      icon:
        rating === 1 ? (
          <AngryFilled className={styles.emoji} />
        ) : (
          <AngryOutlined
            className={classNames(styles.emoji, styles.outlined)}
          />
        ),
    },
    {
      value: 2,
      icon:
        rating === 2 ? (
          <SadFilled className={styles.emoji} />
        ) : (
          <SadOutlined className={classNames(styles.emoji, styles.outlined)} />
        ),
    },
    {
      value: 3,
      icon:
        rating === 3 ? (
          <NeutralFilled className={styles.emoji} />
        ) : (
          <NeutralOutlined
            className={classNames(styles.emoji, styles.outlined)}
          />
        ),
    },
    {
      value: 4,
      icon:
        rating === 4 ? (
          <HappyFilled className={styles.emoji} />
        ) : (
          <HappyOutlined
            className={classNames(styles.emoji, styles.outlined)}
          />
        ),
    },
    {
      value: 5,
      icon:
        rating === 5 ? (
          <LoveFilled className={styles.emoji} />
        ) : (
          <LoveOutlined className={classNames(styles.emoji, styles.outlined)} />
        ),
    },
  ];

  return (
    <>
      <button
        className={styles.openButton}
        onClick={feedbackModal.openModal}
        aria-label={translate('feedback.open-button')}
        title={translate('feedback.open-button')}
      >
        <FeedbackIcon />
      </button>
      <Modal onClose={feedbackModal.closeModal} isOpen={feedbackModal.isOpen}>
        <form onSubmit={onSubmit}>
          <h1 className={styles.heading}>{translate('feedback.form.title')}</h1>
          <h2>{translate('feedback.form.rating')}</h2>
          <fieldset className={styles.emojis}>
            {feedbackEmojis.map(({ value, icon }) => (
              <label key={value}>
                <span className={'visually-hidden'}>{value}</span>
                {icon}
                <input
                  className={styles.input}
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                />
              </label>
            ))}
          </fieldset>
          <label>
            <h2>{translate('feedback.form.input')}</h2>
            <textarea
              rows={3}
              placeholder={translate('feedback.form.placeholder')}
              className={styles.textarea}
              onChange={(e) => setFeedback(e.target.value.trim())}
            ></textarea>
          </label>
          <p>{translate('feedback.form.footnote')}</p>
          {errorEmptyForm && (
            <p className={styles.errorEmptyForm}>
              {translate('feedback.error.empty-form')}
            </p>
          )}
          <GenericButton className={styles.submit}>
            {translate('feedback.form.submit')}
          </GenericButton>
        </form>
      </Modal>
      <Modal
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.closeModal}
      >
        <h1 className={styles.heading}>
          {translate('feedback.confirmation.title')}
        </h1>
        <p>{translate('feedback.confirmation.description')}</p>
        <GenericButton onClick={confirmationModal.closeModal}>
          {translate('generic.close')}
        </GenericButton>
      </Modal>
      <Modal isOpen={errorModal.isOpen} onClose={errorModal.closeModal}>
        <h1 className={styles.heading}>
          {translate('feedback.confirmation.title')}
        </h1>
        <p>{translate('feedback.confirmation.description')}</p>
        <GenericButton onClick={errorModal.closeModal}>
          {translate('generic.close')}
        </GenericButton>
      </Modal>
    </>
  );
};

export default Feedback;
