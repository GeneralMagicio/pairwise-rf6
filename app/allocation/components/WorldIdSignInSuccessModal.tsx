import React from 'react';
import Modal from '@/app/utils/Modal';
import { getBadgeAmount, getBadgeMedal, useGetPublicBadges } from '@/app/utils/getBadges';
import BadgeCard from '@/app/utils/BadgeCard';

interface WorldIdModalProps {
  isOpen: boolean
  onClose: () => void
  isError?: boolean
}

const WorldIdSignInSuccessModal: React.FC<WorldIdModalProps> = ({
  isOpen, onClose, isError,
}) => {
  const { data: badges } = useGetPublicBadges();
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      { isError
        ? (
            <div>
              <></>
            </div>
          )
        : (
            <div className="flex w-full flex-col items-center justify-center gap-6 px-14 py-10">
              <div className="flex flex-col content-between items-center gap-2">
                <div className="text-2xl font-semibold text-dark-500">Your voting power has been increased</div>
                <div className="text-sm text-[#232634]">Successfully connected to your World ID</div>
              </div>
              <div className="w-full text-center font-semibold">

                {badges && Object.keys(badges).length > 0
                && (
                  <div className="flex flex-col items-center justify-between">
                    <div className="mb-2 text-sm text-primary">You earned a new badge!</div>
                    <BadgeCard
                      points={badges['holderPoints'] ?? 0}
                      type="holderPoints"
                      medal={getBadgeMedal('holderPoints', badges)}
                      amount={getBadgeAmount(
                        'holderPoints',
                        badges,
                      )}
                    />
                  </div>
                )}
              </div>
              <button
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-white"
                onClick={onClose}
              >
                <p className="p-0.5">Done</p>
              </button>
            </div>
          )}
    </Modal>
  );
};
export default WorldIdSignInSuccessModal;
