import { FC, useState } from 'react';
import { useAccount } from 'wagmi';
import BallotError from '@/app/comparison/ballot/modals/BallotError';
import BallotErrorDelegated from '@/app/comparison/ballot/modals/BallotErrorDelegated';
import BallotLoading from '@/app/comparison/ballot/modals/BallotLoading';
import BallotNotReady from '@/app/comparison/ballot/modals/BallotNotReady';
import BallotSuccessModal from '@/app/comparison/ballot/modals/BallotSuccessModal';
import { ballotSuccessPost, getBallot } from '@/app/comparison/ballot/useGetBallot';
import { useCategories } from '@/app/comparison/utils/data-fetching/categories';
import { categorySlugIdMap, convertCategoryToLabel } from '@/app/comparison/utils/helpers';
import Modal from '@/app/utils/Modal';
import { uploadBallot } from '@/app/utils/wallet/agora-login';
import { useAuth } from '@/app/utils/wallet/AuthProvider';
import { ExternalLinkIcon } from '@/public/assets/icon-components/ExternalLink';

export enum BallotState {
  Initial,
  Loading,
  Error,
  ErrorNotReady,
  ErrorDelegated,
  Success,
}

interface IProps {
  isBadgeHolderAndNotVoted?: boolean
  closeAttestationModal?: () => void
}

export const UpdateBallotButton: FC<IProps> = ({ isBadgeHolderAndNotVoted = false, closeAttestationModal }) => {
  const [ballotState, setBallotState] = useState<BallotState>(
    BallotState.Initial
  );
  const { address } = useAccount();
  const { data: categories } = useCategories();
  const { loggedToAgora } = useAuth();

  const handleUploadBallot = async () => {
    if (loggedToAgora === 'error' || loggedToAgora === 'initial' || !address)
      return;
    setBallotState(BallotState.Loading);
    const cid = categorySlugIdMap.get(loggedToAgora.category);

    if (!cid) throw new Error('Undefined category id');
    if (categories?.find(el => el.id === cid)?.progress === 'Delegated') {
      setBallotState(BallotState.ErrorDelegated);
      return;
    }
    try {
      const ballot = await getBallot(cid);
      await uploadBallot(ballot, address);
      await ballotSuccessPost();
      setBallotState(BallotState.Success);
    }
    catch (e: any) {
      if (e.response.data.pwCode === 'e-1005')
        setBallotState(BallotState.ErrorNotReady);
      else setBallotState(BallotState.Error);
    }
  };
  return (
    <>
      <Modal
        isOpen={ballotState !== BallotState.Initial}
        onClose={() => {}}
        showCloseButton={false}
      >
        {ballotState === BallotState.Success && (
          <BallotSuccessModal
            link={`${process.env.NEXT_PUBLIC_OPTIMISM_URL}/ballot`}
            onClose={() => {
              setBallotState(BallotState.Initial);

              if (closeAttestationModal) {
                closeAttestationModal();
              }
            }}
          />
        )}
        {ballotState === BallotState.Loading && <BallotLoading />}
        {ballotState === BallotState.Error && (
          <BallotError onClick={handleUploadBallot} />
        )}
        {ballotState === BallotState.ErrorNotReady
        && typeof loggedToAgora === 'object' && (
          <BallotNotReady
            categoryName={convertCategoryToLabel(loggedToAgora.category)}
            onClick={() => {
              setBallotState(BallotState.Initial);
            }}
          />
        )}
        {ballotState === BallotState.ErrorDelegated && typeof loggedToAgora === 'object'
        && (
          <BallotErrorDelegated
            categoryName={convertCategoryToLabel(loggedToAgora.category)}
            onClick={() => { setBallotState(BallotState.Initial); }}
          />
        )}
      </Modal>
      <button
        className={`flex w-fit flex-row items-center justify-center gap-2.5 self-end rounded-lg px-4 py-3 ${
          ballotState === BallotState.Loading
          || (isBadgeHolderAndNotVoted)
            ? 'bg-gray-300 text-gray-500'
            : 'bg-primary text-white'
        }`}
        onClick={handleUploadBallot}
        disabled={
          ballotState === BallotState.Loading
          || (isBadgeHolderAndNotVoted)
        }
      >
        <p>Update Ballot on Optimism</p>
        <span className="m-auto"><ExternalLinkIcon size={24} /></span>
      </button>
    </>
  );
};
