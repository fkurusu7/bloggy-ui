import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}
function Modal({ onClose, children }: ModalProps) {
  const ref = useOutsideClick(onClose);

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container" ref={ref}>
        <button type="button" className="modal-button" onClick={onClose}>
          <HiXMark />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
