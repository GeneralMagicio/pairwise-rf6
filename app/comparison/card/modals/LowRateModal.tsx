import React, { FC } from 'react';
import Image from 'next/image';

interface ILowRateModalProps {
  proceedWithSelection: () => void
  cancelSelection: () => void
}

const LowRateModal: FC<ILowRateModalProps> = ({
  proceedWithSelection,
  cancelSelection,
}) => {
  return (
    <div className="mx-auto w-[300px] rounded-lg bg-white bg-rating-illustration bg-no-repeat p-6 shadow-lg md:w-[500px] md:px-10">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full p-2">
          <Image
            src="/assets/images/rating-illustration.svg"
            alt="Rating Illustration"
            width={304}
            height={60}
          />
        </div>
      </div>

      <h2 className="mb-4 text-center text-xl font-semibold text-dark-500">
        Are you sure you want to select a lower rated project?
      </h2>

      <p className="mb-6 text-center text-sm text-gray-400">
        Please change the rating or select the other project.
      </p>

      <button
        onClick={proceedWithSelection}
        className="mb-2 w-full rounded-md bg-primary py-2 text-white transition duration-300 hover:bg-red-600"
      >
        Proceed
      </button>

      <button
        onClick={cancelSelection}
        className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 text-gray-600
         transition duration-300 hover:bg-gray-300"
      >
        Cancel
      </button>
    </div>
  );
};

export default LowRateModal;
