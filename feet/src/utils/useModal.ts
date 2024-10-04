import { useCallback, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
}

export const useModal = (): ModalProps => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
