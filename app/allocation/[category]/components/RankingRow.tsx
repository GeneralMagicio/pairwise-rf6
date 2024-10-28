import { FC } from 'react';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { IProjectRanking } from '@/app/comparison/utils/types';
import { Checkbox } from '@/app/utils/Checkbox';
import { ExpandVertical } from '@/public/assets/icon-components/ExpandVertical';
import { LockIcon } from '@/public/assets/icon-components/Lock';
import { UnlockIcon } from '@/public/assets/icon-components/Unlock';
import styles from '@/app/styles/Project.module.css';
import { formatBudget } from '@/app/comparison/utils/helpers';
interface IRankingRowProps {
  index: number
  project: IProjectRanking
  budget: number
  locked: boolean
  onLock: (id: number) => void
  selected: boolean
  onSelect: (id: number) => void
  onVote: (id: number, share: number) => void
}

const RankingRow: FC<IRankingRowProps> = ({
  index,
  project,
  budget,
  locked,
  onLock,
  selected,
  onSelect,
  onVote,
}) => {
  const handleAllowdValue = (values: any) => {
    const { floatValue } = values;
    return !floatValue || floatValue <= 100;
  };

  return (
    <tr
      className={`flex w-full items-center justify-around rounded-lg border border-gray-200 ${
        locked && 'bg-gray-100'
      }`}
    >
      <td className="pb-8 pl-4 pt-4">
        <Checkbox
          checked={selected}
          onChange={() => onSelect(project.projectId)}
        />
      </td>
      <td className="pb-8 pl-4 pt-4">
        <Image
          src={project.project.image || '/assets/images/placeholder.png'}
          alt={project.project.name}
          width={50}
          height={50}
          unoptimized
        />
      </td>
      <td className="w-[50%] pb-8 pl-4 pt-4">
        <p className={`font-medium text-gray-700 ${styles.oneLineClamp}`}>
          {project.project.name}
        </p>
        <p className={`text-sm text-gray-400 ${styles.oneLineClamp}`}>
          {project.project.description}
        </p>
      </td>
      <td className="pb-8 pl-4 pt-4">
        <div className="flex items-center gap-2">
          <ExpandVertical />
        </div>
      </td>
      <td className="pb-8 pl-4 pt-4">
        <div
          className={`flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 ${
            locked && 'bg-gray-100'
          }`}
        >
          <p className="text-gray-700">{index + 1}</p>
        </div>
      </td>
      <td className="relative pb-8 pl-4 pt-4">
        <NumericFormat
          suffix="%"
          decimalScale={2}
          value={project.share * 100}
          onValueChange={(values) => {
            onVote(
              project.projectId,
              values?.floatValue ? values.floatValue / 100 : 0
            );
          }}
          className={`w-24 rounded-md border border-gray-200 px-4 py-2 text-center focus:outline-none focus:ring-1 ${
            locked && 'bg-gray-100'
          }`}
          placeholder="0.00%"
          isAllowed={values => handleAllowdValue(values)}
          disabled={locked}
        />
        <span className="absolute bottom-2 right-7 text-xs text-gray-400">
          {formatBudget(budget)}
        </span>
      </td>
      <td className="pb-8 pt-4">
        <button
          className={`flex items-center justify-center rounded-md border p-2
        ${
    locked ? 'rounded-md border-[#232634] bg-[#232634]' : 'border-gray-50'
    }`}
          onClick={() => onLock(project.projectId)}
        >
          {locked ? <LockIcon color="#fff" /> : <UnlockIcon />}
        </button>
      </td>
    </tr>
  );
};

export default RankingRow;
