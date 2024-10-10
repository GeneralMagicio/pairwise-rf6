import Image from 'next/image';
import { FC } from 'react';

export interface Category {
  imageSrc: string;
  title: string;
  description: string;
  projectCount: number;
}

interface CategoryAllocationProps extends Category {
  allocationPercentage: number;
  onDelegate: () => void;
  onScore: () => void;
  onLockClick: () => void;
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
}) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="bg-white p-2 rounded-lg">
          <Image src={imageSrc} alt={title} width={24} height={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-xs text-gray-500 mt-1">{projectCount} projects</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 font-bold">-</button>
          <div className="bg-white px-3 py-1 rounded">
            <span className="font-semibold">{allocationPercentage.toFixed(1)}%</span>
          </div>
          <button className="text-gray-500 font-bold">+</button>
        </div>
        <div className="text-gray-500 text-sm">
          {(allocationPercentage * 100000).toLocaleString()} OP
        </div>
        <button
          onClick={onScore}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Score Projects
        </button>
        <button
          onClick={onDelegate}
          className="text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
        >
          Delegate
        </button>
        <button onClick={onLockClick} className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryAllocation;