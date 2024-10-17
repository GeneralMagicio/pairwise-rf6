import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/utils/wallet/AuthProvider';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRightIcon';

export interface BudgetCategory {
  imageSrc: string
  title: string
  description: string
}

interface BudgetAllocationProps extends BudgetCategory {
  onDelegate: () => void
  onScore: () => void
}

const BudgetAllocation: FC<BudgetAllocationProps> = ({
  imageSrc,
  title,
  description,
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
        <button
          onClick={onScore}
          className={`whitespace-nowrap rounded-md px-8 py-2 text-sm font-medium ${
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
          className={`rounded-md border px-4 py-2 text-sm font-medium ${
            isAutoConnecting ? 'bg-gray-300 text-gray-600' : 'text-gray-700'
          }`}
          disabled={isAutoConnecting}
        >
          Delegate
        </button>
      </div>
    </div>
  );
};

export default BudgetAllocation;
