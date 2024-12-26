import React from 'react';
import { UndoIcon } from '@/public/assets/icon-components/Undo';

interface UndoButtonProps {
  disabled?: boolean
  onClick: () => void
}

const UndoButton: React.FC<UndoButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`gap flex flex-row items-center justify-center
        gap-1.5 rounded-md border border-dark-300 px-4 py-2.5 shadow-custom-shadow ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <UndoIcon />
      <span className="mt-1 text-lg font-semibold text-dark-400">Undo</span>
    </button>
  );
};

export default UndoButton;
