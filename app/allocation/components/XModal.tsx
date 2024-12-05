'use client';
import React, { useState } from 'react';
import debounce from 'lodash.debounce';
import Modal from '@/app/utils/Modal';
import LoadingModalContent from './LoadingModalContent';
import LoadedModalContent from './LoadedModalContent';
import { useGetDelegationStatus } from '@/app/utils/getConnectionStatus';
import { CheckIcon } from '@/public/assets/icon-components/Check';
import { useTwitter } from '@/app/utils/TwitterProvider';
interface XModalProps {
  isOpen: boolean
  onClose: () => void
}

enum TweetStatus {
  NotTweeted,
  Tweeted,
}

const XModal: React.FC<XModalProps> = ({ isOpen, onClose }) => {
  const [tweetState, setTweetState] = useState<TweetStatus>(TweetStatus.NotTweeted);
  const { username, displayName, checkSignInVerificationTweet } = useTwitter();
  const { isLoading, data: delegates } = useGetDelegationStatus();
  const [isVerified, setIsVerified] = useState(false);

  const [error, setError] = useState<boolean>(false);
  const [url, setUrl] = useState<string | undefined>();
  const verifyTweet = debounce(async () => {
    if (url) {
      try {
        await checkSignInVerificationTweet({
          url: url,
          text: text,
        });
        setError(false);
        setTweetState(TweetStatus.Tweeted);
        setTimeout(() => {
          setIsVerified(true);
        }, 5000);
      }
      catch (error) {
        setError(true);
      }
    }
    else {
      setError(true);
    }
  }, 1000);
  const text = 'I\'m using @Pairwisevote to participate in the #LiquidDemocracy experiment.\n\nYou can try it out too!\n\nhttps://app.pairvise.vote';
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      {(!username || !displayName || !isVerified)
        ? (
            <div className="flex flex-col items-center gap-6 bg-gray-50 px-6 py-10">
              <div className="flex flex-col items-center gap-4">
                <span className="text-2xl text-dark-500">Link your X (Twitter) account</span>
                <span className="text-base text-gray-400">Please complete below steps to verify your X (Twitter) account</span>
              </div>
              <div className="flex flex-col justify-start">
                <div className="m-auto flex size-auto flex-row justify-start gap-4">
                  <div className={`p-auto size-10 rounded-full ${(tweetState === TweetStatus.NotTweeted) ? 'bg-op-neutral-300' : 'bg-primary'} flex items-center justify-center`}>
                    {(tweetState === TweetStatus.NotTweeted) ? 1 : <CheckIcon size={20} color="#ffffff" />}
                  </div>
                  <div className="flex items-center text-dark-500">
                    Tweet a verification message from your account
                  </div>
                  {(tweetState === TweetStatus.NotTweeted)
                    ? (
                        <a href={`https://x.com/intent/post?text=${encodeURIComponent(text)}`} target="_blank">
                          <button className="py-auto h-full rounded-lg bg-primary px-4 text-gray-50">
                            Tweet
                          </button>
                        </a>
                      )
                    : (
                        <button className="py-auto box-shadow: 0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A; w-auto rounded-lg border border-gray-border bg-white px-4 text-gray-500">
                          <div className="flex flex-row items-center gap-1.5">
                            <div>Tweeted</div>
                            <CheckIcon size={20} color="#98A2B3" />
                          </div>
                        </button>
                      )}
                </div>
                <div className="h-12 w-10">
                  <div className={`mx-auto h-full w-0 border ${(tweetState === TweetStatus.NotTweeted) ? 'border-gray-200' : 'border-primary'}`} />
                </div>
                <div className="m-auto flex h-auto w-full flex-row justify-start gap-4">
                  <div className={`p-auto size-10 rounded-full ${(tweetState === TweetStatus.NotTweeted) ? 'bg-op-neutral-300' : 'bg-primary'} flex items-center justify-center`}>
                    {(tweetState === TweetStatus.NotTweeted) ? 2 : <CheckIcon size={20} color="#ffffff" />}
                  </div>
                  <div className="relative flex grow">
                    <input
                      value={url}
                      onChange={(event) => {
                        setUrl(event.target.value);
                        if (error) {
                          setError(false);
                        }
                      }}
                      className={`flex grow items-center rounded-md border ${(error) ? 'border-status-border-error bg-op-red-100' : 'border-op-neutral-300 bg-gray-50'} px-3.5 py-2.5 text-base text-dark-600 placeholder-[#9195A6]`}
                      placeholder="Paste URL of your verification Tweet"
                    />
                    {error && (
                      <div className="absolute left-0 top-full pt-1.5 text-xs text-primary">
                        Please enter a valid Tweet link
                      </div>
                    )}
                  </div>
                  <button
                    className={`py-auto box-shadow: 0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A; rounded-lg border px-4 ${(url !== '' && (tweetState === TweetStatus.NotTweeted)) ? 'border-primary bg-primary text-white' : 'border-gray-border bg-white px-4 text-gray-500'}`}
                    onClick={verifyTweet}
                    disabled={url === ''}
                  >
                    {(tweetState === TweetStatus.NotTweeted)
                      ? 'Verify'
                      : (
                          <div className="flex flex-row items-center gap-1.5">
                            <div>Verified</div>
                            <CheckIcon size={20} color="#98A2B3" />
                          </div>
                        )}
                  </button>
                </div>
              </div>
            </div>
          )
        : (
            isLoading
              ? (
                  <LoadingModalContent />
                )
              : (
                  <LoadedModalContent
                    numDelegates={delegates?.toYou?.budget.length ?? 0}
                    onClose={onClose}
                    displayName={displayName!}
                    username={username!}
                  />
                )
          )}
    </Modal>
  );
};

export default XModal;
