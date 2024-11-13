import { FC } from 'react';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { IProjectRanking } from '@/app/comparison/utils/types';
import { Checkbox } from '@/app/utils/Checkbox';
import { LockIcon } from '@/public/assets/icon-components/Lock';
import { UnlockIcon } from '@/public/assets/icon-components/Unlock';
import styles from '@/app/styles/Project.module.css';
import { COI } from '@/public/assets/icon-components/COI';
import { formatBudget } from '@/app/comparison/utils/helpers';
interface IRankingRowProps {
  index: number
  project: IProjectRanking
  budget: number
  locked: boolean
  coi: boolean
  onLock: (id: number) => void
  selected: boolean
  onSelect: (id: number) => void
  onVote: (id: number, share: number) => void
  onToggleCOI: (id: number) => void
}

const RankingRow: FC<IRankingRowProps> = ({
  index,
  project,
  budget,
  locked,
  onLock,
  coi,
  onToggleCOI,
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
      className={`flex w-full items-center justify-around rounded-lg border border-gray-200 p-3 ${
        locked && 'bg-gray-100'
      }`}
    >
      <td className="pb-8 pl-1 pt-4 lg:pl-4">
        <Checkbox
          checked={selected && !coi}
          onChange={() => onSelect(project.projectId)}
          disabled={coi}
        />
      </td>
      <td className="flex grow flex-row pb-8 pl-1 pt-4 lg:pl-4">
        <Image
          src={project.project.image || '/assets/images/placeholder.png'}
          alt={project.project.name}
          width={50}
          height={50}
          unoptimized
        />
        <div className="my-auto w-fit pl-4">
          <p className={`font-medium text-gray-700 ${styles.oneLineClamp}`}>
            {project.project.name}
          </p>
          <p className={`text-sm text-gray-400 ${styles.oneLineClamp}`}>
            {project.project.description}
          </p>
        </div>
      </td>

      {/* <td className="pb-8 lg:pl-4 pl-1 pt-4">
        <div className="flex items-center gap-2">
          <ExpandVertical />
        </div>
      </td> */}

      <td>
        <div className="flex flex-row justify-center gap-1">
          <button
            className="m-auto flex size-9 items-center justify-center"
            onClick={() => onToggleCOI(project.projectId)}
          >
            <COI isActive={coi} />
          </button>
          <div
            className={`m-auto flex items-center justify-center rounded-md border ${coi ? 'border-op-neutral-300' : 'border-gray-200'} px-4 py-2 ${
              locked && 'bg-gray-100'
            }`}
          >
            <p className={`${coi ? 'text-dark-500/[.2]' : 'text-dark-500/[1]'}`}>{index + 1}</p>
          </div>
          <div className="relative">
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
              className={`w-24 rounded-md border border-gray-200 px-4 py-2 ${coi ? 'border-op-neutral-300 text-dark-500/[.2]' : 'border-gray-200 text-dark-500/[1]'} text-center focus:outline-none focus:ring-1 ${
                locked && 'bg-gray-100'
              }`}
              placeholder="0.00%"
              isAllowed={values => handleAllowdValue(values)}
              disabled={locked || coi}
            />
            <span className={`absolute ${coi ? 'text-op-neutral-300' : 'text-gray-400'} bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-xs `}>
              {formatBudget(budget)}
            </span>
          </div>
          <button
            className={`flex size-9 items-center justify-center rounded-md border p-2
              ${coi ? 'opacity-20' : 'opacity-100'}
        ${
    locked ? 'rounded-md border-[#232634] bg-[#232634]' : 'border-gray-50'
    }`}
            onClick={() => onLock(project.projectId)}
          >
            {locked ? <LockIcon color="#fff" /> : <UnlockIcon />}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RankingRow;
