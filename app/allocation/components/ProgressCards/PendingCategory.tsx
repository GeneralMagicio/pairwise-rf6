import { UserColabGroupIcon } from '@/public/assets/icon-components/UserColabGroup';

type TPendingCategoryProps = {
  onScore: () => void
  onDelegate: () => void
  isAutoConnecting: boolean
  delegations?: number
};

const PendingCategory = ({
  onScore,
  onDelegate,
  isAutoConnecting,
  delegations,
}: TPendingCategoryProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full items-center justify-between">
        <button
          onClick={onScore}
          className={`w-[48%] whitespace-nowrap rounded-md py-3 text-sm font-medium ${
            isAutoConnecting
              ? 'border bg-gray-300 text-gray-600'
              : 'bg-primary text-white'
          }`}
          disabled={isAutoConnecting}
        >
          Vote
        </button>
        <button
          onClick={onDelegate}
          className={`w-[48%] rounded-md border py-3 text-sm font-medium ${
            isAutoConnecting ? 'bg-gray-300 text-gray-600' : 'text-gray-700'
          }`}
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
    </div>
  );
};

export default PendingCategory;
