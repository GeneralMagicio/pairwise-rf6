import { FC, useState } from 'react';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';
import { PowerIcon } from '@/public/assets/icon-components/Power';
import { shortenWalletAddress } from '@/app/comparison/utils/helpers';
interface Props {
  wallet: string
  onLogout: () => void
}

const LogoutButton: FC<Pick<Props, 'onLogout'>> = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="flex w-full items-center justify-center gap-2 py-2"
    >
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
        className="flex h-fit w-44 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 font-semibold"
      >
        <span className="text-sm text-gray-800">
          {shortenWalletAddress(wallet)}
        </span>
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
