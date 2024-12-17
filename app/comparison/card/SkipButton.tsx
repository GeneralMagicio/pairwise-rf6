import React from 'react';
import { SkipIcon } from '@/public/assets/icon-components/Skip';

interface SkipButtonProps {
  onClick: () => void
}

const SkipButton: React.FC<SkipButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`gap flex flex-row items-center justify-center
        gap-1.5 rounded-md border border-dark-300 px-4 py-2.5 shadow-custom-shadow`}
    >
      <span className="mt-1 text-lg font-semibold text-dark-400">Skip</span>
      <SkipIcon />
    </button>
  );
};

export default SkipButton;
