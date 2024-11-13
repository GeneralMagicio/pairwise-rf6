import { useRouter } from 'next/navigation';
import { categoryIdSlugMap } from '@/app/comparison/utils/helpers';
import { CheckIcon } from '@/public/assets/icon-components/Check';

type TVotedCategoryProps = {
  id: number
  isAutoConnecting: boolean
  budgetEditHandle?: () => void
  attestationLink?: string | null
};

const VotedCategory = ({
  id,
  isAutoConnecting,
  attestationLink,
  budgetEditHandle,
}: TVotedCategoryProps) => {
  const router = useRouter();

  const handleEdit = () => {
    if (budgetEditHandle) {
      budgetEditHandle();
      return;
    }
 else router.push(`/allocation/${categoryIdSlugMap.get(id)}`);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-md border py-3 font-semibold"
        onClick={handleEdit}
      >
        Edit
      </button>
      {attestationLink != null && (
        <div className="flex w-full justify-center gap-2 rounded-xl border border-[#17B26A] bg-[#ECFDF3] py-1">
          <p className="text-xs font-medium text-[#17B26A]">Voted</p>
          <CheckIcon size={15} />
        </div>
      )}
      {attestationLink && (
        <button
          onClick={() => window.open(attestationLink, '_blank')}
          className="whitespace-nowrap text-xs text-gray-600 underline"
          disabled={isAutoConnecting}
        >
          View attestation
        </button>
      )}
    </div>
  );
};

export default VotedCategory;
