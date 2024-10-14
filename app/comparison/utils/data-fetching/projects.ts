import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { IProject } from '../types';

export const getProjectsByCategoryId = async (
  id: number,
): Promise<AxiosResponse<IProject[]>> => {
  return axiosInstance.get(`flow/projects?cid=${id}`);
};

export const useProjectsByCategoryId = (id: number) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProjectsByCategoryId(id),
    staleTime: Infinity,
  });
};
