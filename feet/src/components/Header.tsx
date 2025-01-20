import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iconGenuinelyFun from '../assets/icons/icon_genuinely_fun_381x353.png';
import { ReactComponent as BurgerIcon } from '../assets/icons/burger.svg';
import { useModal } from '../utils/useModal';
import { useMobileSizes } from '../utils/useMobileSizes';
import GenericButton from './GenericButton';
import LanguageButton from './LanguageButton';
import DarkmodeToggle from './DarkmodeToggle';
import Modal from './Modal';
import Menu from './Menu';

import styles from './Header.module.less';
import {COMPANY_NAME} from "../index";

const Header: FC = () => {
  const { isMobile } = useMobileSizes();
  const menuModal = useModal();
  const location = useLocation();
  return (
    <header className={styles.header}>
      <Link to="/" state={{ prevPage: location.pathname }}>
        <img
          src={iconGenuinelyFun}
          alt={COMPANY_NAME + " Icon"}
          className={styles.funIcon}
        />
      </Link>
      {isMobile ? (
        <GenericButton onClick={menuModal.openModal} invert={true}>
          <BurgerIcon className={styles.burger} />
        </GenericButton>
      ) : (
        <>
          <Menu />
          <div className={styles.buttonContainer}>
            <DarkmodeToggle />
            <LanguageButton />
          </div>
        </>
      )}
      <Modal
        onClose={menuModal.closeModal}
        isOpen={menuModal.isOpen}
        className={styles.sidebarMenu}
      >
        <div className={styles.buttonContainer}>
          <DarkmodeToggle />
          <LanguageButton />
        </div>
        <Menu onLinkClick={menuModal.closeModal} />
      </Modal>
    </header>
  );
};

export default Header;
