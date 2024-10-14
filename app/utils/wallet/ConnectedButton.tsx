import { FC, useState } from 'react';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';
import { PowerIcon } from '@/public/assets/icon-components/Power';

interface Props {
  wallet: string
  onLogout: () => void
}

export function shortenWalletAddress(address: string, startLength: number = 7, endLength: number = 7): string {
  // Check if the address is valid (starts with '0x' and has 42 characters)
  if (!address.startsWith('0x') || address.length !== 42) {
    throw new Error('Invalid wallet address format');
  }

  // Ensure start and end lengths are not greater than half the remaining address length
  const maxLength = Math.floor((address.length - 2) / 2);
  startLength = Math.min(startLength, maxLength);
  endLength = Math.min(endLength, maxLength);

  // Extract the start and end parts of the address
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);

  // Combine the parts with ellipsis
  return `${start}...${end}`;
}

const LogoutButton: FC<Pick<Props, 'onLogout'>> = ({ onLogout }) => {
  return (
    <button onClick={onLogout} className="flex w-full items-center justify-center gap-2 py-2">
      <PowerIcon />
      <span className="text-primary"> Log out </span>
    </button>
  );
};

const ConnectedButton: FC<Props> = ({ wallet, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-fit w-44 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2"
      >
        <span className="text-sm text-gray-800">{shortenWalletAddress(wallet)}</span>
        {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </button>
      {open && (
        <div className="absolute left-0 w-44 rounded-lg border border-gray-300 bg-white shadow-md">
          <LogoutButton onLogout={onLogout} />
        </div>
      )}
    </div>
  );
};

export { ConnectedButton };
