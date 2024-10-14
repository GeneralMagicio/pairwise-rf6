import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { IProject } from '../types';

export interface IPairwisePairsResponse {
  pairs: IProject[][]
  totalPairs: number
  votedPairs: number
  name: string
  progress: number
  threshold: number
}

export const getPairwisePairs = async (
  cid: number,
): Promise<IPairwisePairsResponse> => {
  return (await axiosInstance.get(`flow/pairs?cid=${cid}`)).data;
};

export const useGetPairwisePairs = (cid: number) => {
  return useQuery({
    queryKey: ['pairwise-pairs', cid],
    queryFn: () => getPairwisePairs(cid),
  });
};

// type Arg = {
//   data: { cid: number
//     pid: number }
// }

// export const getPairwisePairsForProject = async (data: Arg): Promise<IPairwisePairsResponse> => {
//   const { cid, pid } = data
//   return (await axiosInstance.get(`pairs-for-project?cid=${cid}&pid=${pid}`)).data
// }

// export const useGetPairwisePairsForProject = (cid: number, pid: number) => {
//   return useQuery({
//     queryFn: getPairwisePairsForProject,
//     queryKey: ['pairwise-pairs-project', { cid, pid }],
//   })
// }

export const getPairwisePairsForProject = async (
  cid: number,
  pid: number
): Promise<IPairwisePairsResponse> => {
  return (await axiosInstance.get(`flow/pairs-for-project?cid=${cid}&pid=${pid}`)).data;
};

// export const useGetPairwisePairsForProject = (cid: number) => {
//   return useLazyQuery({
//     queryFn: getPairwisePairsForProject(cid),
//     queryKey: ['pairwise-pairs-project', cid],
//   })
// }
