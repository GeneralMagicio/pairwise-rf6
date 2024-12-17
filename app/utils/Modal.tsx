'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  showCloseButton?: boolean
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton,
}) => {
  const [modalNode, setModalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalNode(document.getElementById('modal-root'));

    // Optional: Handle escape key press to close modal
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [onClose]);

  if (!isOpen || !modalNode) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-fit rounded-lg bg-white shadow-lg">
        {children}
      </div>
    </div>,
    modalNode
  );
};

export default Modal;
