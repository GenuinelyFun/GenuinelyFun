import classNames from 'classnames';
import { FC } from 'react';

import styles from '../../pages/feetpage/export-form/FeetExportForm.module.less';
import { FilterPanelType } from '../../pages/feetpage/export-form/FeetExportForm.tsx';

interface Props {
  subValues?: FilterPanelType;
  setSubValues: (value: FilterPanelType) => void;
}

const PanelCheckbox: FC<Props> = ({ subValues, setSubValues }) => {
  if (subValues === undefined) {
    return null;
  }

  return (
    <ul aria-labelledby={'panels-checkbox-list'} className={styles.list}>
      {Object.keys(subValues).map((key, index) => (
        <li key={key + index}>
          <label className={styles.panelHeader}>{key}</label>
          <ul className={classNames(styles.list, styles.sublist)}>
            {Object.keys(subValues[key]).map((panelKey) => {
              const panels = subValues[key];
              return (
                <li key={panelKey} className={styles.checkboxContainer}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={panels[panelKey]}
                      onChange={() => {
                        setSubValues({
                          ...subValues,
                          [key]: {
                            ...subValues[key],
                            [panelKey]: !panels[panelKey],
                          },
                        });
                      }}
                    />
                    {panelKey}
                  </label>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default PanelCheckbox;
