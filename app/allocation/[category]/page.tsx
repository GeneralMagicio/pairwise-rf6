'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useActiveWallet } from 'thirdweb/react';
import { usePostHog } from 'posthog-js/react';
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
} from '@/app/comparison/utils/data-fetching/ranking';
import { CheckIcon } from '@/public/assets/icon-components/Check';
import {
  CollectionProgressStatusEnum,
  IProjectRanking,
} from '@/app/comparison/utils/types';
import { ArrowLeft2Icon } from '@/public/assets/icon-components/ArrowLeft2';
import { ArrowRightIcon } from '@/public/assets/icon-components/ArrowRight';
import { modifyPercentage, RankItem } from '../utils';
import Modal from '@/app/utils/Modal';
import AttestationSuccessModal from './attestation/AttestationSuccessModal';
import AttestationLoading from './attestation/AttestationLoading';
import AttestationError from './attestation/AttestationError';
import { attest, AttestationState, VotingHasEnded } from './attestation';
import { useSigner } from './utils';
import {
  useMarkCoi,
  useUnmarkCoi,
} from '@/app/comparison/utils/data-fetching/coi';
import AskDelegations from '@/app/delegation/farcaster/AskDelegations';
import { getJWTData } from '@/app/utils/wallet/agora-login';
import EmailLoginModal from '../components/EOA/EmailLoginModal';

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
  const posthog = usePostHog();

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
  const [totalShareError, setTotalShareError] = useState<string | null>(null);
  const [lockedItems, setLockedItems] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [allocationBudget, setAllocationBudget] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nonCoIProjects, setNonCoIProjects] = useState<IProjectRanking[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [closingDesibled, setClosingDesibled] = useState(false);

  const { data: categoryRankings, isLoading: rankingLoading }
    = useCategoryRankings();
  const { data: ranking, isLoading } = useProjectsRankingByCategoryId(category);
  const { mutateAsync: updateProjectRanking }
    = useUpdateProjectRanking(category);
  const { mutateAsync: markProjectCoI } = useMarkCoi();
  const { mutateAsync: unmarkProjectCoI } = useUnmarkCoi();

  const { isBadgeholder } = getJWTData();

  const handleBulkSelection = () => {
    if (!nonCoIProjects) return;

    setTotalShareError(null);

    if (checkedItems.length === nonCoIProjects.length) {
      setCheckedItems([]);
    }
    else {
      setCheckedItems(nonCoIProjects.map(project => project.projectId));
    }
  };

  const handleVote = useCallback(
    debounce((id: number, share: number) => {
      setTotalShareError(null);

      if (!nonCoIProjects || !projects) return;

      try {
        const values: RankItem[] = nonCoIProjects.map(project => ({
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
    if (!nonCoIProjects) return;

    if (lockedItems.includes(id)) {
      setLockedItems(lockedItems.filter(lockedId => lockedId !== id));
    }
    else {
      if (lockedItems.length >= nonCoIProjects?.length - 2) {
        setTotalShareError('At least two projects must be unlocked');
        window.scrollTo(0, document.body.scrollHeight);
        return;
      }
      setLockedItems([...lockedItems, id]);
    }
  };

  const markCOI = async (id: number) => {
    if (!projects) return;

    const unmarkedProjects = projects.filter(
      project =>
        project.projectId !== id
        && !project.coi
        && !lockedItems.includes(project.projectId)
    );

    const currentProject = projects.find(project => project.projectId === id);

    if (!currentProject) return;

    const distributedShare = currentProject.share / unmarkedProjects.length;

    const newProjects = projects.map(project =>
      project.projectId === id
        ? { ...project, coi: true, share: 0 }
        : {
            ...project,
            share:
              project.coi || lockedItems.includes(project.projectId)
                ? project.share
                : project.share + distributedShare,
          }
    );

    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(checkedId => checkedId !== id));
    }

    if (lockedItems.includes(id)) {
      setLockedItems(lockedItems.filter(lockedId => lockedId !== id));
    }

    await markProjectCoI({ data: { pid: id } });

    const rankingArray = newProjects.map(project => ({
      id: project.projectId,
      share: project.share,
    }));

    await updateProjectRanking({
      cid: category,
      ranking: rankingArray,
    });

    setProjects(newProjects);
  };

  const unmarkCOI = async (id: number) => {
    if (!projects) return;

    await unmarkProjectCoI({ data: { pid: id } });

    setProjects(
      projects.map(project =>
        project.projectId === id ? { ...project, coi: false } : project
      )
    );
  };

  const lockSelection = () => {
    if (!nonCoIProjects) return;

    if (
      checkedItems.length > nonCoIProjects?.length - 2
      || lockedItems.length >= nonCoIProjects?.length - 2
    ) {
      setTotalShareError('At least two projects must be unlocked');
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    const lockedProjects = checkedItems.filter(
      checkedId => !lockedItems.includes(checkedId)
    );
    posthog.capture('Lock selection');

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
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }

    setIsSubmitting(true);

    if (!projects) return;

    const rankingArray = projects.map(project => ({
      id: project.projectId,
      share: project.share,
    }));

    await updateProjectRanking({
      cid: category,
      ranking: rankingArray,
    });

    if (!wallet || !ranking || !signer) {
      console.error('Requirements not met for attestations', { wallet, ranking, signer });
      setIsSubmitting(false);
      return;
    }

    if (!VotingHasEnded) {
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
    }

    setIsSubmitting(false);
  };

  const handleAttestationModalClose = () => {
    if (attestationState === AttestationState.Success || attestationState == AttestationState.FarcasterDelegate) {
      router.push('/allocation');
      setAttestationState(AttestationState.Initial);
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
    if (!nonCoIProjects) return;

    if (!nonCoIProjects?.length) return;

    if (lockedItems.length > nonCoIProjects?.length - 2) {
      setTotalShareError('At least two projects must be unlocked');
      window.scrollTo(0, document.body.scrollHeight);
    }
    else {
      setTotalShareError(null);
    }
  }, [lockedItems]);

  useEffect(() => {
    if (!projects || !projects.length) return;

    setNonCoIProjects(projects.filter(project => !project.coi));
  }, [projects]);

  if (!category) return <NotFoundComponent />;

  return (
    <div>
      <Modal
        isOpen={attestationState !== AttestationState.Initial}
        onClose={handleAttestationModalClose}
        showCloseButton={
          attestationState !== AttestationState.FarcasterDelegate
        }
      >
        {attestationState === AttestationState.FarcasterDelegate
        && attestationLink && (
          <AskDelegations
            categoryName={params?.category as string}
            link={attestationLink}
            onClose={() => {
              if (isBadgeholder) {
                setAttestationState(AttestationState.Success);
              }
              else {
                handleAttestationModalClose();
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
              handleAttestationModalClose();
            }}
          />
        )}
        {attestationState === AttestationState.Loading && (
          <AttestationLoading />
        )}
        {attestationState === AttestationState.Error && (
          <AttestationError onClick={submitVotes} />
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
          selectedCategoryId={category}
        />
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
          <div className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <Checkbox
                  onChange={() => handleBulkSelection()}
                  checked={
                    !!nonCoIProjects?.length
                    && checkedItems.length === nonCoIProjects?.length
                  }
                  disabled={
                    (ranking
                    && ranking.progress
                    !== CollectionProgressStatusEnum.Finished
                    && ranking.progress
                    !== CollectionProgressStatusEnum.Attested)
                    || !nonCoIProjects?.length
                    || isLoading
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
            : ranking
            && ranking.progress !== CollectionProgressStatusEnum.Finished
            && ranking.progress !== CollectionProgressStatusEnum.Attested
              ? (
                  <div className="flex h-64 items-center justify-center">
                    <p className="text-gray-400">
                      You need to finish with the comparison before you can vote
                    </p>
                  </div>
                )
              : projects?.length
                ? (
                    <div className="w-full overflow-x-auto">
                      <table className="w-full min-w-full">
                        <tbody className="flex flex-col gap-6">
                          {projects
                            .filter(project => !project.coi)
                            .map((project, index) => (
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
                                coi={project.coi}
                                onToggleCOI={markCOI}
                              />
                            ))}
                          {projects.some(project => project.coi) && (
                            <>
                              <tr>
                                <th className="text-lg font-bold">
                                  Conflict Of Interest
                                </th>
                              </tr>
                              {projects
                                .filter(project => project.coi)
                                .map((project, index) => (
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
                                    coi={project.coi}
                                    onToggleCOI={unmarkCOI}
                                  />
                                ))}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
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
              onClick={() => {
                posthog.capture('Back to categories');
                router.push('/allocation');
              }}
            >
              <ArrowLeft2Icon />
              Back to Categories
            </button>
            <button
              className={`font-semibold" flex items-center justify-center gap-3 rounded-lg px-10 py-2
              ${
    totalShareError
    || (ranking?.progress !== CollectionProgressStatusEnum.Finished
    && ranking?.progress !== CollectionProgressStatusEnum.Attested)
      ? 'bg-gray-200 text-gray-400'
      : 'bg-primary text-white'
    }`}
              onClick={submitVotes}
              disabled={
                !!totalShareError
                || isSubmitting
                || (ranking?.progress !== CollectionProgressStatusEnum.Finished
                && ranking?.progress !== CollectionProgressStatusEnum.Attested)
              }
            >
              {isSubmitting
                ? (
                    'Submitting votes...'
                  )
                : (
                    <>
                      Submit votes
                      <ArrowRightIcon
                        color={
                          !!totalShareError
                          || isSubmitting
                          || (ranking?.progress
                          !== CollectionProgressStatusEnum.Finished
                          && ranking?.progress
                          !== CollectionProgressStatusEnum.Attested)
                            ? 'gray'
                            : undefined
                        }
                      />
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
