'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { XCloseIcon } from '@/public/assets/icon-components/XClose';

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
        {showCloseButton && (
          <div className="absolute right-5 top-5 z-10">
            <button
              onClick={onClose}
              className="text-lg text-gray-400 hover:text-gray-600"
            >
              <XCloseIcon />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    modalNode
  );
};

export default Modal;
