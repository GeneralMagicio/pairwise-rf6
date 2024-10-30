import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { IProject } from '../types';

export const getProjectsByCategoryId = async (
  id: number,
): Promise<IProject[]> => {
  return (await axiosInstance.get(`flow/projects?cid=${id}`)).data;
};

export const useProjectsByCategoryId = (id: number) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProjectsByCategoryId(id),
    staleTime: Infinity,
  });
};
