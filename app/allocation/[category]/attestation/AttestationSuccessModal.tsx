import Image from 'next/image';
import React from 'react';
import { ExternalLinkIcon } from '@/public/assets/icon-components/ExternalLink';

interface Props {
  link: string
  onClose: () => void
}

const AttestationSuccessModal: React.FC<Props> = ({ link }) => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 overflow-hidden rounded-lg bg-white bg-ballot bg-no-repeat p-6 py-12 text-center shadow-lg">
      <Image
        src="/assets/images/sunny.svg"
        alt="Celebration"
        width={160}
        height={125}
        className="mx-auto mb-6"
      />
      <h2 className="whitespace-nowrap text-2xl font-bold text-dark-500">
        Attestation done successfully!!
      </h2>
      <p className="text-slate-700">
        It's time to celebrate!! Your have votes have been attested successfully.
      </p>
      <div className="flex w-3/5 flex-col gap-1">
        <a href={link} className="w-full" target="_blank">
          <button
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3
          text-primary"
          >
            View Transaction
            <ExternalLinkIcon />
          </button>
        </a>
      </div>
    </div>
  );
};

export default AttestationSuccessModal;
