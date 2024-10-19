import { FC, useState } from 'react';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { IProjectRanking } from '@/app/comparison/utils/types';
import { Checkbox } from '@/app/utils/Checkbox';
import { ExpandVertical } from '@/public/assets/icon-components/ExpandVertical';
import { LockIcon } from '@/public/assets/icon-components/Lock';
import { UnlockIcon } from '@/public/assets/icon-components/Unlock';
import styles from '@/app/styles/Project.module.css';
// @ts-ignore

interface IRankingRowProps {
  project: IProjectRanking
  selected: boolean
  onSelect: (id: number) => void
}

const RankingRow: FC<IRankingRowProps> = ({ project, selected, onSelect }) => {
  const [value, setValue] = useState(0);

  const handleAllowdValue = (values: any) => {
    const { floatValue } = values;
    return !floatValue || floatValue <= 100;
  };

  return (
    <tr className="flex w-full items-center justify-around border-b border-gray-200 bg-gray-50">
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
        <div className="flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
          <p className="text-gray-700">1</p>
        </div>
      </td>
      <td className="relative pb-8 pl-4 pt-4">
        <NumericFormat
          suffix="%"
          decimalScale={2}
          value={value}
          onValueChange={(values) => {
            setValue(values?.floatValue || 0);
          }}
          className="w-24 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-center focus:outline-none focus:ring-1"
          placeholder="0.00%"
          isAllowed={values => handleAllowdValue(values)}
        />
        <span className="absolute bottom-2 right-5 text-xs text-gray-400">
          235.23
        </span>
      </td>
      <td className="pb-8 pt-4">
        <button
          className={`flex items-center justify-center rounded-md p-2
        ${
    project.locked
      ? 'rounded-md border border-[#232634] bg-[#232634]'
      : ''
    }`}
          onClick={() => {}}
        >
          {project.locked ? <LockIcon color="#fff" /> : <UnlockIcon />}
        </button>
      </td>
    </tr>
  );
};

export default RankingRow;
