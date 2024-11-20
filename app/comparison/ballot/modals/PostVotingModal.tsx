import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

type TPostVotingProps = {
  categorySlug: string | string[]
  categoryLabel: string
};

const PostVoting: FC<TPostVotingProps> = ({ categorySlug, categoryLabel }) => {
  const posthog = usePostHog();
  return (
    <div className="mx-auto flex w-[300px] flex-col items-center justify-center gap-6 rounded-lg bg-white bg-ballot bg-no-repeat px-6 py-10 shadow-lg md:w-[500px]">
      <Image
        src="/assets/images/finish-celebration.png"
        alt="Celebration"
        width={320}
        height={250}
        className="mx-auto mb-6"
      />

      <h1 className="text-center text-2xl font-semibold text-dark-500">
        Nice work!
      </h1>

      <p className="text-center font-light text-gray-400">
        You’ve ranked all projects in the
        {' '}
        <strong className="font-semibold text-dark-500">{categoryLabel}</strong>
        {' '}
        category.
      </p>

      <Link
        href={`/allocation/${categorySlug}`}
        className="w-full rounded-md bg-primary py-2 text-center text-white"
        onClick={() => {
          posthog.capture('Show my results', {
            category: categorySlug,
          });
        }}
      >
        Show my results
      </Link>
    </div>
  );
};

export default PostVoting;
