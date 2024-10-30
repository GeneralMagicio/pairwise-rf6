import { FC } from 'react';
import Image from 'next/image';
import styles from '../../styles/Animation.module.css';
import { MedalTypes } from '@/app/utils/getBadges';

export enum BadgesEnum {
  HOLDER = 'holder',
  DELEGATE = 'delegate',
  BADGE_HOLDER = 'badge_holder',
  RECIPIENT = 'recipient',
}

type BadgeVariation = MedalTypes;

export interface IActiveBadge {
  type: BadgesEnum
  variation?: BadgeVariation
}

interface IActiveBadgesProps {
  activeBadges: IActiveBadge[]
}

const badgeImages: Record<BadgesEnum, Record<BadgeVariation, string> | string>
  = {
    [BadgesEnum.HOLDER]: {
      Bronze: '/assets/images/badges/holder_bronze.svg',
      Silver: '/assets/images/badges/holder_silver.svg',
      Gold: '/assets/images/badges/holder_gold.svg',
      Platinum: '/assets/images/badges/holder_platinum.svg',
      Diamond: '/assets/images/badges/holder_diamond.svg',
      Whale: '/assets/images/badges/holder_whale.svg',
    },
    [BadgesEnum.DELEGATE]: {
      Bronze: '/assets/images/badges/delegate_bronze.svg',
      Silver: '/assets/images/badges/delegate_silver.svg',
      Gold: '/assets/images/badges/delegate_gold.svg',
      Platinum: '/assets/images/badges/delegate_platinum.svg',
      Diamond: '/assets/images/badges/delegate_diamond.svg',
      Whale: '/assets/images/badges/delegate_whale.svg',
    },
    [BadgesEnum.BADGE_HOLDER]: '/assets/images/badges/badgeholder.svg',
    [BadgesEnum.RECIPIENT]: '/assets/images/badges/recipient.svg',
  };

export const getBadgeImage = (badge: IActiveBadge): string => {
  const { type, variation } = badge;
  const image = badgeImages[type];

  if (typeof image === 'string') {
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
            alt={`${badge.type} ${badge.variation ?? ''}`.replace('_', ' ')}
            width={32}
            height={32}
          />
        </div>
      ))}
    </div>
  );
};

export default ActiveBadges;
