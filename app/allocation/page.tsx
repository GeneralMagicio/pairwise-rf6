'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveWallet } from 'thirdweb/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { usePostHog } from 'posthog-js/react';
import HeaderRF6 from '../comparison/card/Header-RF6';
import Modal from '../utils/Modal';
import EmailLoginModal from './components/EOA/EmailLoginModal';

import CategoryAllocation from './components/CategoryAllocation';
import BudgetAllocation, {
  BudgetCategory,
} from './components/BudgetAllocation';
import ConnectBox from './components/ConnectBox';
import { modifyPercentage, RankItem, roundFractions } from './utils';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRight';
import { ArrowLeft2Icon } from '@/public/assets/icon-components/ArrowLeft2';
import { CustomizedSlider } from './components/Slider';
import {
  categoryIdSlugMap,
  categorySlugIdMap,
  convertCategoryToLabel,
  formatBudget,
} from '../comparison/utils/helpers';
import { useCategories } from '../comparison/utils/data-fetching/categories';
import WorldIdSignInSuccessModal from './components/WorldIdSignInSuccessModal';
import FarcasterModal from './components/FarcasterModal';
import DelegateModal from '../delegation/DelegationModal';
import { FarcasterLookup } from '../delegation/farcaster/FarcasterLookup';
import FarcasterSuccess from '../delegation/farcaster/FarcasterSuccess';
import { axiosInstance } from '../utils/axiosInstance';
import { TargetDelegate } from '../delegation/farcaster/types';
import { useGetDelegationStatus } from '@/app/utils/getConnectionStatus';
import {
  ICategory,
  CollectionProgressStatusEnum,
} from '../comparison/utils/types';
import SmallSpinner from '../components/SmallSpinner';
import {
  useCategoryRankings,
  useUpdateCategoriesRanking,
} from '@/app/comparison/utils/data-fetching/ranking';
import { getJWTData } from '../utils/wallet/agora-login';
import { attest, AttestationState, VotingHasEnded } from './[category]/attestation';
import AttestationError from './[category]/attestation/AttestationError';
import AttestationLoading from './[category]/attestation/AttestationLoading';
import AttestationSuccessModal from './[category]/attestation/AttestationSuccessModal';
import { useSigner } from './[category]/utils';
import BadgeholderModal from './components/BadgeholderModal';
import StorageLabel from '../lib/localStorage';
import { UpdateBallotButton } from './[category]/components/UpdateBallotButton';
import AskDelegations from '../delegation/farcaster/AskDelegations';
import XModal from './components/XModal';

const budgetCategory: BudgetCategory = {
  id: -1,
  name: 'Budget',
  description:
    'Choose how much OP should be dedicated to this round, or delegate this decision to someone you trust.',
  imageSrc: '/assets/images/budget-card.svg',
};

enum DelegationState {
  Initial,
  DelegationMethod,
  Lookup,
  Success,
}

const AllocationPage = () => {
  const wallet = useActiveWallet();
  const router = useRouter();
  const signer = useSigner();
  const { chainId, address } = useAccount();
  const { isBadgeholder, category } = getJWTData();
  const posthog = usePostHog();

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: delegations, isLoading: delegationsLoading }
    = useGetDelegationStatus();
  const { data: categoryRankings } = useCategoryRankings();

  const queryClient = useQueryClient();

  const colDelegationToYou = delegations?.toYou?.collections;
  const colDelegationFromYou = delegations?.fromYou?.collections;
  const budgetDelegateToYou = delegations?.toYou?.budget;
  const budgetDelegateFromYou = delegations?.fromYou?.budget;

  const [attestationState, setAttestationState] = useState(AttestationState.Initial);
  const [attestationLink, setAttestationLink] = useState<string>();
  const [closingDesibled, setClosingDesibled] = useState(false);

  const [totalValue, setTotalValue] = useState(categoryRankings?.budget || 0);
  const [percentageError, setPercentageError] = useState<string>();
  const [isOpenFarcasterModal, setIsOpenFarcasterModal] = useState(false);
  const [isOpenXModal, setIsOpenXModal] = useState(false);
  const [isWorldIdSignSuccessModal, setIsWorldIdSignSuccessModal]
    = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [allocatingBudget, setAllocatingBudget] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [isWorldIdSignErrorModal, setIsWorldIdSignErrorModal] = useState(false);
  const [categoriesRanking, setCategoriesRanking] = useState<RankItem[]>();
  const [dbudgetProgress, setDbudgetProgress]
    = useState<CollectionProgressStatusEnum>(
      CollectionProgressStatusEnum.Pending
    );

  const [showBHGuideModal, setShowBHGuideModal] = useState(false);

  const [delegationState, setDelegationState] = useState(
    DelegationState.Initial
  );
  const [categoryToDelegate, setCategoryToDelegate]
    = useState<Pick<ICategory, 'id' | 'name'>>();
  const [targetDelegate, setTargetDelegate] = useState<TargetDelegate>();

  const [rankingProgress, setRankingProgress]
    = useState<CollectionProgressStatusEnum>(
      CollectionProgressStatusEnum.Pending
    );

  const { mutateAsync: updateCategoriesRanking } = useUpdateCategoriesRanking({
    budget: totalValue,
    allocationPercentages:
      categoriesRanking?.map(el => el.percentage / 100) || [],
  });

  const handleSubmitVote = async () => {
    await updateCategoriesRanking();

    if (!wallet || !signer || !categoriesRanking) {
      console.error('Requirements not met for attestations', wallet, signer, categoriesRanking);
      return;
    }

    if (!VotingHasEnded) {
      await attest({ ranking: { id: -1, name: 'Budget', ranking: categoriesRanking.map(el => ({ RF6Id: el.RF6Id, share: el.percentage / 100 })) },
        setAttestationLink, setAttestationState, signer, wallet, isBudget: true });
    }

    queryClient.refetchQueries({
      queryKey: ['category-ranking'],
    });
  };

  const handleDelegate = async (username: string, target: TargetDelegate) => {
    if (!categoryToDelegate) return;

    posthog.capture('Delegating vote power');
    await axiosInstance.post('flow/delegate/farcaster', {
      collectionId: categoryToDelegate.id,
      targetUsername: username,
    });

    queryClient.refetchQueries({
      queryKey: ['fetch-delegates'],
    });
    queryClient.refetchQueries({
      queryKey: ['category-ranking'],
    });
    queryClient.refetchQueries({
      queryKey: ['categories'],
    });
    setTargetDelegate(target);
    setDelegationState(DelegationState.Success);
  };

  const handleAttestationModalClose = () => {
    if (attestationState === AttestationState.Success) {
      setAttestationState(AttestationState.Initial);
      setAllocatingBudget(false);
    }
    if (attestationState === AttestationState.Error) {
      setAttestationState(AttestationState.Initial);
    }
  };

  const handleVoteBudget = () => {
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }
    setAllocatingBudget(true);
  };

  const handleLock = (id: RankItem['id']) => () => {
    try {
      if (!categoriesRanking) return;

      const currValue = categoriesRanking.find(el => el.id === id)!;
      const newRanking = modifyPercentage(categoriesRanking, {
        ...currValue,
        locked: !currValue.locked,
      });
      setCategoriesRanking(newRanking);
      setPercentageError(undefined);
    }
    catch (e: any) {
      setPercentageError(e.msg);
    }
  };

  const handleNewValue = (id: RankItem['id']) => (percentage: number) => {
    try {
      if (!categoriesRanking) return;

      const currValue = categoriesRanking?.find(el => el.id === id)!;
      const newRanking = modifyPercentage(categoriesRanking, {
        ...currValue,
        percentage,
        budget: currValue.budget * (percentage / currValue.percentage),
      });
      setCategoriesRanking(newRanking);
      setPercentageError(undefined);
    }
    catch (e: any) {
      console.log(e);
      setPercentageError(e.msg);
    }
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

  const resetDelegateState = () => {
    setCategoryToDelegate(undefined);
    setDelegationState(DelegationState.Initial);
    setTargetDelegate(undefined);
  };

  const handleScoreProjects = (id: RankItem['id']) => () => {
    posthog.capture('Start voting', {
      category: categoryIdSlugMap.get(id),
    });
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }

    setSelectedCategoryId(id);
    router.push(`/comparison/${categoryIdSlugMap.get(id)}`);
  };

  const handleEdit = (id: RankItem['id']) => {
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }

    setSelectedCategoryId(id);
    router.push(`/allocation/${categoryIdSlugMap.get(id)}`);
  };

  const getColNumOfDelegations = (id: number) => {
    const colDelegation = colDelegationToYou?.filter(
      el => el.collectionId === id
    );
    return colDelegation?.length || 0;
  };

  const isBGCategoryVoted = () => {
    const bhCategoryProgress = categories?.find(
      el => el.id === categorySlugIdMap.get(category)
    )?.progress;

    return (
      bhCategoryProgress === CollectionProgressStatusEnum.Finished
      || bhCategoryProgress === CollectionProgressStatusEnum.Attested
    );
  };

  const isBHCategoryAtessted = () => {
    const bhCategoryProgress = categories?.find(
      el => el.id === categorySlugIdMap.get(category)
    )?.progress;

    return bhCategoryProgress === CollectionProgressStatusEnum.Attested;
  };

  useEffect(() => {
    if (categoryRankings) {
      setRankingProgress(categoryRankings.progress);
    }
  }, [categoryRankings]);

  useEffect(() => {
    if (delegations) {
      const budgetDelegateFromYou = delegations?.fromYou?.budget;

      if (budgetDelegateFromYou?.metadata?.username) {
        setDbudgetProgress(CollectionProgressStatusEnum.Delegated);
      }
    }
  }, [delegations]);

  useEffect(() => {
    if (
      rankingProgress === CollectionProgressStatusEnum.Attested
      && dbudgetProgress === CollectionProgressStatusEnum.Pending
    ) {
      setDbudgetProgress(CollectionProgressStatusEnum.Attested);
    }
    else setDbudgetProgress(CollectionProgressStatusEnum.Pending);
  }, [rankingProgress]);

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

  useEffect(() => {
    if (!address || !chainId || !isBadgeholder || isBGCategoryVoted()) return;

    const currentUserKey = `${chainId}_${address}`;

    const storedData = JSON.parse(
      localStorage.getItem(StorageLabel.BADGEHOLDER_GUIDE_MODAL) || '{}'
    );

    const isAlreadyShown = storedData[currentUserKey];

    if (isAlreadyShown) return;

    setShowBHGuideModal(true);

    localStorage.setItem(
      StorageLabel.BADGEHOLDER_GUIDE_MODAL,
      JSON.stringify({
        ...storedData,
        [currentUserKey]: true,
      })
    );
  }, [chainId, address]);

  return (
    <div>
      <Modal
        isOpen={
          attestationState !== AttestationState.Initial
        }
        onClose={handleAttestationModalClose}
        showCloseButton={true}
      >
        {attestationState === AttestationState.FarcasterDelegate && attestationLink && (
          <AskDelegations
            categoryName={category}
            link={attestationLink}
            onClose={() => {
              if (isBadgeholder) {
                setAttestationState(AttestationState.Success);
              }
              else {
                setAttestationState(AttestationState.Initial);
              }
            }}
            isBadgeHolder={isBadgeholder}
          />
        )}
        {attestationState === AttestationState.Success && attestationLink && (
          <AttestationSuccessModal
            link={attestationLink}
            onClose={() => {
              setAttestationState(AttestationState.Initial);
              setAllocatingBudget(false);
            }}
          />
        )}
        {attestationState === AttestationState.Loading && <AttestationLoading />}
        {attestationState === AttestationState.Error && <AttestationError onClick={handleSubmitVote} />}
      </Modal>
      <Modal
        isOpen={
          delegationState !== DelegationState.Initial && !!categoryToDelegate
        }
        onClose={resetDelegateState}
        showCloseButton={true}
      >
        {delegationState === DelegationState.DelegationMethod && (
          <DelegateModal
            categoryName={categoryToDelegate!.name}
            onFindDelegatesFarcaster={() => {
              posthog.capture('Find delegate on Farcaster', {
                category: categoryToDelegate!.name,
              });
              setDelegationState(DelegationState.Lookup);
            }}
            onFindDelegatesTwitter={() => {}}
          />
        )}

        {delegationState === DelegationState.Lookup && (
          <FarcasterLookup
            handleDelegate={handleDelegate}
            categoryName={categoryToDelegate!.name}
          />
        )}
        {delegationState === DelegationState.Success && targetDelegate && (
          <FarcasterSuccess
            categoryName={categoryToDelegate!.name}
            displayName={targetDelegate.displayName}
            username={targetDelegate.username}
            profilePicture={targetDelegate.profilePicture}
            onClose={resetDelegateState}
          />
        )}
      </Modal>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        showCloseButton={!closingDesibled}
      >
        <EmailLoginModal
          closeModal={() => setShowLoginModal(false)}
          setCloseModalDisabled={setClosingDesibled}
          selectedCategoryId={selectedCategoryId}
        />
      </Modal>

      <Modal
        isOpen={showBHGuideModal}
        onClose={() => {
          setShowBHGuideModal(false);
        }}
        showCloseButton
      >
        <BadgeholderModal
          categoryName={category ? convertCategoryToLabel(category) : ''}
          categorySlug={category}
          onClose={() => {
            setShowBHGuideModal(false);
          }}
        />
      </Modal>
      <HeaderRF6 />
      <WorldIdSignInSuccessModal
        isOpen={isWorldIdSignSuccessModal}
        onClose={() => {
          setIsWorldIdSignSuccessModal(false);
        }}
      />
      <WorldIdSignInSuccessModal
        isOpen={isWorldIdSignErrorModal}
        onClose={() => {
          setIsWorldIdSignErrorModal(false);
        }}
        isError
      />

      <FarcasterModal
        isOpen={isOpenFarcasterModal}
        onClose={() => {
          setIsOpenFarcasterModal(false);
        }}
      />

      <XModal
        isOpen={isOpenXModal}
        onClose={() => {
          setIsOpenXModal(false);
        }}
      />
      <div className="flex flex-col gap-6 p-16">
        {!allocatingBudget && (
          <div className="flex max-w-[72%] flex-col gap-3">
            <h2 className="text-3xl font-bold"> Round 6: Governance</h2>
            <p className="text-gray-400">
              Retro Funding 6 will reward contributions to Optimism Governance,
              including governance infrastructure & tooling, governance
              analytics, and governance leadership.
            </p>
            <p className="mt-4 rounded-xl bg-[#FFFAEB] p-4 text-dark-500">
              Decide on the budget for this round, and score projects in each
              category using the Pairwise ranking. You can also choose to
              delegate your decision to someone on Farcaster.
            </p>
          </div>
        )}
        <div className={`flex ${allocatingBudget ? 'justify-center' : 'justify-between'} gap-4`}>
          <div className="flex w-[72%] flex-col gap-6 rounded-xl border p-6">
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
                  <>
                    <div className="my-6 flex items-center gap-4">
                      <span> 1.1M </span>
                      <CustomizedSlider
                        className="my-2 min-w-[55%]"
                        value={totalValue / 1_000_000}
                        onChange={handleSliderChange}
                        shiftStep={0.1}
                        step={0.1}
                        marks
                        min={1.1}
                        max={3.5}
                      />
                      <span> 3.5M </span>
                      <div className="w-64 whitespace-nowrap rounded-md border bg-gray-50 py-2 text-center text-sm text-gray-500">
                        {formatBudget(totalValue)}
                        {' '}
                        OP
                      </div>
                    </div>
                    <p className="text-gray-400">
                      Next, decide how much OP should go to each category
                    </p>
                  </>
                )}
              </div>
            </div>
            {categoriesLoading
              ? (
                  <div className="h-96 w-full">
                    <SmallSpinner />
                  </div>
                )
              : (
                  categories
                  && categories.length > 0 && (
                    <div className="flex flex-col gap-4">
                      {!allocatingBudget && (
                        <BudgetAllocation
                          {...budgetCategory}
                          progress={dbudgetProgress}
                          attestationLink={categoryRankings?.attestationLink || null}
                          delegations={budgetDelegateToYou?.length || 0}
                          loading={delegationsLoading}
                          isBadgeholder={isBadgeholder}
                          bhCategory={category}
                          isBHCategoryAtessted={isBHCategoryAtessted()}
                          categorySlug={category}
                          onDelegate={() => {
                            setCategoryToDelegate(budgetCategory);
                            setDelegationState(DelegationState.DelegationMethod);
                          }}
                          onScore={handleVoteBudget}
                          onEdit={handleVoteBudget}
                          username={budgetDelegateFromYou?.metadata?.username}
                        />
                      )}
                      {categories.map((cat) => {
                        const rank = categoriesRanking?.find(
                          el => el.id === cat.id
                        );
                        return (
                          <CategoryAllocation
                            {...cat}
                            key={cat.name}
                            locked={rank?.locked || false}
                            delegations={getColNumOfDelegations(cat.id)}
                            allocatingBudget={allocatingBudget}
                            allocationPercentage={rank?.percentage || 0}
                            allocationBudget={rank?.budget || 0}
                            loading={delegationsLoading}
                            isBadgeholder={isBadgeholder}
                            bhCategory={category}
                            isBHCategoryAtessted={isBHCategoryAtessted()}
                            categorySlug={categoryIdSlugMap.get(cat.id)!}
                            onDelegate={() => {
                              posthog.capture('Start delegating', {
                                category: cat.name,
                              });
                              setCategoryToDelegate(cat);
                              setDelegationState(DelegationState.DelegationMethod);
                            }}
                            onLockClick={handleLock(cat.id)}
                            onScore={handleScoreProjects(cat.id)}
                            onEdit={() => handleEdit(cat.id)}
                            onPercentageChange={handleNewValue(cat.id)}
                            username={
                              colDelegationFromYou?.find(
                                el => el.collectionId === cat.id
                              )?.metadata?.username
                            }
                          />
                        );
                      })}
                    </div>
                  )
                )}
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
                      onClick={() => {
                        posthog.capture('Back to categories');
                        setAllocatingBudget(false);
                      }}
                    >
                      <ArrowLeft2Icon />
                      Back to Categories
                    </button>
                    <button
                      className="flex items-center justify-center gap-3 rounded-lg bg-primary px-10 py-2 font-semibold text-white"
                      onClick={() => {
                        posthog.capture('Submit votes');
                        handleSubmitVote();
                      }}
                    >
                      Submit Vote
                      <ArrowRightIcon size={20} />
                    </button>
                  </div>
                )
              : (
                  <UpdateBallotButton isBadgeHolderAndNotVoted={(isBadgeholder && !isBGCategoryVoted())} />
                )}
          </div>
          {!allocatingBudget && (
            <div className="w-[25%]">
              <ConnectBox
                onConnectFarcaster={() => {
                  setIsOpenFarcasterModal(true);
                }}
                onConnectTwitter={() => {
                  setIsOpenXModal(true);
                }}
                onConnectWorldID={(isError?: boolean) => {
                  if (isError) {
                    setIsWorldIdSignErrorModal(true);
                    return;
                  }
                  setIsWorldIdSignSuccessModal(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
