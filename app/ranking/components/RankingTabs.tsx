import { FC } from 'react';
import Image from 'next/image';
import { tabs } from '../page';

type TRankingTabsProps = {
  selectedTab: number
  setSelectedTab: (id: number) => void
};

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
