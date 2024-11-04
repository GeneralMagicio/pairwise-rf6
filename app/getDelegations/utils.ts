import { axiosInstance } from '@/app/utils/axiosInstance';

export interface IGetDelegationsResponse { fid: number, username: string, totalDelegates: number }

export const fetchDailyDelegations
    = async (): Promise<IGetDelegationsResponse[]> => {
      const res = await axiosInstance.get('flow/delegate/farcaster/daily');
      return res.data;
    };

export const fetchDelegations
    = async (): Promise<IGetDelegationsResponse[]> => {
      const res = await axiosInstance.get('flow/delegate/farcaster');
      return res.data;
    };
