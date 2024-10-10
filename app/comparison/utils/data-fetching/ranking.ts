import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';

export interface IProjectsRankingResponse {
  ranking: {  rank: number
    star: number
    name: string
    share: number
  }[]
  hasRanking: boolean
  isFinished: boolean
  progress: string
  name: string
  share: number
  id: number

}

export const getProjectsRankingByCategoryId = async (
  cid: number,
): Promise<IProjectsRankingResponse> => {
  return (await axiosInstance.get(`flow/ranking?cid=${cid}
`)).data;
};

export const useProjectsRankingByCategoryId = (cid: number) => {
  return useQuery({
    queryKey: ['projects-ranking', cid],
    queryFn: () => getProjectsRankingByCategoryId(cid),
    staleTime: Infinity,
  });
};
