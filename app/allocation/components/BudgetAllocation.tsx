import React, { useMemo } from 'react';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
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
  isBadgeholder: boolean
  bhCategory: string
  isBHCategoryAtessted: boolean
  attestationLink: string | null
  categorySlug: string
  onEdit: () => void
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
  attestationLink,
  progress = CollectionProgressStatusEnum.Pending,
  username,
  isBadgeholder,
  isBHCategoryAtessted,
  bhCategory,
  categorySlug,
  onScore,
  onEdit,
  onDelegate,
}) => {
  const { isAutoConnecting } = useAuth();
  const posthog = usePostHog();

  const renderProgressState = useMemo(() => {
    switch (progress) {
      case CollectionProgressStatusEnum.Attested:
        return (
          <VotedCategory
            budgetEditHandle={onEdit}
            id={id}
            delegations={delegations}
            isAutoConnecting={isAutoConnecting}
            attestationLink={attestationLink || ''}
          />
        );
      case CollectionProgressStatusEnum.Delegated:
        return (
          <DelegatedCategory
            id={id}
            isAutoConnecting={isAutoConnecting}
            username={username}
          />
        );
      case CollectionProgressStatusEnum.Finished:
      case CollectionProgressStatusEnum.Pending:
      default:
        return (
          <PendingCategory
            onScore={() => {
              posthog.capture('Start Voting', {
                category: name,
              });
              onScore();
            }}
            onDelegate={() => {
              posthog.capture('Start Voting', {
                category: name,
              });
              onDelegate();
            }}
            progress={progress}
            delegations={delegations}
            isAutoConnecting={isAutoConnecting}
            isBadgeholder={isBadgeholder}
            bhCategory={bhCategory}
            categorySlug={categorySlug}
            isBHCategoryAtessted={isBHCategoryAtessted}
          />
        );
    }
  }, [progress, delegations, isAutoConnecting, onScore]);

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
}> = ({ name, description, isDelegated, onScore }) => {
  const posthog = usePostHog();
  return (

    <div
      className={`flex max-w-[70%] flex-col gap-2 ${isDelegated && 'opacity-40'}`}
    >
      <button
        className="flex items-center gap-2 font-medium"
        onClick={() => {
          posthog.capture('Explore project', { category: name });
          if (onScore)
            onScore();
        }}
        disabled={isDelegated}
      >
        {name}
        <ArrowRightIcon color="#05060B" size={24} />
      </button>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default BudgetAllocation;
