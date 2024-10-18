import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IProject } from '@/app/comparison/utils/types';
import { axiosInstance } from '@/app/utils/axiosInstance';

export interface IProjectsRankingResponse {
  ranking: IProject[]
  hasRanking: boolean
  isFinished: boolean
  progress: string
  name: string
  share: number
  id: number
}

export const getProjectsRankingByCategoryId = async (
  cid: number
): Promise<AxiosResponse<IProjectsRankingResponse>> => {
  return axiosInstance.get(`flow/ranking?cid=${cid}`);
};

export const useProjectsRankingByCategoryId = (cid: number) => {
  return useQuery({
    queryKey: ['projects-ranking', cid],
    queryFn: () => getProjectsRankingByCategoryId(cid),
    staleTime: Infinity,
  });
};
