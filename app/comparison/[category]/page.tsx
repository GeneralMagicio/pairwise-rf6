'use client';

import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useActiveWallet } from 'thirdweb/react';
import { useAccount } from 'wagmi';
import { usePostHog } from 'posthog-js/react';
import { JWTPayload } from '@/app/utils/wallet/types';
import { AutoScrollAction, ProjectCard } from '../card/ProjectCard';
import ConflictButton from '../card/CoIButton';
import HeaderRF6 from '../card/Header-RF6';
import { Rating } from '../card/Rating';
import UndoButton from '../card/UndoButton';
import VoteButton from '../card/VoteButton';
import Modals from '@/app/utils/wallet/Modals';
import {
  getPairwisePairsForProject,
  useGetPairwisePairs,
} from '../utils/data-fetching/pair';
import { categorySlugIdMap, convertCategoryToLabel } from '../utils/helpers';
import {
  useUpdateProjectUndo,
  useUpdateProjectVote,
} from '../utils/data-fetching/vote';
import { getBiggerNumber, usePrevious } from '@/app/utils/methods';
import { useMarkCoi } from '../utils/data-fetching/coi';
import Modal from '@/app/utils/Modal';
import { IProject } from '../utils/types';
import { mockProject1, mockProject2 } from '../card/mockData';
import IntroView from './IntroView';
import Spinner from '../../components/Spinner';
import LowRateModal from '../card/modals/LowRateModal';
import PostRatingModal from '../card/modals/PostRatingModal';
import GoodRatingModal from '../card/modals/GoodRatingModal';
import RevertLoadingModal from '../card/modals/RevertLoadingModal';
import StorageLabel from '@/app/lib/localStorage';
import { ProjectCardAI } from '../card/ProjectCardAI';
import EmailLoginModal from '@/app/allocation/components/EOA/EmailLoginModal';
import PostVotingModal from '../ballot/modals/PostVotingModal';
import NotFoundComponent from '@/app/components/404';

export default function Home() {
  const { category } = useParams() ?? {};
  const queryClient = useQueryClient();
  const { address, chainId } = useAccount();
  const wallet = useActiveWallet();

  const [rating1, setRating1] = useState<number | null>(null);
  const [rating2, setRating2] = useState<number | null>(null);
  const [project1, setProject1] = useState<IProject>();
  const [project2, setProject2] = useState<IProject>();
  const [coiLoading1, setCoiLoading1] = useState(false);
  const [coiLoading2, setCoiLoading2] = useState(false);
  const [bypassPrevProgress, setBypassPrevProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastAction, setLastAction] = useState<AutoScrollAction>();

  const [revertingBack, setRevertingBack] = useState(false);
  const [showLowRateModal, setShowLowRateModal] = useState(false);
  const [showPostRatingModal, setShowPostRatingModal] = useState(false);
  const [showGoodRatingModal, setShowGoodRatingModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [sectionExpanded1, setSectionExpanded1] = useState({
    repos: true,
    pricing: true,
    grants: true,
    impact: true,
    testimonials: true,
  });
  const [sectionExpanded2, setSectionExpanded2] = useState({
    repos: true,
    pricing: true,
    grants: true,
    impact: true,
    testimonials: true,
  });

  const [temp, setTemp] = useState(0);
  const [coi1, setCoi1] = useState(false);
  const [coi2, setCoi2] = useState(false);
  const [aiMode1, setAiMode1] = useState(false);
  const [aiMode2, setAiMode2] = useState(false);
  const [isInitialVisit, setIsInitialVisit] = useState(true);
  const [closingDesibled, setClosingDesibled] = useState(false);
  const posthog = usePostHog();

  const cid = categorySlugIdMap.get((category as string) || '');
  const { data, isLoading } = useGetPairwisePairs(cid);
  const prevProgress = usePrevious(progress);

  const { mutateAsync: markProjectCoI } = useMarkCoi();
  const { mutateAsync: vote } = useUpdateProjectVote({ categoryId: cid });
  const { mutateAsync: undo } = useUpdateProjectUndo({
    categoryId: cid,
    onSuccess: () => {
      // if this temp state is omitted
      // then when you CoI one project and
      // then you call "undo", the app breaks
      // we probably need to combine "/pairs" and "/pairs-for-project"
      setTemp(temp + 1);
      setBypassPrevProgress(true);
    },
  });

  useEffect(() => {
    if (bypassPrevProgress && data) {
      setProgress(data.progress);
      setBypassPrevProgress(false);
    }
    else {
      setProgress(getBiggerNumber(prevProgress, data?.progress));
    }
  }, [data]);

  useEffect(() => {
    setLastAction(undefined);
    setCoiLoading1(false);
    setCoiLoading2(false);
  }, [project1, project2]);

  useEffect(() => {
    if (!data || !data.pairs?.length) return;
    setRating1(data.pairs[0][0].rating ?? null);
    setRating2(data.pairs[0][1].rating ?? null);
  }, [data]);

  useEffect(() => {
    if (!data || !address) return;
    if (data.pairs.length === 0) {
      setShowFinishModal(true);

      if (!project1 || !project2) {
        setProject1(mockProject1);
        setProject2(mockProject2);
      }
      return;
    }
    setProject1(data.pairs[0][0]);
    setProject2(data.pairs[0][1]);
  }, [data, temp]);

  useEffect(() => {
    const initialRating1
      = data?.pairs[0] && data?.pairs[0].length > 0
        ? data.pairs[0][0].rating
        : null;
    const initialRating2
      = data?.pairs[0] && data?.pairs[0].length > 0
        ? data.pairs[0][1].rating
        : null;

    // observe if user rated both projects
    if (rating1 !== initialRating1 && rating2 !== initialRating2) {
      setShowPostRatingModal(!getGetStarted().postRating);
    }

    // observe if first rated project is rated good >= 4
    if (
      (rating1
      && rating1 >= 4
      && rating2 === initialRating2
      && rating1 !== initialRating1)
      || (rating2
      && rating2 >= 4
      && rating1 === initialRating1
      && rating2 !== initialRating2)
    ) {
      setShowGoodRatingModal(!getGetStarted().goodRating);
    }
  }, [rating1, rating2]);

  useEffect(() => {
    const getVisitKey = () => `has_visited_${chainId}_${address}`;

    const checkFirstTimeVisit = () => {
      if (address && chainId) {
        const visitKey = getVisitKey();
        const hasVisited = localStorage.getItem(visitKey) === 'true';
        setIsInitialVisit(!hasVisited);
      }
    };

    const markAsVisited = () => {
      if (address && chainId) {
        localStorage.setItem(getVisitKey(), 'true');
      }
      setIsInitialVisit(false);
    };

    if (data?.votedPairs) {
      markAsVisited();
    }
    else {
      checkFirstTimeVisit();
      // show the post rating modal if the user has already rated the projects
      if (getGetStarted().postRating) {
        setShowPostRatingModal(false);
      }
      // show the good rating modal if the user has already rated the projects
      if (getGetStarted().goodRating) {
        setShowGoodRatingModal(false);
      }
    }
  }, [address, chainId, data?.votedPairs]);

  const toggleAiMode = () => {
    if (!aiMode1) {
      posthog.capture('AI Summary', {
        project1: project1?.name,
        project2: project2?.name,
      });
    }
    setAiMode1(!aiMode1);
    setAiMode2(!aiMode2);
    setLastAction(undefined);
  };

  const isAnyModalOpen = () =>
    showLowRateModal
    || revertingBack
    || showPostRatingModal
    || showGoodRatingModal;

  const dispatchAction
    = (initiator: AutoScrollAction['initiator']) =>
      (
        section: AutoScrollAction['section'],
        action: AutoScrollAction['action']
      ) => {
        setLastAction({ section, initiator, action });
      };

  const confirmCoI1 = async (id1: number, id2: number) => {
    await markProjectCoI({ data: { pid: id1 } });
    setCoi1(false);
    setCoiLoading1(true);
    try {
      const pair = await getPairwisePairsForProject(cid, id2);
      setProject1(pair.pairs[0].find(project => project.id !== id2)!);
      setRating1(pair.pairs[0].find(project => project.id !== id2)!.rating);
    }
    catch (e) {
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', cid],
      });
    }
    setCoiLoading1(false);
  };

  const showCoI1 = () => {
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }
    setCoi1(true);
  };

  const confirmCoI2 = async (id1: number, id2: number) => {
    await markProjectCoI({ data: { pid: id2 } });
    setCoi2(false);
    setCoiLoading2(true);
    try {
      const pair = await getPairwisePairsForProject(cid, id1);
      setProject2(pair.pairs[0].find(project => project.id !== id1)!);
      setRating2(pair.pairs[0].find(project => project.id !== id1)!.rating);
    }
    catch (e) {
      queryClient.refetchQueries({
        queryKey: ['pairwise-pairs', cid],
      });
    }
    setCoiLoading2(false);
  };

  const showCoI2 = () => {
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }
    setCoi2(true);
  };

  const setUserAsVisited = () => {
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }

    if (address && chainId) {
      const hasVisitedKey = `has_visited_${chainId}_${address}`;
      localStorage.setItem(hasVisitedKey, 'true');
    }
    setIsInitialVisit(false);
  };

  const checkLowRatedProjectSelected = (chosenId: number): boolean => {
    const isLowRatedProjectSelected = (
      selectedId: number,
      ratingA: number | null | undefined,
      ratingB: number | null | undefined
    ) =>
      chosenId === selectedId && (!ratingA || (ratingB && ratingA < ratingB));

    if (!rating1 || !rating2) return false;

    if (
      isLowRatedProjectSelected(project1!.id, rating1, rating2)
      || isLowRatedProjectSelected(project2!.id, rating2, rating1)
    ) {
      setSelectedProjectId(chosenId);
      setShowLowRateModal(true);
      return true;
    }

    return false;
  };

  const handleVote = async (chosenId: number) => {
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }

    setCoiLoading1(true);
    setCoiLoading2(true);
    try {
      await vote({
        data: {
          project1Id: project1!.id,
          project2Id: project2!.id,
          project1Stars: rating1 ?? null,
          project2Stars: rating2 ?? null,
          pickedId: chosenId,
        },
      });

      if (getGetStarted().goodRating && !getGetStarted().postRating) {
        updateGetStarted({ postRating: true });
      }
    }
    catch (e) {
      setCoiLoading1(false);
      setCoiLoading2(false);
    }
  };

  const handleUndo = async () => {
    if (!wallet) {
      setShowLoginModal(true);
      return;
    }

    if (data?.votedPairs === 0) return;
    setRevertingBack(true);
    setCoi1(false);
    setCoi2(false);
    await undo();
    setRevertingBack(false);
  };

  function updateGetStarted({
    goodRating,
    lowRate,
    postRating,
  }: {
    goodRating?: boolean
    lowRate?: boolean
    postRating?: boolean
  }) {
    if (!address || !chainId) return;

    const currentUserKey = `${chainId}_${address}`;
    const storedData = JSON.parse(
      localStorage.getItem(StorageLabel.GET_STARTED_DATA) || '{}'
    );

    const userData = storedData[currentUserKey] || {};

    const updatedUserData = {
      ...userData,
      goodRating: goodRating || userData.goodRating,
      lowRate: lowRate || userData.lowRate,
      postRating: postRating || userData.postRating,
    };

    // Update the main data object
    storedData[currentUserKey] = updatedUserData;

    localStorage.setItem(
      StorageLabel.GET_STARTED_DATA,
      JSON.stringify(storedData)
    );
  }

  function getGetStarted() {
    if (!address || !chainId) return {};

    const storedData = JSON.parse(
      localStorage.getItem(StorageLabel.GET_STARTED_DATA) || '{}'
    );

    return storedData[`${chainId}_${address}`] || {};
  }

  useEffect(() => {
    const personalWalletId = localStorage.getItem(
      StorageLabel.LAST_CONNECT_PERSONAL_WALLET_ID
    );

    if (!personalWalletId) {
      setShowLoginModal(true);
    }
  }, [cid]);

  if (isLoading) return <Spinner />;

  if (!cid) return <NotFoundComponent />;

  if (!address || !chainId) return redirect('/');

  if (!project1 || !project2 || !data) return <div>No data</div>;

  return (
    <div>
      <Modals />
      <Modal
        isOpen={
          showLowRateModal
          || revertingBack
          || showPostRatingModal
          || showGoodRatingModal
          || showFinishModal
        }
        onClose={() => {}}
      >
        {revertingBack && <RevertLoadingModal />}
        {showLowRateModal && (
          <LowRateModal
            proceedWithSelection={async () => {
              await handleVote(selectedProjectId!);
              setShowLowRateModal(false);
            }}
            cancelSelection={() => setShowLowRateModal(false)}
          />
        )}
        {showPostRatingModal && (
          <PostRatingModal
            confirm={() => {
              updateGetStarted({ postRating: true });
              setShowPostRatingModal(false);
            }}
          />
        )}
        {showGoodRatingModal && (
          <GoodRatingModal
            confirm={() => {
              updateGetStarted({ goodRating: true });
              setShowGoodRatingModal(false);
            }}
          />
        )}
        {showFinishModal && (
          <PostVotingModal
            categorySlug={category}
            categoryLabel={convertCategoryToLabel(
              category as JWTPayload['category']
            )}
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
          selectedCategoryId={cid}
        />
      </Modal>

      <HeaderRF6
        progress={progress * 100}
        category={convertCategoryToLabel(category! as JWTPayload['category'])}
        question={`Which project had the greatest impact on the ${convertCategoryToLabel(
          category! as JWTPayload['category']
        )} ?`}
        isFirstSelection={isInitialVisit}
      />
      {isInitialVisit
        ? (
            <IntroView setUserAsVisited={setUserAsVisited} />
          )
        : (
            <div className="relative flex w-full items-center justify-between gap-8 px-8 py-2">
              <div className="relative w-[49%]">
                {aiMode1
                  ? (
                      <ProjectCardAI
                        key={project1.RF6Id}
                        aiMode={aiMode1}
                        setAi={toggleAiMode}
                        key1={project1.RF6Id}
                        key2={project2.RF6Id}
                        coiLoading={coiLoading1}
                        summaryData={project1.aiSummary}
                        coi={coi1}
                        project={{ ...project1.metadata, ...project1 } as any}
                        onCoICancel={() => setCoi1(false)}
                        onCoIConfirm={() => confirmCoI1(project1.id, project2.id)}
                      />
                    )
                  : (
                      <ProjectCard
                        key={project1.RF6Id}
                        aiMode={aiMode1}
                        setAi={toggleAiMode}
                        sectionExpanded={sectionExpanded1}
                        setSectionExpanded={setSectionExpanded1}
                        name="card1"
                        action={lastAction}
                        dispatchAction={dispatchAction('card1')}
                        key1={project1.RF6Id}
                        key2={project2.RF6Id}
                        coiLoading={coiLoading2}
                        coi={coi1}
                        project={{ ...project1.metadata, ...project1 } as any}
                        onCoICancel={() => setCoi1(false)}
                        onCoIConfirm={() => confirmCoI1(project1.id, project2.id)}
                      />
                    )}
              </div>
              <div className="relative w-[49%]">
                {aiMode2
                  ? (
                      <ProjectCardAI
                        key={project2.RF6Id}
                        aiMode={aiMode2}
                        setAi={toggleAiMode}
                        key1={project2.RF6Id}
                        key2={project1.RF6Id}
                        coiLoading={coiLoading2}
                        coi={coi2}
                        summaryData={project2.aiSummary}
                        onCoICancel={() => setCoi2(false)}
                        onCoIConfirm={() => confirmCoI2(project1.id, project2.id)}
                        project={{ ...project2.metadata, ...project2 } as any}
                      />
                    )
                  : (
                      <ProjectCard
                        key={project2.RF6Id}
                        aiMode={aiMode2}
                        setAi={toggleAiMode}
                        sectionExpanded={sectionExpanded2}
                        setSectionExpanded={setSectionExpanded2}
                        name="card2"
                        action={lastAction}
                        dispatchAction={dispatchAction('card2')}
                        key1={project2.RF6Id}
                        key2={project1.RF6Id}
                        coiLoading={coiLoading2}
                        coi={coi2}
                        onCoICancel={() => setCoi2(false)}
                        onCoIConfirm={() => confirmCoI2(project1.id, project2.id)}
                        project={{ ...project2.metadata, ...project2 } as any}
                      />
                    )}
              </div>
            </div>
          )}

      {!isInitialVisit && (
        <footer className="sticky bottom-0 z-50 flex w-full items-center justify-around gap-4 bg-white py-8 shadow-inner">
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row xl:gap-8">
            <Rating
              value={rating1 || 0}
              onChange={(value) => {
                !wallet ? setShowLoginModal(true) : setRating1(value);
              }}
              disabled={coiLoading1 || isAnyModalOpen()}
            />
            <VoteButton
              onClick={() =>
                !checkLowRatedProjectSelected(project1.id)
                && handleVote(project1.id)}
              disabled={coiLoading1 || isAnyModalOpen()}
            />
            <ConflictButton
              onClick={showCoI1}
              disabled={coiLoading1 || isAnyModalOpen()}
            />
          </div>
          <div className="absolute z-[1]">
            <UndoButton
              disabled={data?.votedPairs === 0 || isAnyModalOpen()}
              onClick={handleUndo}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row xl:gap-8">
            <Rating
              value={rating2 || 0}
              onChange={(value) => {
                !wallet ? setShowLoginModal(true) : setRating2(value);
              }}
              disabled={coiLoading2 || isAnyModalOpen()}
            />
            <VoteButton
              onClick={() =>
                !checkLowRatedProjectSelected(project2.id)
                && handleVote(project2.id)}
              disabled={coiLoading2 || isAnyModalOpen()}
            />
            <ConflictButton
              onClick={showCoI2}
              disabled={coiLoading2 || isAnyModalOpen()}
            />
          </div>
        </footer>
      )}
    </div>
  );
}
