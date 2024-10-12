import debounce from 'lodash.debounce';
import Image from 'next/image';
import { ChangeEventHandler, FC, useEffect, useRef } from 'react';
import { UnlockIcon } from '@/public/assets/icon-components/Unlock';
import { LockIcon } from '@/public/assets/icon-components/Lock';

export interface Category {
  id: number
  imageSrc: string
  title: string
  description: string
  projectCount: number
}

interface CategoryAllocationProps extends Category {
  allocationPercentage: number
  onDelegate: () => void
  onScore: () => void
  onLockClick: () => void
  locked: boolean
  onPercentageChange: (value: number) => void
}

const CategoryAllocation: FC<CategoryAllocationProps> = ({
  imageSrc,
  title,
  description,
  projectCount,
  allocationPercentage,
  onDelegate,
  onScore,
  onLockClick,
  locked,
  onPercentageChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = debounce((event) => {
    const value = event.target.value;
    onPercentageChange(Number(value));
  }, 1500);

  useEffect(() => {
    if (inputRef.current?.value) {
      inputRef.current.value = `${allocationPercentage}`;
    }
  }, [allocationPercentage]);

  return (
    <div className="flex justify-between rounded-lg border p-4">
      <div className="flex max-w-[75%] space-x-4">
        <div className=" rounded-lg">
          <Image src={imageSrc} alt={title} width={96} height={96} />
        </div>
        <div className="max-w-[70%] space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="mt-1 w-fit rounded-lg bg-gray-100 p-2 text-xs text-gray-800">
            {projectCount}
            {' '}
            projects
          </p>
        </div>
      </div>
      <div className="flex w-fit flex-col gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex justify-center gap-6 border px-10 py-2">
            <button className="font-bold text-gray-500">-</button>
            <div className="flex gap-1 rounded bg-white">
              <input
                onChange={handleInputChange}
                ref={inputRef}
                className="w-16 text-center font-semibold"
                type="number"
                defaultValue={allocationPercentage}
              />
              <span> % </span>
            </div>
            <button className="font-bold text-gray-500">+</button>
          </div>
          <button onClick={onLockClick} className="text-gray-500">
            {locked
              ? (
                  <LockIcon />
                )
              : (
                  <UnlockIcon />
                )}
          </button>
        </div>
        <div className="w-fit border bg-gray-50 px-[53px] py-2 text-sm text-gray-500">
          {(allocationPercentage * 100000).toLocaleString()}
          {' '}
          OP
        </div>
        <div className="my-2 flex gap-2">
          <button
            onClick={onScore}
            className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            Score Projects
          </button>
          <button
            onClick={onDelegate}
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700"
          >
            Delegate
          </button>
        </div>

      </div>
    </div>
  );
};

export default CategoryAllocation;
