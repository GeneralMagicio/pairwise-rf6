import debounce from "lodash.debounce";
import Image from "next/image";
import { ChangeEventHandler, FC, useEffect, useRef } from "react";
import { roundFractions } from "../utils";
import { useAuth } from "@/app/utils/wallet/AuthProvider";
import { ArrowRightIcon } from "@/public/assets/icon-components/ArrowRightIcon";
import Link from "next/link";
import { LockIcon } from "@/public/assets/icon-components/Lock";
import { UnlockIcon } from "@/public/assets/icon-components/Unlock";

export interface Category {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  projectCount?: number;
}

interface CategoryAllocationProps extends Category {
  allocationPercentage: number;
  allocatingBudget: boolean;
  onDelegate: () => void;
  onScore: () => void;
  onLockClick: () => void;
  locked: boolean;
  onPercentageChange: (value: number) => void;
}

const CategoryAllocation: FC<CategoryAllocationProps> = ({
  id,
  allocatingBudget,
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
  const { isAutoConnecting } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
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
    if (inputRef.current?.value) {
      inputRef.current.value = `${allocationPercentage}`;
    }
  }, [allocationPercentage]);

  return (
    <div className="flex justify-between rounded-lg border p-4 bg-gray-50">
      <div className="flex w-[76%] justify-between">
        <div className="flex space-x-4">
          <div className=" rounded-lg">
            <Image src={imageSrc} alt={title} width={64} height={64} />
          </div>
          <div className="flex flex-col max-w-[70%] gap-2">
            <Link className="flex font-medium items-center gap-2" href="#">
              {title}
              <ArrowRightIcon color="#05060B" size={24} />
            </Link>
            <p className="text-sm text-gray-400">{description}</p>
            {id !== 0 && projectCount && (
              <p className="w-fit mt-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 font-medium">
                {`${projectCount} project${projectCount > 1 ? "s" : ""}`}
              </p>
            )}
          </div>
        </div>
        <div className="border-l pl-4 flex flex-col gap-2 border-gray-200"></div>
      </div>
      <div className="flex gap-2 justify-center items-center w-[24%]">
        {allocatingBudget ? (
          <div className="w-full flex justify-center gap-6 p-2 items-start">
            <div className="flex flex-col text-gray-500 gap-2">
              <div className="flex gap-2 border rounded-md px-6 py-1">
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
                    className="w-20 text-center font-semibold outline-none bg-gray-50"
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
              <div className="flex bg-gray-100 px-4 py-0.5 text-sm text-gray-600 justify-center rounded-md">
                <p className="text-center w-fit text-xs font-medium">
                  {(allocationPercentage * 100000).toLocaleString() + " OP"}
                </p>
              </div>
            </div>
            <button onClick={onLockClick} className="text-gray-500 py-2">
              {locked ? <LockIcon /> : <UnlockIcon />}
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onScore}
              className={`whitespace-nowrap rounded-md px-8 py-2 text-sm font-medium ${
                isAutoConnecting
                  ? "border bg-gray-300 text-gray-600"
                  : "bg-primary text-white"
              }`}
              disabled={isAutoConnecting}
            >
              Vote
            </button>
            <button
              onClick={onDelegate}
              className={`rounded-md border px-4 py-2 text-sm font-medium ${
                isAutoConnecting ? "bg-gray-300 text-gray-600" : "text-gray-700"
              }`}
              disabled={isAutoConnecting}
            >
              Delegate
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryAllocation;
