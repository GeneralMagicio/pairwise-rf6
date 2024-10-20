import React from "react";
import { ConnectButton } from "@/app/utils/wallet/Connect";
import { PwLogo } from "@/public/assets/icon-components/PairwiseLogo";
import { ThinExternalLinkIcon } from "@/public/assets/icon-components/ThinExternalLink";
import ActiveBadges, { BadgesEnum, IActiveBadge } from "./ActiveBadges";
import Modal from "../../utils/Modal";
import BadgesModal from "./modals/BadgesModal";

interface HeaderProps {
  progress: number;
  category: string;
  question: string;
  isFirstSelection?: boolean;
}

const PAIRWISE_REPORT_URL = `https://github.com/GeneralMagicio/pairwise-rf6/issues/new?
  assignees=MoeNick&labels=&projects=&template=report-an-issue.md&title=%5BFeedback%5D+`;

const activeBadges: IActiveBadge[] = [
  {
    type: BadgesEnum.HOLDER,
    variation: "whale",
  },
  {
    type: BadgesEnum.DELEGATE,
    variation: "whale",
  },
  {
    type: BadgesEnum.BADGE_HOLDER,
  },
  {
    type: BadgesEnum.RECIPIENT,
  },
];

const HeaderRF6: React.FC<HeaderProps> = ({ isFirstSelection, question }) => {
  const [isBadgesModalOpen, setIsBadgesModalOpen] = React.useState(false);

  return (
    <>
      <Modal isOpen={isBadgesModalOpen} onClose={() => {setIsBadgesModalOpen(false)}} showCloseButton>
        <BadgesModal badges={activeBadges} />
      </Modal>

      <div className="relative z-40 w-full border-b bg-white">
        <div className="flex flex-col-reverse items-center justify-between px-6 py-4 md:px-12 lg:flex-row lg:px-4">
          {!isFirstSelection && (
            <div className="flex items-center justify-between bg-white px-4 py-2">
              <div className="flex items-center">
                <PwLogo />
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsBadgesModalOpen(true)}
              className="flex items-center gap-2"
            >
              <ActiveBadges activeBadges={activeBadges} />
            </button>
            <ConnectButton />
            <button
              className="mr-8 flex items-center justify-center gap-2 rounded-lg border border-gray-200 p-2 text-sm font-semibold"
              onClick={() =>
                window.open(PAIRWISE_REPORT_URL + question, "_blank")
              }
            >
              Report an issue
              <ThinExternalLinkIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderRF6;
