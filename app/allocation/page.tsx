'use client';

import HeaderRF6 from "../comparison/card/Header-RF6"
import CategoryAllocation, { Category } from "./components/CategoryAllocation"
import ConnectBox from "./components/ConnectBox"

const Categories : Category[] = [
  {
    title: "Infrastructure & Tooling",
    description: "Ethereum Core Contributions are infrastructure which supports, or is a dependency, of the OP Stack.",
    imageSrc: "/assets/images/category-it.png",
    projectCount: 20
  },
  {
    title: "Gov Research & Analytics",
    description: "Direct research & development contributions to the OP Stack, and contributions that support protocol upgrades.",
    imageSrc: "/assets/images/category-gra.png",
    projectCount: 15
  },
  {
    title: "Governance Leadership",
    description: "Efforts that improve the usability and accessibility of the OP Stack through tooling enhancements.",
    imageSrc: "/assets/images/category-gl.png",
    projectCount: 30
  },
]

const AllocationPage = () => {
  return (
    <div>
      <HeaderRF6
        progress={30}
        category="category"
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={false}
        />
      <div className="flex gap-4 p-16 justify-between">
        <div className="max-w-[65%] flex flex-col gap-3">
          <h2 className="text-3xl font-bold"> Round 6: Governance </h2>
          <p className="text-gray-600"> Retroactive Public Goods Funding (Retro Funding) 6 will reward contributions to Optimism Governance,
             including governance infrastructure & tooling, governance analytics, and governance leadership. </p>
          <p className="bg-yellow-50 p-4"> Decide on the budget for this round, decide how much should go to each category, and score projects in each category using the Pairwise raking. You can also choose to delegate your decision to someone
             on X (Twitter) or Farcaster. By connecting your X and Farcaster accounts, find out if someone delegated voting decision to you.  </p>
          <div className="border rounded-md p-6 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold w-full border-b pb-2 mb-4"> Your budget </h3>
              <div className="flex justify-between">
                <p> Slider Component Here </p>
                <p> Choose how much OP should be dedicated to this round, or delegate this decision to someone you trust. </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold w-full border-b pb-2 mb-4"> Categories </h3>
              <div>
                <p className="my-4"> Score projects in each category doing the Pairwise ranking, or delegate this decision to someone you trust. </p>
                <div className="flex flex-col gap-4">
                {Categories.map((cat) => <CategoryAllocation {...cat} onDelegate={() => {}} 
                  onLockClick={() => {}} onScore={() => {}} allocationPercentage={33.3}/>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[25%]">
          <ConnectBox onConnectFarcaster={() => {}} onConnectTwitter={() => {}} onConnectWorldID={() => {}}/>
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
