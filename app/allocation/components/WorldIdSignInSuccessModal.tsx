import Image from 'next/image';
import React from 'react';
import Modal from '@/app/utils/Modal';

interface FarcasterModalProps {
  isOpen: boolean
  onClose: () => void
}

const WorldIdSignInSuccessModal: React.FC<FarcasterModalProps> = ({
  isOpen, onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-10">
        <Image src="assets/images/world-star-success.svg" width={100} height={100} alt="" />
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm text-[#232634]">Successfully connected to your World ID</div>
          <div className="text-mxl font-semibold text-[#05060B]">
            Your voting power has been increased by
            <span className="text-primary">+150</span>
          </div>
        </div>
        <div className="w-full text-center font-semibold text-primary">
          <div className="text-sm ">You earned a new badge</div>
          <div className="p-3 text-5xl font-bold text-primary">{20000}</div>
        </div>
        <button
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-white"
          onClick={onClose}
        >
          <p className="p-0.5">Done</p>
        </button>
      </div>
    </Modal>
  );
};
export default WorldIdSignInSuccessModal;
