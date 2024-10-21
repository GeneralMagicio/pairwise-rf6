import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/utils/wallet/AuthProvider';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRightIcon';
import { CollectionProgressStatusEnum } from '@/app/comparison/utils/types';
import { CheckIcon } from '@/public/assets/icon-components/Check';
import { UserColabGroupIcon } from '@/public/assets/icon-components/UserColabGroup';

export interface BudgetCategory {
  imageSrc: string
  title: string
  description: string
  status: string
  delegations: number
}

interface BudgetAllocationProps extends BudgetCategory {
  onDelegate: () => void
  onScore: () => void
}

const BudgetAllocation: FC<BudgetAllocationProps> = ({
  imageSrc,
  title,
  description,
  delegations,
  status,
  onDelegate,
  onScore,
}) => {
  const { isAutoConnecting } = useAuth();

  return (
    <div className="flex justify-between rounded-lg border bg-gray-50 p-4">
      <div className="flex w-[76%] justify-between">
        <div className="flex space-x-4">
          <div className=" rounded-lg">
            <Image src={imageSrc} alt={title} width={64} height={64} />
          </div>
          <div className="flex max-w-[70%] flex-col gap-2">
            <Link className="flex items-center gap-2 font-medium" href="#">
              {title}
              <ArrowRightIcon color="#05060B" size={24} />
            </Link>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-l border-gray-200 pl-4"></div>
      </div>
      <div className="flex w-[24%] items-center justify-center gap-2">
        <div className="flex w-4/5 items-start justify-center">
          {status === CollectionProgressStatusEnum.Pending
            ? (
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
                        isAutoConnecting
                          ? 'bg-gray-300 text-gray-600'
                          : 'text-gray-700'
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
              )
            : status === CollectionProgressStatusEnum.Finished
              ? (
                  <div className="flex w-full flex-col items-center justify-center gap-4">
                    <button className="flex w-full items-center justify-center gap-2 rounded-md border py-3 font-semibold">
                      Edit
                    </button>
                    <div className="flex w-full justify-center gap-2 rounded-xl border border-[#17B26A] bg-[#ECFDF3] py-1">
                      <p className="text-xs font-medium text-[#17B26A]">Voted</p>
                      <CheckIcon size={15} />
                    </div>
                    <button
                      onClick={onScore}
                      className="whitespace-nowrap text-xs text-gray-600 underline"
                      disabled={isAutoConnecting}
                    >
                      View attestation
                    </button>
                  </div>
                )
              : (
                  status === CollectionProgressStatusEnum.Delegated && (
                    <div className="flex w-full flex-col items-center justify-center gap-4">
                      <div className="flex w-full items-center justify-center gap-2 rounded-md border border-[#17B26A] bg-[#ECFDF3] py-3">
                        <CheckIcon />
                        <p className="font-semibold text-[#17B26A]">Delegated</p>
                      </div>
                      <div className="flex w-full justify-center gap-2 rounded-xl bg-gray-100 py-1">
                        <p className="text-xs font-medium text-gray-400">
                          You delegated to
                          {' '}
                          <strong className="text-dark-500">@username</strong>
                        </p>
                      </div>
                      <button
                        onClick={onScore}
                        className="whitespace-nowrap text-xs text-gray-600 underline"
                        disabled={isAutoConnecting}
                      >
                        Revoke
                      </button>
                    </div>
                  )
                )}
        </div>
      </div>
    </div>
  );
};

export default BudgetAllocation;
