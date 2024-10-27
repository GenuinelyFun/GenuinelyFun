import React, { ReactNode, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '../assets/icons/chevron-dropdown.svg';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/LanguageProvider';
import styles from './DropDownMenu.module.less';

type DropDownMenuProps = {
  buttonClassName?: string;
  buttonTextKey: TranslateTextKey;
  listItems: ReactNode[];
};

const DropDownMenu = ({
  buttonClassName,
  buttonTextKey,
  listItems,
}: DropDownMenuProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { translate } = useLanguageContext();
  const dropdownRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener('click', close);
    }

    return () => {
      window.removeEventListener('click', close);
    };
  }, [open]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button
        ref={dropdownRef}
        onClick={toggleDropdown}
        className={classNames(styles.dropdownButton, buttonClassName)}
      >
        {translate(buttonTextKey)}
        <Arrow
          className={classNames(
            styles.chevron,
            open ? styles.chevronOpen : styles.chevronClosed,
          )}
        />
      </button>

      <div
        className={classNames(
          styles.dropdownContent,
          open ? styles.open : styles.hidden,
        )}
      >
        <ul className={styles.dropdownList}>
          {listItems.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
