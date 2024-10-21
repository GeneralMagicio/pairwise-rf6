import { FC } from 'react';
import Image from 'next/image';

type TRankingTabsProps = {
  selectedTab: number
  setSelectedTab: (id: number) => void
};

type TTab = {
  id: number
  title: string
  imageSrc: string
  projectCount: number
};

export const tabs: TTab[] = [
  {
    id: 1,
    title: 'Infrastructure & Tooling',
    imageSrc: '/assets/images/category-it-icon.svg',
    projectCount: 20,
  },
  {
    id: 2,
    title: 'Gov Research & Analytics',
    imageSrc: '/assets/images/category-gra-icon.svg',
    projectCount: 15,
  },
  {
    id: 3,
    title: 'Governance Leadership',
    imageSrc: '/assets/images/category-gl-icon.svg',
    projectCount: 30,
  },
];

const RankingTabs: FC<TRankingTabsProps> = ({
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className="my-4 flex gap-6">
      {tabs.map(({ title, id, ...tab }) => (
        <button
          key={id}
          className={`flex gap-2 rounded-full px-6 py-3 font-medium text-gray-700 ${
            selectedTab === id
              ? 'bg-category-tab-active'
              : 'bg-category-tab-inactive'
          }`}
          onClick={() => setSelectedTab(id)}
        >
          <Image src={tab.imageSrc} alt={title} width={25} height={25} />
          {title}
        </button>
      ))}
    </div>
  );
};

export default RankingTabs;
