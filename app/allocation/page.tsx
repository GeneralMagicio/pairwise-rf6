/* eslint-disable no-undef */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveWallet } from 'thirdweb/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import HeaderRF6 from '../comparison/card/Header-RF6';
import styles from '../styles/BadgeholderModal.module.css';
import Modal from '../utils/Modal';
import EmailLoginModal from './components/EOA/EmailLoginModal';
import CategoryAllocation from './components/CategoryAllocation';
import BudgetAllocation, { BudgetCategory } from './components/BudgetAllocation';
import ConnectBox from './components/ConnectBox';
import SmallSpinner from '../components/SmallSpinner';
import { RankItem, modifyPercentage, roundFractions } from './utils';
import { categoryIdSlugMap } from '../comparison/utils/helpers';
import { useCategories } from '../comparison/utils/data-fetching/categories';
import { useCategoryRankings, useUpdateCategoriesRanking } from '@/app/comparison/utils/data-fetching/ranking';
import { getJWTData } from '../utils/wallet/agora-login';
import { useAuth } from '../utils/wallet/AuthProvider';
import { uploadBallot, ballotSuccessPost } from '../comparison/ballot/useGetBallot';
import BadgeholderIllustration from '/public/assets/images/badgeholder-illustration.svg';


enum BallotState {
  Initial,
  Loading,
  Error,
  ErrorNotReady,
  ErrorDelegated,
  Success,
}

const budgetCategory: BudgetCategory = {
  id: -1,
  name: 'Budget',
  description: 'Decide how much OP to allocate or delegate the budget to someone you trust.',
  imageSrc: '/assets/images/budget-card.svg',
};

const AllocationPage = () => {
  const wallet = useActiveWallet();
  const router = useRouter();
  const { address } = useAccount();
  const { loggedToAgora } = useAuth();
  const { isBadgeholder, category } = getJWTData();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: categoryRankings } = useCategoryRankings();
  const queryClient = useQueryClient();

  const [showBadgeholderModal, setShowBadgeholderModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [allocatingBudget, setAllocatingBudget] = useState(false);
  const [categoriesRanking, setCategoriesRanking] = useState<RankItem[]>();
  const [totalValue, setTotalValue] = useState(0);
  const [percentageError, setPercentageError] = useState<string>();
  const [ballotState, setBallotState] = useState(BallotState.Initial);

  const { mutateAsync: updateCategoriesRanking } = useUpdateCategoriesRanking({
    budget: totalValue,
    allocationPercentages: categoriesRanking?.map(el => el.percentage / 100) || [],
  });

  // Show Badgeholder Modal on initial page load if user is a Badgeholder
  useEffect(() => {
    if (isBadgeholder) {
      const modalKey = `hasSeenBadgeHolderModal_${address}`;
      const hasSeen = sessionStorage.getItem(modalKey); // Use sessionStorage to track modal state
      if (!hasSeen) {
        setShowBadgeholderModal(true); // Show modal
        sessionStorage.setItem(modalKey, 'true'); // Mark modal as shown in sessionStorage
      }
    }
  }, [isBadgeholder, address]);

  // Set categories and rankings
  useEffect(() => {
    if (categoryRankings) {
      setCategoriesRanking(
        categoryRankings.ranking.map(el => ({
          RF6Id: el.project.RF6Id,
          id: el.projectId,
          percentage: roundFractions(el.share * 100, 6),
          locked: false,
          budget: categoryRankings.budget * el.share,
        }))
      );
      setTotalValue(categoryRankings.budget);
    }
  }, [categoryRankings]);

  const handleStartVoting = () => {
    setShowBadgeholderModal(false); // Close Badgeholder Modal
    if (!wallet) {
      setShowLoginModal(true); // Trigger login modal if no wallet
      return;
    }
    router.push(`/voting/${category}`);
  };

  const handleScoreProjects = (id: number) => {
    if (!wallet) {
      setSelectedCategoryId(id); // Store category for login modal
      setShowLoginModal(true); // Open login modal
      return;
    }
    router.push(`/comparison/${categoryIdSlugMap.get(id)}`);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setTotalValue(newValue * 1_000_000);
      setCategoriesRanking(
        categoriesRanking?.map(el => ({
          ...el,
          budget: el.budget * (newValue / (totalValue / 1_000_000)),
        }))
      );
    }
  };

  const handleNewValue = (id: RankItem['id']) => (percentage: number) => {
    try {
      if (!categoriesRanking) return;
      const currValue = categoriesRanking.find(el => el.id === id)!;
      const newRanking = modifyPercentage(categoriesRanking, {
        ...currValue,
        percentage,
        budget: currValue.budget * (percentage / currValue.percentage),
      });
      setCategoriesRanking(newRanking);
      setPercentageError(undefined);
    } catch (e: any) {
      setPercentageError(e.msg);
    }
  };

  const handleUploadBallot = async () => {
    if (loggedToAgora === 'error' || loggedToAgora === 'initial' || !address) return;
    setBallotState(BallotState.Loading);
    try {
      const ballot = await uploadBallot(address);
      await ballotSuccessPost();
      setBallotState(BallotState.Success);
    } catch (error) {
      setBallotState(BallotState.Error);
    }
  };

  return (
    <div>
      {/* Badgeholder Modal */}
      {showBadgeholderModal && (
        <div className={styles['badgeholder-modal']}>
          <div className={styles['modal-content']}>
            <img
              src="/assets/images/badgeholder-illustration.svg"
              alt="Badgeholder Illustration"
              className={styles.modalIllustration}
            />
            <h2 className={styles['modal-title']}>Welcome Badgeholder!</h2>
            <p className={styles['modal-text']}>
              You are assigned to vote on
              {' '}
              <strong>{category?.replace('_', ' ') || 'your category'}</strong>
              .
            </p>
            <div className={styles['modal-buttons']}>
              <button className={styles['modal-button-primary']} onClick={handleStartVoting}>
                Start Voting
              </button>
              <button
                className={styles['modal-button-secondary']}
                onClick={() => setShowBadgeholderModal(false)}
              >
                Let Me Explore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Login Modal */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} showCloseButton={true}>
        <EmailLoginModal closeModal={() => setShowLoginModal(false)} selectedCategoryId={selectedCategoryId} />
      </Modal>

      <HeaderRF6 />

      <div className="flex flex-col gap-6 p-16">
        <div className="flex justify-between gap-4">
          <div className="flex w-[72%] flex-col gap-6 rounded-xl border p-6">
            {allocatingBudget
              ? (
                  <BudgetAllocation
                    budget={totalValue}
                    onSliderChange={handleSliderChange}
                    categories={categoriesRanking || []}
                    onPercentageChange={handleNewValue}
                  />
                )
              : (
                  <BudgetAllocation
                    {...budgetCategory}
                    progress={BallotState.Initial}
                    attestationLink={null}
                    delegations={0}
                    loading={false}
                    isBadgeholder={isBadgeholder}
                    bhCategory={category}
                    categorySlug={category}
                    onScore={handleStartVoting}
                    onDelegate={() => {}}
                  />
                )}

            {categoriesLoading
              ? (
                  <SmallSpinner />
                )
              : (
                  categories
                  && categories.map((cat) => {
                    const rank = categoriesRanking?.find(el => el.id === cat.id);
                    return (
                      <CategoryAllocation
                        allocatingBudget={false}
                        locked={false}
                        delegations={0}
                        loading={false}
                        isBadgeholder={false}
                        bhCategory=""
                        categorySlug=""
                        onDelegate={function (): void {
                          throw new Error('Function not implemented.');
                        }}
                        onLockClick={function (): void {
                          throw new Error('Function not implemented.');
                        }}
                        onPercentageChange={function (value: number): void {
                          throw new Error('Function not implemented.');
                        }}
                        {...cat}
                        key={cat.id}
                        allocationPercentage={rank?.percentage || 0}
                        allocationBudget={rank?.budget || 0}
                        onScore={() => handleScoreProjects(cat.id)}
                      />
                    );
                  })
                )}

            {!allocatingBudget && (
              <button
                className={`w-fit self-end rounded-lg px-4 py-3 ${
                  ballotState === BallotState.Loading
                  || (isBadgeholder && !categories?.find(el => el.id === category)?.progress)
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-primary text-white'
                }`}
                onClick={handleUploadBallot}
                disabled={
                  ballotState === BallotState.Loading
                  || (isBadgeholder && !categories?.find(el => el.id === category)?.progress)
                }
              >
                Update Ballot on Optimism
              </button>
            )}
          </div>

          <div className="w-[25%]">
            <ConnectBox
              onConnectWorldID={() => { }}
              onConnectTwitter={function (): void {
                throw new Error('Function not implemented.');
              }}
              onConnectFarcaster={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
