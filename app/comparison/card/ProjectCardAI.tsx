import React, { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Switch from 'react-switch';
import { ExternalLink } from './ExternalLink';
import { ProjectAiSummary, ProjectMetadata } from '../utils/types';
import ConflictOfInterestModal from './modals/CoIModal';
import CoILoadingModal from './modals/CoILoading';
import { StarsIcon } from '@/public/assets/icon-components/Stars';

interface Props {
  project: ProjectMetadata
  coi: boolean
  onCoICancel: () => void
  onCoIConfirm: () => void
  coiLoading: boolean
  key1: string
  key2: string
  summaryData: ProjectAiSummary
  aiMode: boolean
  setAi: () => void
}

export const ProjectCardAI: React.FC<Props> = ({
  project,
  coi,
  onCoICancel,
  onCoIConfirm,
  coiLoading,
  key1,
  key2,
  summaryData,
  aiMode,
  setAi,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const OFFSET = 150;

  useEffect(() => {
    const parentElement = parentRef.current;

    const handleScroll = () => {
      if (parentRef.current && titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= OFFSET && rect.top >= -OFFSET);
      }
    };

    if (parentElement) {
      parentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [key2, key1]);

  const scrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
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
                  ? 'sticky left-0 top-0 z-50 w-full rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-md'
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
                  <h1 className="text-3xl font-semibold">
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
            {project.socialLinks && (
              <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-slate-600">
                {project.socialLinks.website?.map(item => (
                  <ExternalLink key={item} address={item} type="website" />
                ))}
                {project.socialLinks.farcaster?.map(item => (
                  <ExternalLink key={item} address={item} type="warpcast" />
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
            <div className="space-y-4">
              {summaryData.map(section => (
                <SummaryBox key={section.subHeader + key1} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryBox: FC<{ section: ProjectAiSummary[0] }> = ({ section }) => {
  return (
    <div className="list-item border-t-2 border-gray-200 pt-4">
      <h3 className="mb-2 text-lg font-bold">
        {' '}
        {section.subHeader}
        {' '}
      </h3>
      <ul className="">
        {section.points.map(point => (
          <li className="list-inside list-disc p-2 text-slate-600" key={point}>
            {' '}
            {point}
            {' '}
          </li>
        ))}
      </ul>
    </div>

  );
};
