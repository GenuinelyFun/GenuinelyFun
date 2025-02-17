import { FC } from 'react';

import {
  TranslateTextKey,
  useLanguageContext,
} from '../../../utils/LanguageProvider';
import InfoBox from '../../../components/InfoBox';

import styles from './ExportForm.module.less';

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
        {translate(`export.${textKey}.checkbox.label` as TranslateTextKey)}
      </label>
      <InfoBox
        message={translate(
          `export.${textKey}.infobox.description` as TranslateTextKey,
        )}
        header={translate(
          `export.${textKey}.infobox.title` as TranslateTextKey,
        )}
      />
    </li>
  );
};

export default CheckboxWithInfobox;
