import { useQueryClient } from '@tanstack/react-query';
import { useRevokeDelegation } from '@/app/comparison/utils/data-fetching/delegation';
import { CheckIcon } from '@/public/assets/icon-components/Check';

type TDelegatedCategoryProps = {
  id: number
  isAutoConnecting: boolean
  username?: string
};

const DelegatedCategory = ({
  id,
  isAutoConnecting,
  username,
}: TDelegatedCategoryProps) => {
  const { mutateAsync: revokeDelegation } = useRevokeDelegation(id);
  const queryClient = useQueryClient();

  const handleRevoke = async () => {
    await revokeDelegation();
    queryClient.refetchQueries(({
      queryKey: ['fetch-delegates'],
    }));
    queryClient.refetchQueries(({
      queryKey: ['category-ranking'],
    }));
    queryClient.refetchQueries(({
      queryKey: ['categories'],
    }));
    location.reload();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-center gap-2 rounded-md border border-[#17B26A] bg-[#ECFDF3] py-3">
        <CheckIcon />
        <p className="font-semibold text-[#17B26A]">Delegated</p>
      </div>
      {username && (
        <div className="flex w-full justify-center gap-2 rounded-xl bg-gray-100 py-1">
          <p className="text-xs font-medium text-gray-400">
            You delegated to
            {' '}
            <strong className="text-dark-500">{username}</strong>
          </p>
        </div>
      )}
      <button
        onClick={handleRevoke}
        className="whitespace-nowrap text-xs text-gray-600 underline"
        disabled={isAutoConnecting}
      >
        Revoke
      </button>
    </div>
  );
};

export default DelegatedCategory;
