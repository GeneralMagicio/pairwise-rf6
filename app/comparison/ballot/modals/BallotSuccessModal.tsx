import Image from 'next/image';
import React, { useState } from 'react';
import { ExternalLinkIcon } from '@/public/assets/icon-components/ExternalLink';

interface UnlockBallotProps {
  link: string
  onClose: () => void
}

const BallotSuccessModal: React.FC<UnlockBallotProps> = ({ link, onClose }) => {
  const [confirmed1, setConfirmed1] = useState(false);
  const [confirmed2, setConfirmed2] = useState(false);
  return (
    <div className="mx-auto flex max-h-[95vh] w-[750px] flex-col items-center gap-2 overflow-hidden rounded-lg bg-white bg-ballot bg-no-repeat p-6 py-12 shadow-lg">
      <div className="relative h-[250px] w-[320px] sl:h-[160px] sl:w-[250px]">
        <Image
          src="/assets/images/sunny.svg"
          alt="Celebration"
          fill
          className="mx-auto mb-6"
        />
      </div>
      <h2 className="mb-4 text-3xl font-medium text-dark-500">
        Important notice!
      </h2>
      <p className="mb-6 text-center text-gray-400 sl:mb-1">
        Your Pairwise results have been assigned to “Custom” allocation method on the OP Vote application.
        If you change the allocation method all your voting will be lost and you’ll have to
        re-submit Ballot from Pairwise again.
      </p>
      <div className="relative h-64 w-full">

        <Image
          src="/assets/images/custom-method.svg"
          alt="Custom allocation method"
          fill
          className="mx-auto mb-6"
        />
      </div>
      <div className="flex w-3/5 flex-col gap-1">
        <div className="mb-2 flex gap-6">
          <input className="size-8 self-start" checked={confirmed1} onChange={() => setConfirmed1(!confirmed1)} type="checkbox" />
          <p className="text-slate-700">
            I confirm that I will not change the allocation method on OP Vote application
          </p>
        </div>
        <div className="mb-2 flex gap-6">
          <input className="size-8 self-start" checked={confirmed2} onChange={() => setConfirmed2(!confirmed2)} type="checkbox" />
          <p className="text-slate-700">
            I confirm that I must vote on Budget allocation on the Optimism Voting app
          </p>
        </div>
        <a href={link} className="w-full" target="_blank">
          <button
            disabled={!(confirmed1 && confirmed2)}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4
          py-3 text-white transition duration-300 ease-in-out disabled:bg-op-neutral-300 disabled:text-slate-700 sl:p-2"
          >
            View my Ballot
            <ExternalLinkIcon />
          </button>
        </a>
        <button
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-lg px-4 py-3
        text-black transition duration-300 ease-in-out sl:p-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BallotSuccessModal;
