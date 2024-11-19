import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { usePostHog } from 'posthog-js/react';
import { WarpcastIcon } from '@/public/assets/icon-components/WarpcastIcon';

interface Props {
  categoryName: string
  isBadgeHolder: boolean
  link: string
  onClose: () => void
}

const createWarpcastIntention = (text: string) => {
  return `https://warpcast.com/~/compose?text=${text}`;
};

const AskDelegations: React.FC<Props> = ({
  categoryName,
  isBadgeHolder,
  link,
  onClose,
}) => {
  const posthog = usePostHog();
  const text = isBadgeHolder
    ? `I voted in @pairwise Liquid Democracy Experiment, ranking the ${categoryName} category of @optimism RF6.\n\nDelegate to me here:\nhttps://app.pairwise.vote/`
    : `I voted in @pairwise Liquid Democracy Experiment, ranking the ${categoryName} category of @optimism RF6.`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied Successfully!', {
        position: 'top-center',
        autoClose: 200,
        hideProgressBar: true,
        closeButton: false,
      });
    }
    catch (err) {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy', {
        position: 'top-center',
        autoClose: 200,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-6 rounded-lg bg-white px-6 py-10 shadow-lg">
      <Image src="/assets/images/finish-celebration.png" width={300} height={150} alt="celebrate" />

      <p className="text-center text-lg font-semibold">
        Successfully voted in&nbsp;
        <span className="text-primary">{categoryName}</span>
      </p>
      <div className="flex items-center justify-between">
        <h2 className="text-center text-base text-gray-400">
          <div>Its time to celebrate!! Your votes have been attested successfully.</div>
          <br />
          <div>Would you like to receive more delegations in our Liquid Democracy experiment?</div>
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className={`relative rounded-lg border-2 border-op-neutral-300 p-3 ${isBadgeHolder ? 'pb-[14px]' : 'pb-6'}`}>
          <p className="inline text-gray-400">
            I voted in
            <span className="mx-1 inline text-primary">@pairwise</span>
            Liquid Democracy Experiment, ranking the
            <span className="mx-1 inline-block whitespace-nowrap text-wrap">
              {categoryName}
            </span>
            category of
            {' '}
            <span className="mx-1 text-primary">@optimism</span>
            RF6.
            {isBadgeHolder && (
              <>
                <br />
                <br />
                <div>
                  Delegate to me here:
                </div>
                <div className="text-primary">
                  https://app.pairwise.vote/
                </div>
              </>
            )}
          </p>
          <button onClick={handleCopy} className="absolute bottom-2.5 right-2.5 m-0 p-1 hover:bg-purple-50">
            <Image src="/assets/images/copy-icon.svg" width={20} height={20} alt="copy" />
          </button>
        </div>

        <a
          className="w-full"
          target="_blank"
          href={createWarpcastIntention(encodeURIComponent(text))}
          onClick={() => {
            posthog.capture('Post of Farcaster');
          }}
        >
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-op-neutral-300 bg-white py-2 transition-colors duration-200 hover:bg-purple-50">
            <WarpcastIcon />
            Post on Farcaster
          </button>
        </a>
        {isBadgeHolder
          ? (
              <button onClick={onClose} className="w-full rounded-lg border-2 border-op-neutral-300 py-2 text-gray-700 transition-colors duration-200 hover:bg-purple-50 hover:text-gray-700">
                Next
              </button>
            )
          : (
              <>
                <div>
                  <a href={link} className="w-full" target="_blank">
                    <button
                      className="text-primary underline"
                    >
                      View Transaction
                    </button>
                  </a>
                </div>
                <button
                  className="text-gray-600"
                  onClick={onClose}
                >
                  Close
                </button>
              </>
            )}
      </div>
    </div>
  );
};

export default AskDelegations;
