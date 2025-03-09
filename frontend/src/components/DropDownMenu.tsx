import classNames from 'classnames';
import React, {
  FC,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import ChevronDownIcon from '../assets/icons/ChevronDownIcon';
import {
  TranslateTextKey,
  useLanguageContext,
} from '../utils/i18n/language-utils.ts';
import styles from './DropDownMenu.module.less';

type DropDownMenuProps = {
  buttonClassName?: string;
  buttonTextKey: TranslateTextKey;
  buttonAriaLabel?: string;
  listItems: ReactNode[];
  listItemClassName?: string;
};

const DropDownMenu: FC<DropDownMenuProps> = ({
  buttonClassName,
  buttonTextKey,
  buttonAriaLabel,
  listItems,
  listItemClassName,
}: DropDownMenuProps) => {
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

  const labelId = useId();

  return (
    <div className={styles.dropdownContainer}>
      <button
        ref={dropdownRef}
        onClick={toggleDropdown}
        id={labelId}
        className={classNames(styles.dropdownButton, buttonClassName)}
        aria-label={buttonAriaLabel}
        aria-haspopup="true"
      >
        {translate(buttonTextKey)}
        <ChevronDownIcon
          className={classNames(
            styles.chevron,
            open ? styles.chevronOpen : styles.chevronClosed
          )}
        />
      </button>

      <ul
        className={classNames(
          styles.dropdownContent,
          open ? styles.open : styles.hidden,
          styles.dropdownList
        )}
        aria-labelledby={labelId}
        aria-expanded={open}
      >
        {listItems.map((item, index) => {
          return (
            <li key={index} className={listItemClassName}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDownMenu;
