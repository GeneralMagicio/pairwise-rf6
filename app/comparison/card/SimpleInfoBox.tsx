import React, { FC } from 'react';
import { useCollapse } from 'react-collapsed';
import { WebsiteIcon } from '@/public/assets/icon-components/WebsiteIcon';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';

interface Props {
  title: string
  link?: string
  description: string
  type: 'link' | 'pricing'
  showIcon?: boolean
}

const ICONS_MAP: Record<Props['type'], React.ReactNode> = {
  link: <WebsiteIcon height={20} width={20} />,
  pricing: null,
};

const SimpleInfoBox: FC<Props> = ({
  title,
  link,
  description,
  type,
  showIcon = true,
}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const renderTitle = () => {
    if (type === 'pricing') return title;

    const href = link || title;
    const displayTitle = title.replace(/(https?:\/\/)|(https:)/, '');

    return (
      <a
        href={href}
        target="_blank"
        className="break-all text-gray-700 hover:underline"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
      >
        {displayTitle}
      </a>
    );
  };

  const shouldCollapse = description.length > 0;

  return (
    <div
      className={`max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2 ${
        shouldCollapse ? 'cursor-pointer' : ''
      }`}
      {...(shouldCollapse
        && getToggleProps())}
    >
      <div
        className={`flex items-center justify-between ${
          isExpanded && shouldCollapse ? 'mb-4' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          {ICONS_MAP[type] && showIcon && (
            <span className="size-5">{ICONS_MAP[type]}</span>
          )}
          {renderTitle()}
        </div>
        {shouldCollapse && (
          <button
            className="text-sm text-gray-600 hover:underline"
          >
            {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
        )}
      </div>
      {shouldCollapse && (
        <section {...getCollapseProps()}>
          <p className="mb-2 text-gray-600">{description}</p>
        </section>
      )}
    </div>
  );
};

export default SimpleInfoBox;
