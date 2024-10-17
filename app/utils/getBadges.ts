import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';

export type MedalTypes =
  | 'Bronze'
  | 'Diamond'
  | 'Platnium'
  | 'Gold'
  | 'Silver'
  | 'WHALE';

export type BadgeData = {
  holderPoints?: number
  delegatePoints?: number
  recipientsPoints?: 1
  badgeholderPoints?: 1
  holderAmount?: number
  delegateAmount?: number
  holderType?: MedalTypes
  delegateType?: MedalTypes
};

export type BadgeCardEntryType = [
  key: keyof typeof badgeTypeMapping,
  value: number,
];

export const badgeTypeMapping = {
  holderPoints: 'Holder',
  delegatePoints: 'Delegate',
  recipientsPoints: 'Recipient',
  badgeholderPoints: 'Badgeholder',
};

export const getBadgeMedal = (
  key: BadgeCardEntryType['0'],
  badges: BadgeData,
) => {
  return key === 'holderPoints'
    ? badges.holderType
    : key === 'delegatePoints'
      ? badges.delegateType
      : undefined;
};
const getPublicBadges = async () => {
  const { data } = await axiosInstance.get<BadgeData>('/user/badges', {});
  return data;
};

export const useGetPublicBadges = () => {
  return useQuery({
    queryKey: ['publicBadges'],
    queryFn: () => getPublicBadges(),
  });
};
