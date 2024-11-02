import { UserColabGroupIcon } from '@/public/assets/icon-components/UserColabGroup';

type TPendingCategoryProps = {
  onScore: () => void
  onDelegate: () => void
  progress: string
  isAutoConnecting: boolean
  delegations?: number
  isBadgeholder: boolean
  bhCategory: string
  categorySlug: string
  isBHCategoryAtessted: boolean
};

const PendingCategory = ({
  onScore,
  onDelegate,
  isAutoConnecting,
  delegations,
  progress,
  isBadgeholder,
  bhCategory,
  categorySlug,
  isBHCategoryAtessted,
}: TPendingCategoryProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full items-center justify-between">
        <button
          onClick={onScore}
          className={`whitespace-nowrap rounded-md py-3 text-sm font-medium ${
            isAutoConnecting || (isBadgeholder && bhCategory !== categorySlug && !isBHCategoryAtessted)
              ? 'border bg-gray-300 text-gray-600'
              : 'bg-primary text-white'
          } ${
            isBadgeholder && bhCategory === categorySlug ? 'w-full' : 'w-[48%]'
          }`}
          disabled={
            isAutoConnecting || (isBadgeholder && bhCategory !== categorySlug && !isBHCategoryAtessted)
          }
        >
          Vote
        </button>
        <button
          onClick={onDelegate}
          className={`w-[48%] rounded-md border py-3 text-sm font-medium ${
            isAutoConnecting ? 'bg-gray-300 text-gray-600' : 'text-gray-700'
          } ${isBadgeholder && bhCategory === categorySlug ? 'hidden' : ''}`}
          disabled={isAutoConnecting}
        >
          Delegate
        </button>
      </div>
      {!!delegations && (
        <div className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FFE6D5] p-1">
          <UserColabGroupIcon />
          <p className="text-xs font-medium text-gray-400">
            <strong className="text-dark-500">
              {delegations > 1
                ? delegations + ' people'
                : delegations + ' person'}
            </strong>
            {' '}
            delegated to you
          </p>
        </div>
      )}
      {(progress === 'WIP' || progress === 'Finished')
      && !(isBadgeholder && bhCategory !== categorySlug && !isBHCategoryAtessted) && (
        <div className="flex w-full justify-center gap-2 rounded-xl border border-[#FFA15A] bg-[#FFF7ED] py-1">
          <p className="text-xs font-medium text-[#FFA15A]">Voting</p>
        </div>
      )}
    </div>
  );
};

export default PendingCategory;
