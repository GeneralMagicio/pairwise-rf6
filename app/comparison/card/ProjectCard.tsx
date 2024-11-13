import React, { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Switch from 'react-switch';
import { useCollapse } from 'react-collapsed';
import { ExternalLink } from './ExternalLink';
import GithubBox from './GithubBox';
import SimpleInfoBox from './SimpleInfoBox';
import QABox from './QABox';
import GrantBox from './GrantBox';
import Team from './Team';
import { ProjectMetadata } from '../utils/types';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';
import ConflictOfInterestModal from './modals/CoIModal';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import CoILoadingModal from './modals/CoILoading';
import ProjectDescription from './ProjectDescription';
import { StarsIcon } from '@/public/assets/icon-components/Stars';
import { convertCategoryToLabel } from '../utils/helpers';
import { JWTPayload } from '@/app/utils/wallet/types';
import styles from '@/app/styles/Project.module.css';
import { ContractBox } from './modals/ContractBox';

enum ProjectSection {
  REPOS = 'repos',
  TESTIMONIALS = 'testimonials',
  IMPACT = 'impact',
  PRICING = 'pricing',
  GRANTS = 'grants',
}

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  onClick: () => void
  id: string
  expanded: boolean
  setExpanded: (value: boolean) => void
}

export interface AutoScrollAction {
  section: ProjectSection
  initiator: 'card1' | 'card2'
  action: boolean
}

const ProjectSectionTitles = {
  [ProjectSection.REPOS]: 'Repos, links, and contracts',
  [ProjectSection.TESTIMONIALS]: 'Testimonials',
  [ProjectSection.IMPACT]: 'Impact statement',
  [ProjectSection.PRICING]: 'Pricing model',
  [ProjectSection.GRANTS]: 'Grants and investment',
};

const Section: FC<CollapsibleProps> = ({
  title,
  children,
  onClick,
  id,
  expanded,
  setExpanded,
}) => {
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded: expanded,
  });

  const expandSection = () => {
    onClick();
    setExpanded(!expanded);
  };

  return (
    <>
      <hr className="border-t border-gray-200" />
      <div id={id} className="mb-4 pt-4">
        <div className="flex items-center justify-between gap-4 p-2">
          <button className="text-xl font-medium">{title}</button>
          <button
            {...getToggleProps({
              onClick: expandSection,
            })}
            className="flex cursor-pointer items-center gap-1 text-sm text-primary"
          >
            {expanded
              ? (
                  <ArrowUpIcon color="black" width={20} height={20} />
                )
              : (
                  <ArrowDownIcon width={20} height={20} />
                )}
          </button>
        </div>
        <section {...getCollapseProps()} className="p-2">
          {children}
        </section>
      </div>
    </>
  );
};

function smoothScrollToElement(elementId: string) {
  const element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

interface Props {
  project: ProjectMetadata
  coi: boolean
  onCoICancel: () => void
  onCoIConfirm: () => void
  coiLoading: boolean
  dispatchAction: (section: ProjectSection, action: boolean) => void
  action: AutoScrollAction | undefined
  name: string
  sectionExpanded: Record<ProjectSection, boolean>
  setSectionExpanded: (value: Props['sectionExpanded']) => void
  key1: string
  key2: string
  aiMode: boolean
  setAi: () => void
}

const NoneBox: FC = () => (
  <div className="space-y-2">
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2">
      None
    </div>
  </div>
);

export const ProjectCard: React.FC<Props> = ({
  project,
  coi,
  onCoICancel,
  onCoIConfirm,
  coiLoading,
  dispatchAction,
  action,
  name,
  sectionExpanded,
  setSectionExpanded,
  key1,
  key2,
  aiMode,
  setAi,
}) => {
  const [render, setRender] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parentElement = parentRef.current;

    const handleScroll = () => {
      if (parentRef.current && titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect()?.top;
        const offset = parentRef.current.getBoundingClientRect()?.top;
        setIsSticky(rect <= offset && rect >= -offset);
      }
    };

    if (parentElement) {
      parentElement.addEventListener('scroll', handleScroll);
    }

    setRender(1);

    return () => {
      if (parentElement) {
        parentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [key2, key1]);

  useEffect(() => {
    if (render === 0 || !action || action.initiator === name) return;

    console.log('in', name, 'with action', action);
    console.log('section states', sectionExpanded);

    smoothScrollToElement(`${action.section}-${name}`);

    const isSectionUpdated = action.action !== sectionExpanded[action.section];
    if (isSectionUpdated) {
      console.log('launched in', name, {
        ...sectionExpanded,
        [action.section]: action.action,
      });
      setSectionExpanded({
        ...sectionExpanded,
        [action.section]: action.action,
      });
    }
  }, [action, name, sectionExpanded, render]);

  const scrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
  };

  const handleSectionClick = (id: ProjectSection, expanded: boolean) => () => {
    dispatchAction(id, expanded);
  };

  const hnadleExpanded = (section: ProjectSection) => (value: boolean) => {
    setSectionExpanded({ ...sectionExpanded, [section]: value });
  };

  return (
    <div ref={divRef} className="relative">
      {coi && (
        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <ConflictOfInterestModal
            onCancel={onCoICancel}
            onDeclareConflict={onCoIConfirm}
          />
        </div>
      )}
      {coiLoading && (
        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <CoILoadingModal />
        </div>
      )}
      <div
        className={`container relative mx-auto my-4
      h-[80vh] w-full rounded-xl border 
      border-gray-200 bg-gray-50 px-4 pb-8 pt-4 ${
    coi || coiLoading ? 'brightness-50' : ''
    }`}
      >
        <div ref={parentRef} className="h-[78vh] gap-10 overflow-y-auto">
          <div className="mr-4">
            {/* Cover Image and Profile Avatar */}
            <div className="relative h-40">
              <Image
                src={project.projectCoverImageUrl}
                unoptimized
                alt="Banner"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <Image
                src={project.profileAvatarUrl}
                unoptimized
                alt={project.name}
                width={80}
                height={80}
                className="absolute -bottom-8 left-4 z-[4] rounded-md"
              />
            </div>
            {/* Sticky Title Section */}
            <div
              ref={titleRef}
              className={`mb-4 mt-16 transition-all ${
                isSticky
                  ? 'sticky left-0 top-0 z-30 w-full rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md'
                  : ''
              }`}
            >
              <div className="flex items-center gap-8">
                {isSticky && (
                  <Image
                    src={project.profileAvatarUrl}
                    unoptimized
                    alt={project.name}
                    width={70}
                    height={70}
                    className="rounded-md"
                  />
                )}
                <div className="flex flex-col gap-3">
                  <h1
                    className={`text-3xl font-semibold ${styles.oneLineClamp}`}
                  >
                    {project.name}
                  </h1>
                  {project.organization && (
                    <div className="flex items-center gap-1 font-medium leading-6 text-slate-600">
                      <p>By</p>
                      {project.organization.organizationAvatarUrl && (
                        <Image
                          src={project.organization.organizationAvatarUrl}
                          alt={project.organization.name}
                          width={24}
                          height={24}
                          className="mx-1 rounded-full"
                          unoptimized
                        />
                      )}
                      <p>{project.organization.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="my-8 flex items-center gap-3">
              <Switch
                onColor="#FF0420"
                offColor="#E0E2EB"
                height={25}
                width={50}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={setAi}
                checked={aiMode}
              />
              <p className="font-medium"> AI Summary </p>
              <StarsIcon />
            </div>
            <ProjectDescription description={project.description} />
            {project.socialLinks && (
              <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-slate-600">
                {project.socialLinks.website?.map(item => (
                  <ExternalLink key={item} address={item} type="website" />
                ))}
                {project.socialLinks.farcaster?.map((item, index) => (
                  <ExternalLink
                    key={`${item}_${index}`}
                    address={item}
                    type="warpcast"
                  />
                ))}
                {project.socialLinks.twitter && (
                  <ExternalLink
                    address={project.socialLinks.twitter}
                    type="x"
                  />
                )}
                {project.socialLinks.mirror && (
                  <ExternalLink
                    address={project.socialLinks.mirror}
                    type="mirror"
                  />
                )}
              </div>
            )}
            {project.team?.length && (
              <div className="mb-6 w-full">
                <Team
                  team={(project.team || [])
                    .filter(el => 'pfp_url' in el)
                    .map(item => ({
                      profileImg: item.pfp_url,
                      urlLink: `https://warpcast.com/${item.username}`,
                    }))}
                />
              </div>
            )}
            <Section
              id={`repos-${name}`}
              setExpanded={hnadleExpanded(ProjectSection.REPOS)}
              expanded={sectionExpanded[ProjectSection.REPOS]}
              onClick={handleSectionClick(
                ProjectSection.REPOS,
                !sectionExpanded[ProjectSection.REPOS]
              )}
              title={ProjectSectionTitles[ProjectSection.REPOS]}
            >
              {project.github?.length
              || project.links?.length
              || project.contracts?.length
                ? (
                    <div className="space-y-4">
                      {project.github?.map((repo) => {
                        if (repo.url) {
                          return <GithubBox key={repo.url} repo={repo} />;
                        }
                        return null;
                      })}

                      {project.links?.map(link => (
                        <SimpleInfoBox
                          key={link.url}
                          title={link.name}
                          link={link.url}
                          description={link.description}
                          type="link"
                        />
                      ))}

                      {project.contracts?.map(({ address, chainId }) => (
                        <ContractBox
                          key={`${chainId}_${address}`}
                          description=""
                          address={address}
                          chainId={chainId}
                        />
                      ))}
                    </div>
                  )
                : (
                    <NoneBox />
                  )}
            </Section>
            <Section
              id={`testimonials-${name}`}
              setExpanded={hnadleExpanded(ProjectSection.TESTIMONIALS)}
              expanded={sectionExpanded[ProjectSection.TESTIMONIALS]}
              onClick={handleSectionClick(
                ProjectSection.TESTIMONIALS,
                !sectionExpanded[ProjectSection.TESTIMONIALS]
              )}
              title={ProjectSectionTitles[ProjectSection.TESTIMONIALS]}
            >
              <div className="space-y-4">
                <SimpleInfoBox
                  title={`https://devouch.xyz/project/rf/${project.projectId}`}
                  description=""
                  type="link"
                  showIcon={false}
                />
                {project.testimonials?.length && (
                  <SimpleInfoBox
                    title={`https://www.metricsgarden.xyz/projects/${project.projectId}/?tab=insights`}
                    description=""
                    type="link"
                    showIcon={false}
                  />
                )}
              </div>
            </Section>
            <Section
              id={`impact-${name}`}
              setExpanded={hnadleExpanded(ProjectSection.IMPACT)}
              expanded={sectionExpanded[ProjectSection.IMPACT]}
              onClick={handleSectionClick(
                ProjectSection.IMPACT,
                !sectionExpanded[ProjectSection.IMPACT]
              )}
              title={ProjectSectionTitles[ProjectSection.IMPACT]}
            >
              {project.impactStatement
                ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p>
                          <strong className="text-gray-800">Category:</strong>
                          {' '}
                          {convertCategoryToLabel(
                            project.impactStatement
                              .category as JWTPayload['category']
                          )}
                        </p>
                        <p>
                          <strong className="text-gray-800">Subcategory:</strong>
                          {' '}
                          {project.impactStatement.subcategory}
                        </p>
                        <p className="text-primary">
                          Applicants were asked to report on impact made between Oct
                          1, 2023 - July 31, 2024. Promises of future deliverables
                          or impact are not allowed.
                        </p>
                      </div>
                      <div className="space-y-2">
                        {project.impactStatement.statement?.map(
                          ({ question, answer }) => (
                            <QABox
                              key={question}
                              question={question}
                              answer={answer}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )
                : (
                    <NoneBox />
                  )}
            </Section>
            <Section
              id={`pricing-${name}`}
              setExpanded={hnadleExpanded(ProjectSection.PRICING)}
              onClick={handleSectionClick(
                ProjectSection.PRICING,
                !sectionExpanded[ProjectSection.PRICING]
              )}
              expanded={sectionExpanded[ProjectSection.PRICING]}
              title={ProjectSectionTitles[ProjectSection.PRICING]}
            >
              <div className="space-y-2 capitalize">
                {project.pricingModel
                && typeof project.pricingModel === 'object'
                  ? (
                      <SimpleInfoBox
                        title={project.pricingModel || ''}
                        description=""
                        type="pricing"
                      />
                    )
                  : (
                      <NoneBox />
                    )}
              </div>
            </Section>
            <Section
              id={`grants-${name}`}
              setExpanded={hnadleExpanded(ProjectSection.GRANTS)}
              onClick={handleSectionClick(
                ProjectSection.GRANTS,
                !sectionExpanded[ProjectSection.GRANTS]
              )}
              expanded={sectionExpanded[ProjectSection.GRANTS]}
              title={ProjectSectionTitles[ProjectSection.GRANTS]}
            >
              {project.grantsAndFunding.grants?.length
              || project.grantsAndFunding.retroFunding?.length
              || project.grantsAndFunding.ventureFunding?.length
                ? (
                    <div className="space-y-2">
                      {project.grantsAndFunding.grants?.map((grant, index) => (
                        <GrantBox
                          key={`grant_${index}`}
                          type="grant"
                          description={grant.details}
                          link={grant.link}
                          amount={grant.amount}
                          date={grant.date}
                          title={grant.grant ?? ''}
                        />
                      ))}
                      {project.grantsAndFunding.retroFunding?.map(funding => (
                        <GrantBox
                          key={funding.details}
                          type="retro_funding"
                          description={null}
                          round={funding.details}
                          link={null}
                          amount={funding.amount}
                          date={funding.date}
                          title="Retro Funding"
                        />
                      ))}
                      {project.grantsAndFunding.ventureFunding?.map(funding => (
                        <GrantBox
                          key={funding.details}
                          type="investment"
                          description={funding.details}
                          link={null}
                          amount={funding.amount}
                          date={funding.year}
                          title="Investment"
                        />
                      ))}
                    </div>
                  )
                : (
                    <NoneBox />
                  )}
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};
