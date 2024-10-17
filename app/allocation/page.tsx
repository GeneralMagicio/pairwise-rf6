'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveWallet } from 'thirdweb/react';
import HeaderRF6 from '../comparison/card/Header-RF6';
import Modal from '../utils/Modal';
import EmailLoginModal from './components/EOA/EmailLoginModal';

import CategoryAllocation, { Category } from './components/CategoryAllocation';
import BudgetAllocation, {
  BudgetCategory,
} from './components/BudgetAllocation';
import ConnectBox from './components/ConnectBox';
import { modifyPercentage, RankItem } from './utils';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRight';
import { ArrowLeft2Icon } from '@/public/assets/icon-components/ArrowLeft2';
import { CustomizedSlider } from './components/Slider';
import { categoryIdSlugMap } from '../comparison/utils/helpers';
import { useCategories } from './components/hooks/getCategories';
import WorldIdSignInSuccessModal from './components/WorldIdSignInSuccessModal';
import FarcasterModal from './components/FarcasterModal';

const BudgetCategory: BudgetCategory = {
  title: 'Budget',
  description:
    'Choose how much OP should be dedicated to this round, or delegate this decision to someone you trust.',
  imageSrc: '/assets/images/budget-card.svg',
};

const Categories: Category[] = [
  {
    id: 1,
    title: 'Governance Infrastructure & Tooling',
    description:
      'Infrastructure and tooling that powered governance or that made the usage of governance infrastructure more accessible.',
    imageSrc: '/assets/images/category-it.svg',
    projectCount: 20,
  },
  {
    id: 2,
    title: 'Governance Analytics',
    description:
      'Analytics that enabled accountability, provided transparency into Collective operations, promoted improved performance, or aided in the design of the Collective.',
    imageSrc: '/assets/images/category-gra.svg',
    projectCount: 15,
  },
  {
    id: 3,
    title: 'Governance Leadership',
    description:
      'Demonstrated leadership in the Collective, including but not limited to, hosting community calls and/or participation in councils, boards and commissions beyond executing on basic responsibilities outlined in Token House Charters.',
    imageSrc: '/assets/images/category-gl.svg',
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
  const router = useRouter();

  const { data: categories, isLoading } = useCategories();
  console.log('categories => ', categories, isLoading);

  const [categoryRanking, setCategoryRanking] = useState(ranks);
  const [totalValue, setTotalValue] = useState(2);
  const [percentageError, setPercentageError] = useState<string>();
  const [isOpenFarcasterModal, setIsOpenFarcasterModal] = useState(false);
  const [isWorldIdSignSuccessModal, setIsWorldIdSignSuccessModal]
    = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [allocatingBudget, setAllocatingBudget] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

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

  const handleScoreProjects = (id: RankItem['id']) => () => {
    setSelectedCategoryId(id);

    if (!wallet) {
      setShowLoginModal(true);
      return;
    }

    router.push(`/comparison/${categoryIdSlugMap.get(id)}`);
  };

  return (
    <div>
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        showCloseButton={true}
      >
        <EmailLoginModal
          closeModal={() => setShowLoginModal(false)}
          selectedCategoryId={selectedCategoryId}
        />
      </Modal>
      <HeaderRF6
        progress={30}
        category="category"
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={false}
      />
      <WorldIdSignInSuccessModal
        isOpen={isWorldIdSignSuccessModal}
        onClose={() => {
          setIsWorldIdSignSuccessModal(false);
        }}
      />
      <FarcasterModal
        isOpen={isOpenFarcasterModal}
        onClose={() => {
          setIsOpenFarcasterModal(false);
        }}
      />
      <div className="flex flex-col gap-6 p-16">
        {!allocatingBudget && (
          <div className="flex max-w-[65%] flex-col gap-3">
            <h2 className="text-3xl font-bold"> Round 6: Governance</h2>
            <p className="text-gray-400">
              Retro Funding 6 will reward contributions to Optimism Governance,
              including governance infrastructure & tooling, governance
              analytics, and governance leadership.
            </p>
            <p className="mt-4 rounded-xl bg-[#FFFAEB] p-4 text-dark-500">
              Decide on the budget for this round, and score projects in each
              category using the Pairwise raking. You can also choose to
              delegate your decision to someone on X (Twitter) or Farcaster.
            </p>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <div className="flex max-w-[65%] flex-col gap-6 rounded-xl border p-6">
            <div>
              <h3 className="mb-4 w-full border-b pb-6 text-2xl font-bold">
                {allocatingBudget ? 'Your budget' : 'Voting'}
              </h3>
              <div className="flex flex-col justify-between">
                {allocatingBudget
                  ? (
                      <p>
                        Choose how much OP should be dedicated to this round, or
                        delegate this decision to someone you trust.
                      </p>
                    )
                  : (
                      <p>
                        Score projects in each category doing the Pairwise ranking,
                        or delegate this decision to someone you trust.
                      </p>
                    )}
                {allocatingBudget && (
                  <div className="my-6 flex items-center gap-4">
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
                    <div className="w-64 whitespace-nowrap rounded-md border bg-gray-50 py-2 text-center text-sm text-gray-500">
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
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {!allocatingBudget && (
                <BudgetAllocation
                  {...BudgetCategory}
                  onDelegate={() => {}}
                  onScore={() => {
                    setAllocatingBudget(true);
                  }}
                />
              )}
              {Categories.map((cat) => {
                const rank = categoryRanking.find(el => el.id === cat.id)!;
                return (
                  <CategoryAllocation
                    {...cat}
                    key={cat.title}
                    locked={cat.id === 0 ? true : rank.locked}
                    onDelegate={() => {}}
                    onLockClick={handleLock(cat.id)}
                    allocatingBudget={allocatingBudget}
                    onScore={handleScoreProjects(cat.id)}
                    allocationPercentage={cat.id === 0 ? 0 : rank.percentage}
                    onPercentageChange={handleNewValue(cat.id)}
                  />
                );
              })}
            </div>
            {allocatingBudget && (
              <span className='className="w-fit h-4 self-end text-primary'>
                {percentageError ? `Error: ${percentageError}` : ''}
              </span>
            )}
            {allocatingBudget
              ? (
                  <div className="flex justify-between">
                    <button
                      className="flex items-center justify-center gap-3 rounded-lg border bg-gray-50 px-4 py-2 font-semibold text-gray-700"
                      onClick={() => setAllocatingBudget(false)}
                    >
                      <ArrowLeft2Icon />
                      Back to Categories
                    </button>
                    <button className="flex items-center justify-center gap-3 rounded-lg bg-primary px-10 py-2 font-semibold text-white">
                      Submit Vote
                      <ArrowRightIcon size={20} />
                    </button>
                  </div>
                )
              : (
                  <button className="w-fit self-end rounded-lg bg-primary px-4 py-3 text-white">
                    Update Ballot
                  </button>
                )}
          </div>
          <div className="max-w-[25%]">
            <ConnectBox
              onConnectFarcaster={() => {
                setIsOpenFarcasterModal(true);
              }}
              onConnectTwitter={() => {}}
              onConnectWorldID={() => {
                setIsWorldIdSignSuccessModal(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
