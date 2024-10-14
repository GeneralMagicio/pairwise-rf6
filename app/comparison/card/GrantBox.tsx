import React, { FC } from 'react';
import { useCollapse } from 'react-collapsed';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';
import { WebsiteIcon } from '@/public/assets/icon-components/WebsiteIcon';
import { TimeIcon } from '@/public/assets/icon-components/Time';
import { OPIcon } from '@/public/assets/icon-components/OP';
import { USDIcon } from '@/public/assets/icon-components/Usd';
import { truncate } from '@/app/utils/methods';

interface Props {
  title: string
  amount: string
  link: string | null
  date: string | null
  description: string | null
}

export function formatAmount(amount: string) {
  const num = Number(amount);
  if (num === undefined || num === null) {
    return undefined;
  }
  if (isNaN(num) || typeof num !== 'number') {
    return amount;
  }

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  else {
    const decimalPlaces = (num.toString().split('.')[1] || []).length;
    if (decimalPlaces > 3) {
      return num.toFixed(3);
    }
    else {
      return num.toString();
    }
  }
}

const GrantBox: FC<Props> = ({ title, link, amount, date, description }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2">
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm">
            {truncate(title, 20)}
          </span>
          {link && (
            <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm">
              <WebsiteIcon />
              {truncate(link, 25)}
            </a>
          )}

          {amount.includes('$') || amount.includes('USD') || amount.includes('usd') || amount.includes('dollars')
            ? (
                <span className="flex items-center gap-2 text-sm">
                  <USDIcon />
                  {formatAmount(amount)}
                </span>
              )
            : (
                <span className="flex items-center gap-2 text-sm">
                  <OPIcon />
                  {formatAmount(amount)}
                </span>
              )}
          {date && (
            <span className="flex items-center gap-2 text-sm">
              <TimeIcon />
              {date}
            </span>
          )}
        </div>
        {description && (
          <button
            {...getToggleProps()}
            className="text-sm text-gray-600 hover:underline"
          >
            {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </button>
        )}
      </div>
      <section {...getCollapseProps()}>
        <p className="my-3 text-gray-600">{description}</p>
      </section>
    </div>
  );
};

export default GrantBox;
