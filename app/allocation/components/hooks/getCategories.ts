import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { ICategory } from '../../../comparison/utils/types';

export const getCategories = async (): Promise<AxiosResponse<ICategory[]>> => {
  return (await axiosInstance.get('flow/collections')).data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
