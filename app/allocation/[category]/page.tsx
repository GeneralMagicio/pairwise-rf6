'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useActiveWallet } from 'thirdweb/react';
import RankingRow from './components/RankingRow';
import HeaderRF6 from '../../comparison/card/Header-RF6';
import Spinner from '@/app/components/Spinner';
// import SearchBar from "./components/SearchBar";
import {
  categorySlugIdMap,
  categoryIdTitleMap,
  formatBudget,
} from '../../comparison/utils/helpers';
import { Checkbox } from '@/app/utils/Checkbox';
import { LockIcon } from '@/public/assets/icon-components/Lock';
import { UnlockIcon } from '@/public/assets/icon-components/Unlock';
import NotFoundComponent from '@/app/components/404';
import {
  useProjectsRankingByCategoryId,
  useUpdateProjectRanking,
  useCategoryRankings,
  IProjectRankingObj,
} from '@/app/comparison/utils/data-fetching/ranking';
import { CheckIcon } from '@/public/assets/icon-components/Check';
import { IProjectRanking } from '@/app/comparison/utils/types';
import { ArrowLeft2Icon } from '@/public/assets/icon-components/ArrowLeft2';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRight';
import { modifyPercentage, RankItem } from '../utils';
import Modal from '@/app/utils/Modal';
import AttestationSuccessModal from './attestation/AttestationSuccessModal';
import AttestationLoading from './attestation/AttestationLoading';
import AttestationError from './attestation/AttestationError';
import { attest, AttestationState } from './attestation';
import { useSigner } from './utils';

enum VotingStatus {
  VOTED,
  READY_TO_SUBMIT,
}

const votingStatusMap = {
  [VotingStatus.VOTED]: {
    text: 'Voted',
  },
  [VotingStatus.READY_TO_SUBMIT]: {
    text: 'Ready to submit',
  },
};

const RankingPage = () => {
  const params = useParams();
  const router = useRouter();

  const wallet = useActiveWallet();
  const signer = useSigner();
  const category = categorySlugIdMap.get((params?.category as string) || '');

  // const [search, setSearch] = useState<string>("");
  const [attestationState, setAttestationState] = useState(
    AttestationState.Initial
  );
  const [attestationLink, setAttestationLink] = useState<string>();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [projects, setProjects] = useState<IProjectRanking[] | null>(null);
  const [rankingArray, setRankingArray] = useState<IProjectRankingObj[]>([]);
  const [totalShareError, setTotalShareError] = useState<string | null>(null);
  const [lockedItems, setLockedItems] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [allocationBudget, setAllocationBudget] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categoryRankings, isLoading: rankingLoading }
    = useCategoryRankings();
  const { data: ranking, isLoading } = useProjectsRankingByCategoryId(category);
  const { mutateAsync: updateProjectRanking } = useUpdateProjectRanking({
    cid: category,
    ranking: rankingArray,
  });

  const handleBulkSelection = () => {
    if (!projects) return;

    if (checkedItems.length === projects.length) {
      setCheckedItems([]);
    }
    else {
      setCheckedItems(projects.map(project => project.projectId));
    }
  };

  const handleVote = useCallback(
    debounce((id: number, share: number) => {
      setTotalShareError(null);

      if (!projects) return;

      try {
        const values: RankItem[] = projects.map(project => ({
          id: project.projectId,
          percentage: project.share * 100,
          locked: lockedItems.includes(project.projectId),
          budget: categoryRankings?.budget || 0,
        })) as RankItem[];

        const newValue = values.find(el => el.id === id);

        if (!newValue) return;

        const newRanking = modifyPercentage(values, {
          ...newValue,
          percentage: share * 100,
        });

        const sum = newRanking.reduce(
          (acc, curr) => (acc += curr.percentage),
          0
        );

        setProjects(
          projects.map(project => ({
            ...project,
            share:
              (newRanking.find(el => el.id === project.projectId)
                ?.percentage || 0) / 100,
          }))
        );

        if (sum < 99.9) {
          const deficit = 100 - sum;
          setTotalShareError(
            `Percentages must add up to 100% (add ${
              Math.round(deficit * 100) / 100
            }% to your ballot)`
          );
          window.scrollTo(0, document.body.scrollHeight);
        }
      }
      catch (e: any) {
        if (e.msg === 'Bigger than 100 error') {
          setTotalShareError(
            `Percentages must add up to 100% (remove ${
              Math.round(e.excess * 100) / 100
            }% from your ballot)`
          );
        }
        else {
          setTotalShareError(e.msg);
        }
        window.scrollTo(0, document.body.scrollHeight);
      }
    }, 300),
    [projects, lockedItems, categoryRankings]
  );

  const handleLocck = (id: number) => {
    if (lockedItems.includes(id)) {
      setLockedItems(lockedItems.filter(lockedId => lockedId !== id));
    }
    else {
      if (projects && lockedItems.length >= projects?.length - 2) {
        setTotalShareError('At least two projects must be unlocked');
        window.scrollTo(0, document.body.scrollHeight);
        return;
      }
      setLockedItems([...lockedItems, id]);
    }
  };

  const lockSelection = () => {
    if (!projects) return;

    if (checkedItems.length > projects?.length - 2) {
      setTotalShareError('At least two projects must be unlocked');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    const lockedProjects = checkedItems.filter(
      checkedId => !lockedItems.includes(checkedId)
    );

    setLockedItems([...lockedItems, ...lockedProjects]);
    setCheckedItems([]);
  };

  const unlockSelection = () => {
    if (!projects) return;

    const unlockedProjects = checkedItems.filter(checkedId =>
      lockedItems.includes(checkedId)
    );

    setLockedItems(
      lockedItems.filter(lockedId => !unlockedProjects.includes(lockedId))
    );
    setCheckedItems([]);
  };

  const selectItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(checkedId => checkedId !== id));
    }
    else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const submitVotes = async () => {
    setIsSubmitting(true);

    if (!projects) return;

    const rankingArray = projects.map(project => ({
      id: project.projectId,
      share: project.share,
    }));

    setRankingArray(rankingArray);

    await updateProjectRanking();

    if (!wallet || !ranking || !signer) {
      console.error('Requirements not met for attestations');
      setIsSubmitting(false);
      return;
    }

    await attest({
      ranking: {
        id: ranking.id,
        name: ranking.name,
        ranking: projects.map(el => ({
          RF6Id: el.project.RF6Id,
          share: el.share,
        })),
      },
      setAttestationLink,
      setAttestationState,
      signer,
      wallet,
    });

    setIsSubmitting(false);
  };

  const handleAttestationModalClose = () => {
    if (attestationState === AttestationState.Success) {
      router.push('/allocation');
    }
    else if (attestationState === AttestationState.Error) {
      setAttestationState(AttestationState.Initial);
    }
  };

  useEffect(() => {
    if (!projects || projects.length === 0) {
      setIsLocked(false);
      setIsUnlocked(true);
      return;
    }

    const allLocked = lockedItems.length === projects.length && projects.length;
    const noneLocked = lockedItems.length === 0;
    const checkedLocked = checkedItems.every(id => lockedItems.includes(id));
    const checkedUnlocked = checkedItems.every(
      id => !lockedItems.includes(id)
    );
    const someLocked = checkedItems.some(id => lockedItems.includes(id));
    const someUnlocked = checkedItems.some(id => !lockedItems.includes(id));

    if (allLocked || checkedLocked) {
      setIsLocked(true);
      setIsUnlocked(false);
    }
    else if (noneLocked || checkedUnlocked) {
      setIsLocked(false);
      setIsUnlocked(true);
    }
    else if (someLocked || someUnlocked) {
      setIsLocked(true);
      setIsUnlocked(true);
    }
    else {
      setIsLocked(false);
      setIsUnlocked(false);
    }
  }, [projects, lockedItems, checkedItems]);

  useEffect(() => {
    if (ranking) setProjects(ranking?.ranking);

    if (!categoryRankings?.budget) return;

    const categoryShare
      = categoryRankings?.ranking?.find(
        categoryRanking => categoryRanking.projectId === category
      )?.share || 0;

    setAllocationBudget(categoryRankings?.budget * categoryShare);
  }, [ranking]);

  useEffect(() => {
    if (!projects) return;

    if (lockedItems.length > projects?.length - 2) {
      setTotalShareError('At least two projects must be unlocked');
      window.scrollTo(0, document.body.scrollHeight);
    }
    else {
      setTotalShareError(null);
    }
  }, [lockedItems]);

  if (!category) return <NotFoundComponent />;

  return (
    <div>
      <Modal
        isOpen={attestationState !== AttestationState.Initial}
        onClose={handleAttestationModalClose}
        showCloseButton={true}
      >
        {attestationState === AttestationState.Success && attestationLink && (
          <AttestationSuccessModal
            link={attestationLink}
            onClose={() => setAttestationState(AttestationState.Initial)}
          />
        )}
        {attestationState === AttestationState.Loading && (
          <AttestationLoading />
        )}
        {attestationState === AttestationState.Error && (
          <AttestationError onClick={submitVotes} />
        )}
      </Modal>
      <HeaderRF6 />
      <div className="flex flex-col justify-between gap-4 px-6 py-16 lg:px-20 xl:px-52 2xl:px-72">
        <p className="mb-4 text-2xl font-semibold text-gray-700">
          Edit your votes
        </p>
        <div className="flex flex-col gap-6 rounded-xl border border-gray-200 px-6 py-10">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-semibold text-gray-700">
                {categoryIdTitleMap.get(category)}
              </p>
              <p className="text-sm font-normal text-gray-600">
                OP calculations in this ballot are based on your budget of
                {' '}
                {rankingLoading
                  ? (
                      <span className="text-gray-400">...</span>
                    )
                  : (
                      <span className="underline">
                        {formatBudget(allocationBudget)}
                      </span>
                    )}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-voting-border bg-voting-bg px-3 py-1 text-xs text-voting-text">
              {votingStatusMap[VotingStatus.READY_TO_SUBMIT].text}
              <CheckIcon size={18} />
            </div>
          </div>
          {/* <SearchBar search={search} setSearch={setSearch} /> */}
          <div className="flex items-center justify-between rounded-lg bg-gray-100 px-8 py-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <Checkbox
                  onChange={() => handleBulkSelection()}
                  checked={
                    checkedItems.length === projects?.length
                    && !!projects?.length
                  }
                />
                <p className="text-sm text-gray-600">Select all</p>
              </div>
              <div className="h-6 border-r border-gray-200"></div>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-gray-600">
                  {checkedItems.length}
                  {' '}
                  items selected
                </p>
              </div>
              {!!projects?.length && (
                <>
                  <div className="h-6 border-r border-gray-200" />
                  {isLocked && (
                    <button
                      className="flex items-center justify-center gap-2"
                      onClick={unlockSelection}
                    >
                      <UnlockIcon />
                      <p className="text-sm text-gray-600">Unlock selection</p>
                    </button>
                  )}
                  {isLocked && isUnlocked && (
                    <div className="h-6 border-r border-gray-200" />
                  )}
                  {isUnlocked && (
                    <button
                      className="flex items-center justify-center gap-2"
                      onClick={lockSelection}
                    >
                      <LockIcon />
                      <p className="text-sm text-gray-600">Lock selection</p>
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="flex gap-4">
              <p className="text-sm font-medium text-gray-400">
                {lockedItems.length}
                {' '}
                items locked
              </p>
            </div>
          </div>
          {isLoading
            ? (
                <Spinner />
              )
            : projects?.length
              ? (
                  <table className="w-full">
                    <tbody className="flex flex-col gap-6">
                      {projects.map((project, index) => (
                        <RankingRow
                          key={project.projectId}
                          index={index}
                          budget={allocationBudget * project.share}
                          project={project}
                          selected={checkedItems.includes(project.projectId)}
                          locked={lockedItems.includes(project.projectId)}
                          onLock={handleLocck}
                          onSelect={selectItem}
                          onVote={handleVote}
                        />
                      ))}
                    </tbody>
                  </table>
                )
              : (
                  <p className="text-center text-gray-400">No projects found</p>
                )}

          {totalShareError && (
            <div className="flex justify-end gap-4">
              <p className="text-sm font-medium text-primary">
                {totalShareError}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <button
              className="flex items-center justify-center gap-3 rounded-lg border bg-gray-50 px-4 py-2 font-semibold text-gray-700"
              onClick={() => router.push('/allocation')}
            >
              <ArrowLeft2Icon />
              Back to Categories
            </button>
            <button
              className={`font-semibold" flex items-center justify-center gap-3 rounded-lg px-10 py-2
              ${
    totalShareError
      ? 'bg-gray-200 text-gray-400'
      : 'bg-primary text-white'
    }`}
              onClick={submitVotes}
              disabled={!!totalShareError}
            >
              {isSubmitting
                ? (
                    'Submitting votes...'
                  )
                : (
                    <>
                      Submit votes
                      <ArrowRightIcon />
                    </>
                  )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
