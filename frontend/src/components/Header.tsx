import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import BurgerIcon from '../assets/icons/BurgerIcon';
import iconGenuinelyFun from '../assets/icons/icon_genuinely_fun_381x353.png';
import { COMPANY_NAME } from '../utils/constants';
import { useMobileSizes } from '../utils/useMobileSizes';
import { useModal } from '../utils/useModal';
import DarkmodeToggle from './DarkmodeToggle';
import Feedback from './Feedback.tsx';
import GenericButton from './GenericButton';
import styles from './Header.module.less';
import LanguageButton from './LanguageButton';
import Menu from './Menu';
import Modal from './Modal';

const Header: FC = () => {
  const { isMobile } = useMobileSizes();
  const menuModal = useModal();
  const location = useLocation();
  return (
    <header className={styles.header}>
      <Link to="/" state={{ prevPage: location.pathname }}>
        <img
          src={iconGenuinelyFun}
          alt={COMPANY_NAME + ' Icon'}
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
            <Feedback />
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
          <Feedback />
          <DarkmodeToggle />
          <LanguageButton />
        </div>
        <Menu onLinkClick={menuModal.closeModal} />
      </Modal>
    </header>
  );
};

export default Header;
