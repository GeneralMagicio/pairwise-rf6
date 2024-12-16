import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { UpdateBallotButton } from '../components/UpdateBallotButton';
interface Props {
  link: string
  onClose: () => void
}

const AttestationSuccessModal: React.FC<Props> = ({ link, onClose }) => {
  const [hideAttestation, setHideAttestation] = useState(false);
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture('View transaction after vote');
  }, []);

  return (
    <div className={`${hideAttestation ? 'hidden' : 'mx-auto flex max-w-md flex-col items-center gap-6 overflow-hidden rounded-lg bg-white bg-ballot bg-no-repeat p-6 py-10 text-center shadow-lg'}`}>
      <Image
        src="/assets/images/op-voting-char.svg"
        alt="Celebration"
        width={300}
        height={150}
        className="mx-auto mb-6"
      />

      <div className="items-around flex flex-col gap-4">
        <h2 className="whitespace-nowrap text-2xl font-bold text-dark-500">
          Attestation done successfully!
        </h2>
        <p className="text-gray-400">
          It&#39;s time to celebrate! Your votes have been attested successfully.
        </p>
      </div>
      <div>
        <div onClick={() => setHideAttestation(true)}>
          <UpdateBallotButton closeAttestationModal={() => onClose()} />
        </div>
      </div>
      <div>
        <div>
          <div className="flex justify-center">
            <button
              className="hover:bg-primary-dark w-[270px] rounded-lg bg-primary px-4 py-3 font-medium text-white shadow-md transition-all duration-200"
              onClick={onClose}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
      <a href={link} className="w-full" target="_blank">
        <button
          className="text-primary underline"
        >
          View Transaction
        </button>
      </a>

    </div>
  );
};

export default AttestationSuccessModal;
