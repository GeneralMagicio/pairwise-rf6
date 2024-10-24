import { ChangeEventHandler, FC, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import Image from 'next/image';
import { roundFractions } from '../utils';
import { useAuth } from '@/app/utils/wallet/AuthProvider';
import { CollectionProgressStatusEnum } from '@/app/comparison/utils/types';
import { TCategory } from '@/app/comparison/utils/data-fetching/categories';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRightIcon';
import { UnlockIcon } from '@/public/assets/icon-components/Unlock';
import { LockIcon } from '@/public/assets/icon-components/Lock';
import Loading from '@/app/components/Loading';
import VotedCategory from './ProgressCards/VotedCategory';
import DelegatedCategory from './ProgressCards/DelegatedCategory';
import PendingCategory from './ProgressCards/PendingCategory';
import {
  categoryIdSlugMap,
  formatBudget,
} from '@/app/comparison/utils/helpers';

// Image source map for collections
const collectionsImageSrc = new Map<number, string>([
  [1, '/assets/images/category-it.svg'],
  [2, '/assets/images/category-gra.svg'],
  [3, '/assets/images/category-gl.svg'],
]);

interface CategoryAllocationProps extends TCategory {
  allocationPercentage: number
  allocatingBudget: boolean
  allocationBudget: number
  locked: boolean
  delegations: number
  loading: boolean
  username?: string
  onDelegate: () => void
  onScore: () => void
  onLockClick: () => void
  onPercentageChange: (value: number) => void
}

const CategoryAllocation: FC<CategoryAllocationProps> = ({
  id,
  allocatingBudget,
  name,
  description,
  projectCount,
  progress,
  allocationPercentage,
  allocationBudget,
  locked,
  delegations,
  loading,
  username,
  onDelegate,
  onScore,
  onLockClick,
  onPercentageChange,
}) => {
  const { isAutoConnecting } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const hrefLink
    = progress === CollectionProgressStatusEnum.Finished
      ? `/allocation/${categoryIdSlugMap.get(id)}`
      : `/comparison/${categoryIdSlugMap.get(id)}`;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (event) => {
      const value = event.target.value;
      onPercentageChange(roundFractions(Number(value), 2));
    },
    1500
  );

  const handlePlus = debounce(() => {
    const value = allocationPercentage;
    onPercentageChange(Number(Math.min(value + 1, 100)));
  }, 150);

  const handleMinus = debounce(() => {
    const value = allocationPercentage;
    onPercentageChange(Math.max(Number(value - 1), 0));
  }, 150);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = `${allocationPercentage}`;
    }
  }, [allocationPercentage]);

  const renderProgressState = () => {
    if (loading) return <Loading />;
    switch (progress) {
      case CollectionProgressStatusEnum.Delegated:
        return (
          <DelegatedCategory id={id} isAutoConnecting={isAutoConnecting} username={username} />
        );
      case CollectionProgressStatusEnum.Finished:
        return <VotedCategory id={id} isAutoConnecting={isAutoConnecting} />;
      case CollectionProgressStatusEnum.Pending:
      default:
        return (
          <PendingCategory
            onScore={onScore}
            onDelegate={onDelegate}
            isAutoConnecting={isAutoConnecting}
            delegations={delegations}
          />
        );
    }
  };

  return (
    <div className="flex justify-between rounded-lg border bg-gray-50 p-4">
      <div className="flex w-[74%] space-x-4">
        <ImageContainer src={collectionsImageSrc.get(id) || ''} alt={name} />
        <ProjectInfo
          name={name}
          description={description}
          projectCount={projectCount}
          hrefLink={hrefLink}
          isDelegated={progress === CollectionProgressStatusEnum.Delegated}
        />
      </div>

      <div className="flex w-[26%] items-center justify-center gap-2 border-l border-gray-200">
        <div className="flex w-4/5 items-start justify-center">
          {allocatingBudget
            ? (
                <div className="flex w-full items-start justify-center gap-6 p-2">
                  <div className="flex flex-col gap-2 text-gray-500">
                    <div className="flex gap-2 rounded-md border px-6 py-1">
                      <button
                        onClick={handleMinus}
                        className="font-bold text-gray-600"
                      >
                        -
                      </button>
                      <div className="flex gap-0 rounded bg-white text-dark-500">
                        <input
                          onChange={handleInputChange}
                          ref={inputRef}
                          className="w-20 bg-gray-50 text-center font-semibold outline-none"
                          type="number"
                          defaultValue={allocationPercentage}
                        />
                      </div>
                      <button
                        onClick={handlePlus}
                        className="font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex justify-center rounded-md bg-gray-100 px-4 py-0.5 text-sm text-gray-600">
                      <p className="text-xs font-medium">
                        {formatBudget(allocationBudget)}
                        {' '}
                        OP
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onLockClick}
                    className={`rounded-md p-1.5 ${
                      locked ? 'bg-gray-700' : 'bg-transparent'
                    }`}
                  >
                    {locked ? <LockIcon color="#fff" /> : <UnlockIcon />}
                  </button>
                </div>
              )
            : (
                renderProgressState()
              )}
        </div>
      </div>
    </div>
  );
};

const ImageContainer: FC<{ src: string, alt: string }> = ({ src, alt }) => (
  <div className="rounded-lg">
    <Image src={src} alt={alt} width={64} height={64} />
  </div>
);

const ProjectInfo: FC<{
  name: string
  description: string
  projectCount?: number
  hrefLink: string
  isDelegated?: boolean
}> = ({ name, description, projectCount, hrefLink, isDelegated }) => (
  <div
    className={`flex max-w-[70%] flex-col gap-2 ${isDelegated && 'opacity-40'}`}
  >
    {isDelegated
      ? (
          <p className="flex items-center gap-2 font-medium">
            {name}
            <ArrowRightIcon color="#05060B" size={24} />
          </p>
        )
      : (
          <Link className="flex items-center gap-2 font-medium" href={hrefLink}>
            {name}
            <ArrowRightIcon color="#05060B" size={24} />
          </Link>
        )}
    <p className="text-sm text-gray-400">{description}</p>
    {projectCount && (
      <p className="mt-2 w-fit rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700">
        {`${projectCount} project${projectCount > 1 ? 's' : ''}`}
      </p>
    )}
  </div>
);

export default CategoryAllocation;
