import { FC } from 'react';
import Image from 'next/image';
import { UnlockIcon } from '@/public/assets/icon-components/Unlock';
interface UnlockBallotProps {
  projectCount: number
  category: string
  onUnlock: () => void
}

const FinishBallot: FC<UnlockBallotProps> = ({
  projectCount,
  category,
  onUnlock,
}) => {
  return (
    <div className="mx-auto w-[300px] overflow-hidden rounded-lg bg-white bg-ballot bg-no-repeat shadow-lg md:w-[500px]">
      <div className="px-6 py-10 text-center md:p-10">
        <Image
          src="/assets/images/finish-celebration.png"
          alt="Celebration"
          width={320}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="mb-4 text-xl font-medium text-dark-500">
          Nice work! You're ready to unlock your ballot and distribute rewards
        </h2>
        <p className="mb-6 px-4 text-gray-400">
          {`You've ranked all
          ${projectCount}
          projects in the
          ${category}
          category.`}
        </p>
        <button
          onClick={onUnlock}
          className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-primary px-4 py-3 text-white transition duration-300 ease-in-out hover:bg-red-600"
        >
          <UnlockIcon size={20} color="#fff" />
          Unlock Ballot
        </button>
      </div>
    </div>
  );
};

export default FinishBallot;
