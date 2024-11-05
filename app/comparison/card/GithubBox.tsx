import React, { FC } from 'react';
import { useCollapse } from 'react-collapsed';
import { GithubIcon } from '@/public/assets/icon-components/Github';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { TimeIcon } from '@/public/assets/icon-components/Time';
import { DevIcon } from '@/public/assets/icon-components/Dev';
import { CommitIcon } from '@/public/assets/icon-components/Commit';
import { ForkIcon } from '@/public/assets/icon-components/Fork';
import { StarIcon } from '@/public/assets/icon-components/Star';
import { OpenSourceIcon } from '@/public/assets/icon-components/OpenSource';
import { QuestionMarkIcon } from '@/public/assets/icon-components/QuestionMark';

import { ProjectMetadata } from '../utils/types';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

interface Props {
  repo: ArrayElement<Exclude<ProjectMetadata['github'], null>>
}

const GithubBox: FC<Props> = ({ repo }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div
      {...getToggleProps()}
      className="max-w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-2 py-[12px]"
    >
      <div
        className={`flex items-center justify-between ${
          isExpanded ? 'mb-4' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <GithubIcon />
          <a
            href={repo.url}
            className="break-all text-gray-700 hover:underline"
            target="_blank"
            onClick={e => e.stopPropagation()}
          >
            {repo.name || repo.url?.replace('https://' || 'http://', '')}
          </a>
          <div
            className="flex items-center gap-1 rounded-2xl border bg-blue-background px-2
          py-0.5 text-xs text-blue-foreground"
          >
            <OpenSourceIcon color="#3374DB" />
            <span> Open source </span>
          </div>
        </div>
        <button className="text-sm text-gray-600">
          {isExpanded
            ? (
                <div className="flex items-center gap-2">
                  {'metrics' in repo && repo.metrics && <span> Hide metrics </span>}
                  <ArrowUpIcon />
                </div>
              )
            : (
                <div className="flex items-center gap-2">
                  {'metrics' in repo && repo.metrics && <span> View metrics </span>}
                  <ArrowDownIcon />
                </div>
              )}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="mb-4 text-gray-600">{repo.description}</p>
        {'metrics' in repo && repo.metrics
          ? (
              <>
                <div className="font-inter mb-2 grid grid-cols-3 gap-2 text-sm font-normal leading-5">
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <TimeIcon />
                    <span className="text-sm">
                      {`${
                        Number(repo.metrics.age_of_project_years).toFixed(2) || 0
                      } years old`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <DevIcon />
                    <span className="text-sm">
                      {`${
                        Number(repo.metrics.num_contributors).toFixed(0) || 0
                      } full time devs`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <DevIcon />
                    <span className="text-sm">
                      {`${
                        Number(repo.metrics.num_contributors_last_6_months).toFixed(
                          0
                        ) || 0
                      } contributers last 6 months`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <CommitIcon />
                    <span className="text-sm"> 5 commits last 1mo</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <ForkIcon />
                    <span className="text-sm">
                      {`${repo.metrics.num_forks || 0} forks`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <ForkIcon />
                    <span className="text-sm">
                      {`${repo.metrics.num_trusted_forks || 0} forks from top devs`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <StarIcon />
                    <span className="text-sm">
                      {`${repo.metrics.num_stars || 0} stars`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <StarIcon />
                    <span className="text-sm">
                      {`${repo.metrics.num_trusted_stars || 0} stars from top devs`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-2">
                    <OpenSourceIcon />
                    <span className="text-sm">Open source</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <QuestionMarkIcon />
                  <p className="text-sm text-gray-600">About GitHub metrics</p>
                </div>
              </>
            )
          : (
              !repo.description && (
                <p className="text-gray-600">No metrics available</p>
              )
            )}
      </section>
    </div>
  );
};

export default GithubBox;
