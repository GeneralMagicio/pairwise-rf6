import { FC } from "react";
import Image from "next/image";
import styles from "../../styles/Animation.module.css";

export enum BadgesEnum {
  HOLDER = "holder",
  DELEGATE = "delegate",
  BADGE_HOLDER = "badge_holder",
  RECIPIENT = "recipient",
}

type BadgeVariation = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "whale";

export interface IActiveBadge {
  type: BadgesEnum;
  variation?: BadgeVariation;
}

interface IActiveBadgesProps {
  activeBadges: IActiveBadge[];
}

const badgeImages: Record<BadgesEnum, Record<BadgeVariation, string> | string> =
  {
    [BadgesEnum.HOLDER]: {
      bronze: "/assets/images/badges/holder_bronze.svg",
      silver: "/assets/images/badges/holder_silver.svg",
      gold: "/assets/images/badges/holder_gold.svg",
      platinum: "/assets/images/badges/holder_platinum.svg",
      diamond: "/assets/images/badges/holder_diamond.svg",
      whale: "/assets/images/badges/holder_whale.svg",
    },
    [BadgesEnum.DELEGATE]: {
      bronze: "/assets/images/badges/delegate_bronze.svg",
      silver: "/assets/images/badges/delegate_silver.svg",
      gold: "/assets/images/badges/delegate_gold.svg",
      platinum: "/assets/images/badges/delegate_platinum.svg",
      diamond: "/assets/images/badges/delegate_diamond.svg",
      whale: "/assets/images/badges/delegate_whale.svg",
    },
    [BadgesEnum.BADGE_HOLDER]: "/assets/images/badges/badgeholder.svg",
    [BadgesEnum.RECIPIENT]: "/assets/images/badges/recipient.svg",
  };

const getBadgeImage = (badge: IActiveBadge): string => {
  const { type, variation } = badge;
  const image = badgeImages[type];

  if (typeof image === "string") {
    return image;
  }

  if (variation) {
    return image[variation];
  }

  throw new Error(`Badge of type ${type} requires a variation.`);
};

const ActiveBadges: FC<IActiveBadgesProps> = ({ activeBadges }) => {
  return (
    <div className="relative flex items-center">
      {activeBadges.map((badge, index) => (
        <div
          key={`${badge.type}-${badge.variation}`}
          className={`${styles.badgeContainer}`}
          style={{ zIndex: index }}
        >
          <Image
            src={getBadgeImage(badge)}
            alt={`${badge.type} ${badge.variation ?? ""}`.replace("_", " ")}
            width={32}
            height={32}
          />
        </div>
      ))}
    </div>
  );
};

export default ActiveBadges;
