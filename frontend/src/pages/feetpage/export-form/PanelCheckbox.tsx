import classNames from 'classnames';
import { FC } from 'react';

import { FilterPanelType } from './ExportForm';
import styles from './ExportForm.module.less';

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
