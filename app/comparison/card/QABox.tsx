import React, { FC } from 'react';
import { useCollapse } from 'react-collapsed';
import { ArrowDownIcon } from '@/public/assets/icon-components/ArrowDown';
import { ArrowUpIcon } from '@/public/assets/icon-components/ArrowUp';

interface Props {
  question: string
  answer: string
}

const QABox: FC<Props> = ({ answer, question }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-gray-50 p-2">
      <div className={`flex items-center justify-between ${isExpanded ? 'mb-4' : ''}`}>
        <div className="flex items-center gap-2 font-semibold">
          {question}
        </div>
        <button
          {...getToggleProps()}
          className="text-sm text-gray-600 hover:underline"
        >
          {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </button>
      </div>
      <section {...getCollapseProps()}>
        <p className="mb-2 text-gray-600">{answer}</p>
      </section>
    </div>
  );
};

export default QABox;
