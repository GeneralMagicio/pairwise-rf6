"use client";

import { FC } from "react";
import Image from "next/image";
import { IProject } from "@/app/comparison/utils/types";
import { Checkbox } from "@/app/utils/Checkbox";
import { ExpandVertical } from "@/public/assets/icon-components/ExpandVertical";
import { LockIcon } from "@/public/assets/icon-components/Lock";

const RankingRow: FC<{ project: IProject }> = ({ project }) => {
  return (
    <tr className="flex w-full items-center border-b border-gray-200 justify-around bg-gray-50">
      <td className="pt-4 pb-8 pl-4">
        <Checkbox onChange={() => {}} />
      </td>
      <td className="pt-4 pb-8 pl-4">
        <Image
          src={project.image || "/assets/images/placeholder.png"}
          alt={project.name}
          width={50}
          height={50}
        />
      </td>
      <td className="w-[50%] pt-4 pb-8 pl-4">
        <p className="font-medium text-gray-700">{project.name}</p>
        <p className="text-sm text-gray-400">{project.metadata.description}</p>
      </td>
      <td className="pt-4 pb-8 pl-4">
        <div className="flex items-center gap-2">
          <ExpandVertical />
        </div>
      </td>
      <td className="pt-4 pb-8 pl-4">
        <div className="flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
          <p className="text-gray-700">1</p>
        </div>
      </td>
      <td className="relative pt-4 pb-8 pl-4">
        <input
          type="text"
          className={`rounded-md border border-gray-200 px-4 py-2 w-24 focus:outline-none focus:ring-1 bg-gray-50 text-center`}
          defaultValue={"33.33"}
        />
        <span className="absolute bottom-2 right-5 text-gray-400 text-xs">
          235.23%
        </span>
      </td>
      <td className="pt-4 pb-8 pl-4">
        <div className="flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-2">
          <LockIcon />
        </div>
      </td>
    </tr>
  );
};

export default RankingRow;
