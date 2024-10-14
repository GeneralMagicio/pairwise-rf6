'use client';

import { useState } from 'react';
import { useActiveWallet } from 'thirdweb/react';
import HeaderRF6 from '../comparison/card/Header-RF6';
import Modal from '../utils/Modal';
import EmailLoginModal from './components/EOA/EmailLoginModal';

import CategoryAllocation, { Category } from './components/CategoryAllocation';
import ConnectBox from './components/ConnectBox';
import { modifyPercentage, RankItem } from './utils';
import { CustomizedSlider } from './components/Slider';

const Categories: Category[] = [
  {
    id: 1,
    title: 'Infrastructure & Tooling',
    description:
      'Ethereum Core Contributions are infrastructure which supports, or is a dependency, of the OP Stack.',
    imageSrc: '/assets/images/category-it.png',
    projectCount: 20,
  },
  {
    id: 2,
    title: 'Gov Research & Analytics',
    description: `Direct research & development contributions to the OP Stack, and contributions that
    support protocol upgrades.`,
    imageSrc: '/assets/images/category-gra.png',
    projectCount: 15,
  },
  {
    id: 3,
    title: 'Governance Leadership',
    description:
      'Efforts that improve the usability and accessibility of the OP Stack through tooling enhancements.',
    imageSrc: '/assets/images/category-gl.png',
    projectCount: 30,
  },
];

const ranks: RankItem[] = [
  {
    id: 1,
    locked: false,
    percentage: 33.4,
  },
  {
    id: 2,
    locked: false,
    percentage: 33.3,
  },
  {
    id: 3,
    locked: false,
    percentage: 33.3,
  },
];

const AllocationPage = () => {
  const wallet = useActiveWallet();
  const [categoryRanking, setCategoryRanking] = useState(ranks);
  const [totalValue, setTotalValue] = useState(2);
  const [percentageError, setPercentageError] = useState<string>();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLock = (id: RankItem['id']) => () => {
    try {
      const currValue = categoryRanking.find(el => el.id === id)!;
      const newRanking = modifyPercentage(categoryRanking, {
        ...currValue,
        locked: !currValue.locked,
      });
      setCategoryRanking(newRanking);
      setPercentageError(undefined);
    }
    catch (e: any) {
      setPercentageError(e.msg);
    }
  };

  const handleNewValue = (id: RankItem['id']) => (percentage: number) => {
    try {
      const currValue = categoryRanking.find(el => el.id === id)!;
      const newRanking = modifyPercentage(categoryRanking, {
        ...currValue,
        percentage,
      });
      setCategoryRanking(newRanking);
      setPercentageError(undefined);
    }
    catch (e: any) {
      console.log(e);
      setPercentageError(e.msg);
    }
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setTotalValue(newValue);
    }
  };

  const handleScoreProjects = () => {
    console.log('wallet :>> ', wallet);
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }
  };

  return (
    <div>
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} showCloseButton={true}>
        <EmailLoginModal closeModal={() => setShowLoginModal(false)} />
      </Modal>
      <HeaderRF6
        progress={30}
        category="category"
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={false}
      />
      <div className="flex justify-between gap-4 p-16">
        <div className="flex max-w-[65%] flex-col gap-3">
          <h2 className="text-3xl font-bold"> Round 6: Governance </h2>
          <p className="text-gray-600">
            Retroactive Public Goods Funding (Retro Funding) 6 will reward
            contributions to Optimism Governance, including governance
            infrastructure & tooling, governance analytics, and governance
            leadership.
          </p>
          <p className="bg-yellow-50 p-4">
            Decide on the budget for this round, decide how much should go to
            each category, and score projects in each category using the
            Pairwise raking. You can also choose to delegate your decision to
            someone on X (Twitter) or Farcaster. By connecting your X and
            Farcaster accounts, find out if someone delegated voting decision to
            you.
          </p>
          <div className="flex flex-col gap-6 rounded-md border p-6">
            <div>
              <h3 className="mb-4 w-full border-b pb-2 text-2xl font-bold">
                {' '}
                Your budget
                {' '}
              </h3>
              <div className="flex flex-col justify-between">
                <p>
                  Choose how much OP should be dedicated to this round, or
                  delegate this decision to someone you trust.
                </p>
                <div className="my-3 flex items-center gap-4">
                  <span> 2M </span>
                  <CustomizedSlider
                    className="my-2 min-w-[55%]"
                    value={totalValue}
                    onChange={handleSliderChange}
                    shiftStep={0.1}
                    step={0.1}
                    marks
                    min={2}
                    max={8}
                  />
                  <span> 8M </span>
                  <div className="w-64 whitespace-nowrap border bg-gray-50 py-2 text-center text-sm text-gray-500">
                    {(totalValue * 1_000_000).toLocaleString()}
                    {' '}
                    OP
                  </div>
                  <button
                    onClick={() => {}}
                    className="ml-auto rounded-md border px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    Delegate
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 w-full border-b pb-2 text-2xl font-bold">
                {' '}
                Categories
                {' '}
              </h3>
              <div>
                <p className="my-4">
                  Score projects in each category doing the Pairwise ranking, or
                  delegate this decision to someone you trust.
                </p>
                <div className="flex flex-col gap-4">
                  {Categories.map((cat) => {
                    const rank = categoryRanking.find(
                      el => el.id === cat.id
                    )!;
                    return (
                      <CategoryAllocation
                        {...cat}
                        key={cat.title}
                        locked={rank.locked}
                        onDelegate={() => {}}
                        onLockClick={handleLock(cat.id)}
                        onScore={handleScoreProjects}
                        allocationPercentage={rank.percentage}
                        onPercentageChange={handleNewValue(cat.id)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <span className='className="w-fit h-4 self-end text-primary'>
              {' '}
              {percentageError ? `Error: ${percentageError}` : ''}
              {' '}
            </span>
            <button className="w-fit self-end rounded-lg bg-primary px-4 py-3 text-white">
              Submit your votes
            </button>
          </div>
        </div>
        <div className="mt-28 max-w-[25%]">
          <ConnectBox
            onConnectFarcaster={() => {}}
            onConnectTwitter={() => {}}
            onConnectWorldID={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
