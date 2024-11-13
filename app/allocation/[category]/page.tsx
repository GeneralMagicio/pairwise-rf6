/* eslint-disable no-undef */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveWallet } from 'thirdweb/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import HeaderRF6 from '../comparison/card/Header-RF6';
import styles from '../styles/BadgeholderModal.module.css';
import Modal from '../utils/Modal';
import EmailLoginModal from './components/EOA/EmailLoginModal';
import CategoryAllocation from './components/CategoryAllocation';
import BudgetAllocation, { BudgetCategory } from './components/BudgetAllocation';
import ConnectBox from './components/ConnectBox';
import SmallSpinner from '../components/SmallSpinner';
import {
  RankItem,
  modifyPercentage,
  roundFractions,
} from './utils';
import { categoryIdSlugMap } from '../comparison/utils/helpers';
import { useCategories } from '../comparison/utils/data-fetching/categories';
import { useCategoryRankings, useUpdateCategoriesRanking } from '@/app/comparison/utils/data-fetching/ranking';
import { getJWTData } from '../utils/wallet/agora-login';
import { useAuth } from '../utils/wallet/AuthProvider';
import { uploadBallot, ballotSuccessPost } from '../comparison/ballot/useGetBallot';

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
  description:
    'Choose how much OP should be allocated or delegate this decision to someone you trust.',
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

  useEffect(() => {
    if (isBadgeholder) {
      const modalKey = `hasSeenBadgeHolderModal_${address}`;
      const hasSeen = sessionStorage.getItem(modalKey);
      if (!hasSeen) {
        setShowBadgeholderModal(true);
        sessionStorage.setItem(modalKey, 'true');
      }
    }
  }, [isBadgeholder, address]);

  useEffect(() => {
    if (categoryRankings) {
      setCategoriesRanking(
        categoryRankings.ranking.map((el) => ({
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
    setShowBadgeholderModal(false);
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }
    router.push(`/voting/${category}`);
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
            <Image
              src="/assets/images/badgeholder-illustration.svg"
              alt="Badgeholder Illustration"
              className={styles.modalIllustration}
              width={200}
              height={200}
            />

            <h2 className={styles['modal-title']}>Welcome Badgeholder!</h2>
            <p className={styles['modal-text']}>
              You are assigned to vote on{' '}
              <strong>{category?.replace('_', ' ') || 'your category'}</strong>.
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
            {allocatingBudget ? (
              <BudgetAllocation
                budget={totalValue}
                onSliderChange={() => {}}
                categories={categoriesRanking || []}
                onPercentageChange={() => {}}
              />
            ) : (
              categories &&
              categories.map((cat) => {
                const rank = categoriesRanking?.find((el) => el.id === cat.id);
                return (
                  <CategoryAllocation
                    {...cat}
                    key={cat.id}
                    allocationPercentage={rank?.percentage || 0}
                    allocationBudget={rank?.budget || 0}
                    onScore={() => handleStartVoting()}
                  />
                );
              })
            )}
            {categoriesLoading && <SmallSpinner />}
          </div>

          <div className="w-[25%]">
            <ConnectBox
              onConnectWorldID={() => {}}
              onConnectTwitter={() => {}}
              onConnectFarcaster={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
