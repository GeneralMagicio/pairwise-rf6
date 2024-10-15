"use client";

import { useEffect, useState } from "react";
import RankingRow from "./components/RankingRow";
import RankingTabs from "./components/RankingTabs";
import HeaderRF6 from "../comparison/card/Header-RF6";
import { useProjectsByCategoryId } from "../comparison/utils/data-fetching/projects";
import Spinner from "@/app/components/Spinner";
import SearchBar from "./components/SearchBar";

type TTab = {
  id: number;
  title: string;
  imageSrc: string;
  projectCount: number;
};

enum VotingStatus {
  IN_PROGRESS,
  READY_TO_SUBMIT,
}

export const tabs: TTab[] = [
  {
    id: 1,
    title: "Infrastructure & Tooling",
    imageSrc: "/assets/images/category-it-icon.svg",
    projectCount: 20,
  },
  {
    id: 2,
    title: "Gov Research & Analytics",
    imageSrc: "/assets/images/category-gra-icon.svg",
    projectCount: 15,
  },
  {
    id: 3,
    title: "Governance Leadership",
    imageSrc: "/assets/images/category-gl-icon.svg",
    projectCount: 30,
  },
];

const votingStatusMap = {
  [VotingStatus.IN_PROGRESS]: {
    text: "In progress",
    classes: "bg-voting-in-progress-bgColor text-voting-in-progress-textColor",
  },
  [VotingStatus.READY_TO_SUBMIT]: {
    text: "Ready to submit",
    classes: "bg-voting-ready-bgColor text-voting-ready-textColor",
  },
};

const RangingPage = ({ categoryId = 1 }: { categoryId: number }) => {
  const [selectedTab, setSelectedTab] = useState<number>(categoryId);
  const [search, setSearch] = useState<string>("");

  const {
    data: projects,
    isLoading,
    refetch,
  } = useProjectsByCategoryId(selectedTab);

  useEffect(() => {
    refetch();
  }, [selectedTab]);

  return (
    <div>
      <HeaderRF6
        progress={30}
        category="category"
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={false}
      />
      <div className="flex flex-col justify-between gap-4 px-72 py-16">
        <p className="text-2xl font-semibold text-gray-700">Edit your votes</p>
        <RankingTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="flex flex-col gap-6 rounded-xl border border-gray-200 px-6 py-10">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-semibold text-gray-700">
                {tabs.find((tab) => tab.id === selectedTab)?.title}
              </p>
              <p className="text-sm font-normal text-gray-600">
                OP calculations in this ballot are based on your budget of
                <span className="underline">3,333,333</span>
              </p>
            </div>
            <div
              className={`${
                votingStatusMap[VotingStatus.IN_PROGRESS].classes
              } rounded-2xl px-3 py-0.5`}
            >
              {votingStatusMap[VotingStatus.IN_PROGRESS].text}
            </div>
          </div>
          <SearchBar search={search} setSearch={setSearch} />
          {isLoading ? (
            <Spinner />
          ) : projects?.length ? (
            <table className="w-full">
              <tbody className="flex flex-col gap-6">
                {projects
                  .filter((project) =>
                    project.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((project) => (
                    <RankingRow key={project.id} project={project} />
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-center">No projects found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RangingPage;
