import FeedbackIcon from '../assets/icons/FeedbackIcon.tsx';
import { useLanguageContext } from '../utils/i18n/language-utils.ts';
import Alert from './Alert.tsx';
import styles from './FeedbackBanner.module.less';

const FeedbackBanner = () => {
  const { translate } = useLanguageContext();
  return (
    <Alert variant="info" title={'feedback-banner.title'}>
      {translate('feedback-banner.description.1')}
      <FeedbackIcon
        className={styles.feedbackIcon}
        aria-label={translate('feedback-banner.feedback-icon')}
      />
      {translate('feedback-banner.description.2')}
    </Alert>
  );
};

export default FeedbackBanner;
