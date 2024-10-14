"use client"
import Image from "next/image";
import { useAccount } from "wagmi";
import HeaderRF6 from "../comparison/card/Header-RF6";
import {
  BadgeCardEntryType,
  BadgeData,
  badgeTypeMapping,
  useGetPublicBadges,
} from "../features/badges/getBadges";
import { actionId, appId } from "../lib/constants";
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { useState } from "react";
import FarcasterModal from "../components/FarcasterModal";
import WorldIdSignInSuccessModal from "../components/WorldIdSignInSuccessModal";

const AllocationPage = () => {
  const { address } = useAccount();
  const [ isOpenFarcasterModal, setIsOpenFarcasterModal ] = useState(false);
  const [ isWorldIdSignSuccessModal, setIsWorldIdSignSuccessModal ] = useState(false);
  const numOfBadgesFunc = (publicBadges: BadgeData) =>
		Object.keys(publicBadges).filter(el =>
			Object.keys(badgeTypeMapping).includes(el),
		).length;
  const { data: publicBadges } = useGetPublicBadges(address || "");
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verifyWorldCoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({proof}),
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Verification failed!");
    }
  };

  const badgeCards = ({
    delegateAmount,
    holderAmount,
    holderType,
    delegateType,
    ...rest
  }: BadgeData) => {
    return { ...rest };
  };
  return (
    <div>
      <HeaderRF6
        progress={30}
        category={"category"}
        question="Which project had the greatest impact on the OP Stack?"
        isFirstSelection={false}
      />
      <WorldIdSignInSuccessModal isOpen={isWorldIdSignSuccessModal} onClose={()=>{
        setIsWorldIdSignSuccessModal(false);
      }}/>
      <FarcasterModal isOpen={isOpenFarcasterModal} onClose={()=>{
        setIsOpenFarcasterModal(false)
      }}/>
      <p className="mt-8 p-4"> Allocation page... </p>
      <div className="flex flex-wrap space-x-4 p-4">
        <div className="flex-grow">Box 1</div>
        <div className="w-96 flex-col space-y-6 rounded-sm border border-[#CBD5E0] text-2xl text-black p-4">
          <div>
            <p className="text-[#0F111A] font-semibold">Your voting power</p>
            <hr />
          </div>
          <div className="flex-column space-y-3">
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs">Current Voting Power</p>
              <p className="text-xs text-[#FF0420]">Increase</p>
            </div>
            <div>
              <p className="text-4xl text-[#FF0420]">
                {(publicBadges?.holderPoints || 0) +
                  (publicBadges?.delegatePoints || 0) +
                  (publicBadges?.recipientsPoints || 0) +
                  (publicBadges?.badgeholderPoints || 0)}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-2">
            <p className="text-sm text-[##232634]">Your badges</p>
            <div>
              {publicBadges && numOfBadgesFunc(publicBadges) ? (
                Object.entries(badgeCards(publicBadges)).map(([el1, el2]) => {
                  const [key] = [el1, el2] as BadgeCardEntryType;
                  const handleBadgesImage = () => {
                    switch (key) {
                      case "holderPoints":
                        return "/images/badges/1.png";
                      case "delegatePoints":
                        return "/images/badges/2.png";
                      case "recipientsPoints":
                        return "/images/badges/4.png";
                      case "badgeholderPoints":
                        return "/images/badges/3.png";
                      default:
                        return "/images/badges/1.png";
                    }
                  };
                  return (
                    <Image
                      className="inline-block"
                      src={handleBadgesImage()}
                      width={32}
                      height={32}
                      alt="badge"
                      key={key}
                    />
                  );
                })
              ) : (
                <p>No badges found</p>
              )}
            </div>
          </div>
          <div className="relative flex flex-col space-y-4">
            <p className="text-sm text-[#232634]">
              Increase your voting power by connecting to WorldID
            </p>
            <IDKitWidget
                app_id={appId}
                action={actionId}
                onSuccess={() => {
                  setIsWorldIdSignSuccessModal(true);
                }}
                handleVerify={handleVerify}
                verification_level={VerificationLevel.Device}
            >
              {({ open }) => (
                <button
                  className="flex flex-row items-center p-2.5 px-12 gap-2 rounded-md border-t border border-opacity-0 w-full h-11 text-base font-medium justify-center space-x-1"
                  onClick={open}
                >
                  <Image src="/assets/images/world-id.svg" width={24} height={24} alt=""/>
                  <span>Connect your World ID</span>
                </button>
              )}
            </IDKitWidget>
          </div>
          <hr className="text-[#E0E2EB]"/>
          <p className="text-wrap text-sm text-[#232634] leading-5">
            Check who delegated their voting power to you?
            <br/>
            Connect your socials to know more.
          </p>
          <button className="flex flex-row items-center p-2.5 px-12 gap-2 rounded-md border-t border border-opacity-0 w-full h-11 text-base font-medium justify-center space-x-1"
              onClick={()=>{
                setIsOpenFarcasterModal(true);
              }}
            >
            <Image src="/assets/images/farcaster-icon.svg" width={24} height={24} alt=""/>
            <span>Connect With Farcaster</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllocationPage;
