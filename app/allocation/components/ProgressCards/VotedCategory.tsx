import { CheckIcon } from '@/public/assets/icon-components/Check';

type TVotedCategoryProps = {
  id: number
  isAutoConnecting: boolean
  budgetEditHandle: () => void
  attestationLink?: string | null
  delegations: number
};

const VotedCategory = ({
  isAutoConnecting,
  attestationLink,
  delegations,
  budgetEditHandle,
}: TVotedCategoryProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-md border py-3 font-semibold"
        onClick={budgetEditHandle}
      >
        Edit
      </button>
      {attestationLink != null && (
        delegations
          ? (
              <div className="flex w-full justify-center gap-2 rounded-xl border border-[#17B26A] bg-[#ECFDF3] py-1">
                <p className="text-xs font-medium text-[#17B26A]">
                  Voted on behalf of
                  {' '}
                  {delegations}
                  {' '}
                  {(delegations <= 1) ? 'person' : 'persons'}
                </p>
                <CheckIcon size={15} />
              </div>
            )
          : (
              <div className="flex w-full justify-center gap-2 rounded-xl border border-[#17B26A] bg-[#ECFDF3] py-1">
                <p className="text-xs font-medium text-[#17B26A]">Voted</p>
                <CheckIcon size={15} />
              </div>
            )
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
