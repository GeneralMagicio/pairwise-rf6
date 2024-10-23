import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { IProjectRanking, ICategory } from '@/app/comparison/utils/types';

interface ICategoryRankingResponse
  extends Omit<IProjectsRankingResponse, 'ranking'> {
  ranking: ICategory[]
}

export interface IProjectsRankingResponse {
  ranking: IProjectRanking[]
  hasRanking: boolean
  isFinished: boolean
  progress: string
  budget: number
  name: string
  share: number
  id: number
}

export interface IProjectRankingObj {
  id: number
  share: number
}

export const getCategoryRankings
  = async (): Promise<ICategoryRankingResponse> => {
    const res = await axiosInstance.get('flow/ranking');

    return res.data;
  };

export const useCategoryRankings = () => {
  return useQuery({
    queryKey: ['category-ranking'],
    queryFn: () => getCategoryRankings(),
  });
};

export const getProjectsRankingByCategoryId = async (
  cid: number | undefined
): Promise<IProjectsRankingResponse> => {
  if (!cid) {
    throw new Error('Invalid category id');
  }
  return (
    await axiosInstance.get(`flow/ranking?cid=${cid}
`)
  ).data;
};

export const useProjectsRankingByCategoryId = (cid: number | undefined) => {
  return useQuery({
    queryKey: ['projects-ranking', cid],
    queryFn: () => getProjectsRankingByCategoryId(cid),
    staleTime: Infinity,
  });
};

export const updateProjectRanking = async ({
  cid,
  ranking,
}: {
  cid: number
  ranking: IProjectRankingObj[]
}) => {
  return (
    await axiosInstance.post('flow/ranking/custom', {
      collectionId: cid,
      ranking,
    })
  ).data;
};

export const useUpdateProjectRanking = ({
  cid,
  ranking,
}: {
  cid: number | undefined
  ranking: IProjectRankingObj[]
}) => {
  const queryClient = useQueryClient();

  if (!cid) {
    throw new Error('Invalid category id');
  }

  return useMutation({
    mutationFn: () => updateProjectRanking({ cid, ranking }),
    onSuccess: () => {
      console.log('OnSuccess');
      queryClient.refetchQueries({
        queryKey: ['projects-ranking', cid],
      });
    },
  });
};
