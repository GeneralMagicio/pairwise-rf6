import { FC } from 'react';
import { WarningIcon } from '@/public/assets/icon-components/Warning';

interface Props {
  disabled?: boolean
  onClick: () => void
}

const ConflictButton: FC<Props> = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-red-500 p-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <WarningIcon color="#FF0420" size={20} />
    </button>
  );
};

export default ConflictButton;
