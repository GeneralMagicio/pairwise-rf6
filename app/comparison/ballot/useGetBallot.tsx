import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';

export type AgoraBallotPost = {
  projects: {
    project_id: string
    allocation: string
    impact: number
  }[]
}

export const getBallot = async (
  cid: number,
): Promise<AgoraBallotPost> => {
  const { data } = await axiosInstance.get(`flow/ballot?cid=${cid}`);
  return data;
};

export const ballotSuccessPost = async () => {
  const { data } = await axiosInstance.post('/flow/ballot/success');
  return data;
};

export const useGetBallot = (cid: number) => {
  return useQuery({
    queryKey: ['ballot', cid],
    queryFn: () => getBallot(cid),
  });
};
