import React, { FC } from 'react';
import Image from 'next/image';

interface IPostRatingModalProps {
  confirm: () => void
}

const PostRatingModal: FC<IPostRatingModalProps> = ({ confirm }) => {
  return (
    <div className="mx-auto w-[300px] rounded-lg bg-white bg-good-rating bg-no-repeat p-6 shadow-lg md:w-[450px]">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full p-2">
          <Image
            src="/assets/images/op-character2.svg"
            alt="Rating Illustration"
            width={160}
            height={180}
          />
        </div>
      </div>

      <h2 className="mb-4 text-center text-xl font-semibold text-dark-500">
        Well done! Now choose one.
      </h2>

      <p className="mb-6 text-center text-sm text-gray-400">
        You rated both projects, now pick one that deserves to get funding.
      </p>

      <button
        onClick={confirm}
        className="mb-2 w-full rounded-md bg-primary py-2 text-white transition duration-300 hover:bg-red-600"
      >
        OK
      </button>
    </div>
  );
};

export default PostRatingModal;
