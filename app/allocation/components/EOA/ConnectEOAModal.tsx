import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useActiveWallet } from 'thirdweb/react';
import { Step } from './EmailLoginModal';
import { axiosInstance } from '@/app/utils/axiosInstance';
import StorageLabel from '@/app/lib/localStorage';

type TConnectEOAModalProps = {
  email: string
  setCloseModalDisabled: (value: boolean) => void
  setStep: (step: number) => void
};

const ConnectEOAModal: FC<TConnectEOAModalProps> = ({ email, setCloseModalDisabled, setStep }) => {
  const wallet = useActiveWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const connectEOA = async () => {
    setLoading(true);
    setError(null);

    if (!wallet) {
      setError('Unable to connect to your wallet');
      setLoading(false);
      return;
    }

    try {
      const msg = 'Sign in with Thirdweb wallet';
      const account = wallet?.getAccount();

      if (!account) {
        setError('Unable to connect to your wallet');
        setLoading(false);
        return;
      }

      const signature = await account.signMessage({ message: msg });

      await axiosInstance.post('auth/thirdweb/login', {
        message: msg,
        signature,
        address: account.address,
      });
      setLoading(false);
      setStep(Step.SUCCESS);
    }
    catch (err) {
      wallet.disconnect();
      setCloseModalDisabled(false);
      localStorage.removeItem(StorageLabel.LAST_CONNECT_PERSONAL_WALLET_ID);
      setError('This email is already connected to another wallet');
      setLoading(false);
    }
  };

  useEffect(() => {
    setCloseModalDisabled(true);

    return () => {
      setCloseModalDisabled(false);
    };
  }, []);

  return (
    <div className="mx-auto w-[460px] rounded-lg bg-rating-illustration bg-no-repeat p-6 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Image
          src="/assets/images/op-character6.svg"
          alt="Loading"
          width={150}
          height={150}
        />
        <h2 className="mb-6 text-2xl font-bold text-dark-500">
          Connect your newly created wallet to your ETH wallet
        </h2>
        <p className="text-gray-400">
          We successfully created a new wallet associated to your email
          <span className="font-medium text-dark-500">
            {' '}
            {email}
          </span>
        </p>
        <p className="text-gray-400">
          Please link this with your connected ETH address to continue.
        </p>

        {error && (
          <div className="mt-4 flex w-[90%] flex-col items-start gap-1 rounded-lg border border-primary bg-status-bg-error px-3 py-2">
            <p className="text-sm font-semibold text-primary">
              An error occurred!
            </p>
            <p className="text-center text-xs text-dark-500">{error}</p>
          </div>
        )}

        <button
          className={`my-4 w-full rounded-lg border px-4 py-2 font-semibold transition duration-300
            ${
    error
      ? 'cursor-not-allowed bg-gray-300 text-gray-600'
      : 'bg-primary text-white'
    }
          `}
          disabled={loading || !!error}
          onClick={connectEOA}
        >
          {loading ? 'Connecting...' : 'Connect'}
        </button>
      </div>
    </div>
  );
};

export default ConnectEOAModal;
