import React, { FC } from 'react';

interface Props {
  disabled?: boolean
  onClick: () => void
}

const VoteButton: FC<Props> = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded-lg border px-6 py-2 transition duration-150
         ease-out hover:ease-in sm:px-12 sm:py-3 ${
    disabled ? 'bg-gray-300' : 'bg-primary'
    }`}
      disabled={disabled}
    >
      <span className={disabled ? 'text-gray-500' : 'text-white'}>Select</span>
    </button>
  );
};

export default VoteButton;
