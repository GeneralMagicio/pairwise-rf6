import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';

type Data = {
  data: {
    pid: number // project ID
  }
};

export const markCoi = async ({ data }: Data) => {
  console.log(data);
  const res = await axiosInstance.post('/flow/mark-coi', data);
  return res.data;
};

export const useMarkCoi = () => {
  return useMutation({
    mutationFn: markCoi,
  });
};

export const unmarkCoi = async ({ data }: Data) => {
  console.log(data);
  const res = await axiosInstance.post('/flow/unmark-coi', data);
  return res.data;
};

export const useUnmarkCoi = () => {
  return useMutation({
    mutationFn: unmarkCoi,
  });
};
