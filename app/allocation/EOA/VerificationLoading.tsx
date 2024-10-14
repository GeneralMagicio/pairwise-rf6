import { FC } from 'react';
import Image from 'next/image';

type TVerificationLoadingProps = {
  email: string
}
const VerificationLoading: FC<TVerificationLoadingProps> = ({ email }) => {
  return (
    <div className="mx-auto w-[500px] rounded-lg bg-rating-illustration bg-no-repeat p-6 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <Image
          src="/assets/images/spinner.gif"
          alt="Loading"
          width={150}
          height={150}
        />
        <p className="text-gray-400">
          Please wait while we create a new wallet for you to sign in
        </p>
        <p className="text-gray-400">
          Your wallet will be associated with the email
          {' '}
          <span className="font-medium text-dark-500">{email}</span>
        </p>
      </div>
    </div>
  );
};

export default VerificationLoading;
