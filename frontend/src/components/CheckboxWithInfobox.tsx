import { FC } from 'react';

import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/i18n/language-utils.ts';
import styles from './CheckboxWithInfobox.module.less';
import InfoBox from './InfoBox.tsx';

const CheckboxWithInfobox: FC<{
  textKey: string;
  value: boolean;
  setValue: () => void;
  disabled?: boolean;
}> = ({ textKey, value, setValue, disabled }) => {
  const { translate } = useLanguageContext();
  return (
    <li className={styles.checkboxContainer}>
      <label className={styles.checkbox}>
        <input
          type={'checkbox'}
          checked={value}
          onChange={setValue}
          disabled={disabled}
        />
        {translate(`feet-export.${textKey}.checkbox.label` as TranslateTextKey)}
      </label>
      <InfoBox
        message={translate(
          `feet-export.${textKey}.infobox.description` as TranslateTextKey
        )}
        header={translate(
          `feet-export.${textKey}.infobox.title` as TranslateTextKey
        )}
        ariaAbout={translate(
          `feet-export.${textKey}.infobox.title` as TranslateTextKey
        )}
      />
    </li>
  );
};

export default CheckboxWithInfobox;
