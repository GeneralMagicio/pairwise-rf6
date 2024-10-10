import React, { FC } from 'react';
import { InfoIcon } from '@/public/assets/icon-components/Info';

interface Props {
  onDeclareConflict: () => void
  onCancel: () => void
}

const ConflictOfInterestModal: FC<Props> = ({ onDeclareConflict, onCancel }) => {
  return (
    <div className="mx-auto rounded-lg bg-white bg-ballot bg-no-repeat p-6 shadow-lg">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full p-2">
          <InfoIcon />
        </div>
      </div>

      <h2 className="mb-4 text-center text-xl font-bold text-dark-500">
        Declare a conflict of interest
      </h2>

      <p className="mb-6 text-center text-gray-400">
        {`        A conflict of interest exists if you get income from this
        organization or project, or if any portion of this projects reward will flow to you.`}
      </p>

      <button
        onClick={onDeclareConflict}
        className="mb-2 w-full rounded-md bg-red-500 py-2 text-white transition duration-300 hover:bg-red-600"
      >
        Mark this project as conflict of interest
      </button>

      <button
        onClick={onCancel}
        className="w-full rounded-md bg-gray-200 py-2 text-gray-700 transition duration-300 hover:bg-gray-300"
      >
        Cancel
      </button>
    </div>
  );
};

export default ConflictOfInterestModal;
