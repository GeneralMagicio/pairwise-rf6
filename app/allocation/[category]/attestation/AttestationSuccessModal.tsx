import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { UpdateBallotButton } from '../components/UpdateBallotButton';
import Modal from '@/app/utils/Modal';

interface Props {
  link: string
  onClose: () => void
  showCloseButton?: boolean
}

const AttestationSuccessModal: React.FC<Props> = ({ link, onClose, showCloseButton = false }) => {
  const [hideAttestation, setHideAttestation] = useState(false);
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture('View transaction after vote');
  }, []);

  return (
    <Modal isOpen={true} onClose={onClose} showCloseButton={false}>
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
          <p className="text-gray-400">
            You can update your ballot on Optimism.
          </p>
        </div>
        <div>
          <div onClick={() => setHideAttestation(true)}>
            <UpdateBallotButton closeAttestationModal={() => onClose()} />
          </div>
        </div>
        <a href={link} className="w-full" target="_blank">
          <button className="text-primary underline">
            View Transaction
          </button>
        </a>

        {/* Only render the close button if showCloseButton is true */}

        <button className="text-gray-600" onClick={onClose}>
          Close
        </button>

      </div>
    </Modal>
  );
};

export default AttestationSuccessModal;
