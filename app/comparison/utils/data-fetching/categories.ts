import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { CollectionProgressStatus } from '../types';

export type TCategory = {
  id: number
  name: string
  description: string
  image: string
  projectCount: number
  progress: CollectionProgressStatus
  attestationLink: string | null
};

export const getCategories = async (): Promise<TCategory[]> => {
  const res = await axiosInstance.get('flow/collections');
  return res.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
