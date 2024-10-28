import Image from 'next/image';
import React from 'react';
import { ExternalLinkIcon } from '@/public/assets/icon-components/ExternalLink';

interface Props {
  onClick: () => void
}

const AttestationReportUrl
  = 'https://github.com/GeneralMagicio/pairwise-rf6/issues/new?assignees=MoeNick&labels=bug&projects=&template=error-submit-vote.md&title=%5BError+submit+vote%5D+';

const AttestationError: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="mx-auto w-[300px] overflow-hidden rounded-lg bg-white bg-ballot bg-no-repeat shadow-lg md:w-[500px]">
      <div className="px-6 py-10 text-center  md:px-10">
        <Image
          src="/assets/images/ballot-error.svg"
          alt="Celebration"
          width={320}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="mb-4 text-xl font-medium text-dark-500">
          Error attesting your votes
        </h2>
        <p className="mb-6 text-gray-400">
          There was an error attesting your votes. Please try again.
        </p>
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center rounded-lg border border-slate-400 px-4
          py-3 font-semibold text-slate-900"
        >
          Try again
        </button>
        <button
          onClick={() => window.open(AttestationReportUrl, '_blank')}
          className="mt-4 flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-400 px-4
          py-3 font-semibold text-slate-900"
        >
          <span> Report an issue </span>
          <ExternalLinkIcon />
        </button>
      </div>
    </div>
  );
};

export default AttestationError;
