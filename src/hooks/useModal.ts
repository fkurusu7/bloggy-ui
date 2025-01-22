import { useState } from 'react';

export function useModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  return {
    isOpenModal,
    openModal,
    closeModal,
    toggleModal,
  };
}
