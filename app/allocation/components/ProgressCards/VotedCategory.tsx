import { useRouter } from 'next/navigation';
import { categoryIdSlugMap } from '@/app/comparison/utils/helpers';
import { CheckIcon } from '@/public/assets/icon-components/Check';

type TVotedCategoryProps = {
  id: number
  isAutoConnecting: boolean
};

const VotedCategory = ({
  id,
  isAutoConnecting,
}: TVotedCategoryProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-md border py-3 font-semibold"
        onClick={() => router.push(`/allocation/${categoryIdSlugMap.get(id)}`)}
      >
        Edit
      </button>
      <div className="flex w-full justify-center gap-2 rounded-xl border border-[#17B26A] bg-[#ECFDF3] py-1">
        <p className="text-xs font-medium text-[#17B26A]">Voted</p>
        <CheckIcon size={15} />
      </div>
      <button
        onClick={() => {}}
        className="whitespace-nowrap text-xs text-gray-600 underline"
        disabled={isAutoConnecting}
      >
        View attestation
      </button>
    </div>
  );
};

export default VotedCategory;
