import { FC } from 'react';
import Image from 'next/image';
import { useConnect } from 'thirdweb/react';
import { Wallet } from 'thirdweb/wallets';
import { Step } from './EmailLoginModal';

type TConnectEOAModalProps = {
  email: string
  eoaWallet: Wallet | null
  setStep: (step: number) => void
}

const ConnectEOAModal: FC<TConnectEOAModalProps> = ({ email, eoaWallet, setStep }) => {
  const { connect } = useConnect();

  const connectEOA = () => {
    if (!eoaWallet) return;

    connect(eoaWallet);
    setStep(Step.SUCCESS);
  };

  return (
    <div className="mx-auto w-[460px] rounded-lg bg-rating-illustration bg-no-repeat p-6 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Image src="/assets/images/op-character6.svg" alt="Loading" width={150} height={150} />
        <h2 className="mb-6 text-2xl font-bold text-dark-500">Connect your newly created wallet to your ETH wallet</h2>
        <p className="text-gray-400">
          We successfully created a new wallet associated to your email
          <span className="font-medium text-dark-500">
            {' '}
            {email}
          </span>
        </p>
        <p className="text-gray-400">Please link this with your connected ETH address to continue.</p>
        <button
          className="my-4 w-full rounded-lg border bg-primary px-4 py-2 font-semibold text-white transition duration-300"
          onClick={connectEOA}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default ConnectEOAModal;
