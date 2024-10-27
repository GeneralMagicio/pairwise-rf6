import React, { useMemo } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/utils/wallet/AuthProvider';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRightIcon';
import { CollectionProgressStatusEnum } from '@/app/comparison/utils/types';
import Loading from '@/app/components/Loading';
import VotedCategory from './ProgressCards/VotedCategory';
import DelegatedCategory from './ProgressCards/DelegatedCategory';
import PendingCategory from './ProgressCards/PendingCategory';

export interface BudgetCategory {
  id: number
  imageSrc: string
  name: string
  description: string
}

interface IBudgetAllocationProps extends BudgetCategory {
  progress: CollectionProgressStatusEnum
  delegations: number
  loading: boolean
  username?: string
  onDelegate: () => void
  onScore: () => void
}

const BudgetAllocation: React.FC<IBudgetAllocationProps> = ({
  id,
  imageSrc,
  name,
  description,
  delegations,
  loading,
  progress = CollectionProgressStatusEnum.Pending,
  username,
  onScore,
  onDelegate,
}) => {
  const { isAutoConnecting } = useAuth();

  const renderProgressState = useMemo(() => {
    switch (progress) {
      case CollectionProgressStatusEnum.Finished:
        return <VotedCategory id={id} isAutoConnecting={isAutoConnecting} />;
      case CollectionProgressStatusEnum.Delegated:
        return (
          <DelegatedCategory id={id} isAutoConnecting={isAutoConnecting} username={username} />
        );
      case CollectionProgressStatusEnum.Pending:
      default:
        return (
          <PendingCategory
            onScore={onScore}
            onDelegate={onDelegate}
            progress={progress}
            delegations={delegations}
            isAutoConnecting={isAutoConnecting}
          />
        );
    }
  }, [progress, delegations, isAutoConnecting]);

  return (
    <div className="flex justify-between rounded-lg border bg-gray-50 p-4">
      <div className="flex w-[64%] space-x-4 2xl:w-[74%]">
        <ImageContainer src={imageSrc} alt={name} />
        <ProjectInfo
          name={name}
          description={description}
          onScore={onScore}
          isDelegated={progress === CollectionProgressStatusEnum.Delegated}
        />
      </div>
      <div className="flex w-[36%] items-center justify-center border-l border-gray-200 2xl:w-[26%]">
        <div className="flex w-4/5 items-start justify-center">
          {loading ? <Loading /> : renderProgressState}
        </div>
      </div>
    </div>
  );
};

const ImageContainer: React.FC<{ src: string, alt: string }> = ({
  src,
  alt,
}) => (
  <div className="rounded-lg">
    <Image src={src} alt={alt} width={64} height={64} />
  </div>
);

const ProjectInfo: React.FC<{
  name: string
  description: string
  isDelegated?: boolean
  onScore?: () => void
}> = ({ name, description, isDelegated, onScore }) => (
  <div
    className={`flex max-w-[70%] flex-col gap-2 ${isDelegated && 'opacity-40'}`}
  >
    <button
      className="flex items-center gap-2 font-medium"
      onClick={onScore}
      disabled={isDelegated}
    >
      {name}
      <ArrowRightIcon color="#05060B" size={24} />
    </button>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

export default BudgetAllocation;
