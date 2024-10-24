import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';

type CollectionMetadata = {
  readonly username: string
  readonly profileUrl: string
};

type Budget = {
  readonly metadata: CollectionMetadata
};

type Collection = {
  readonly collectionId: number
  readonly metadata: CollectionMetadata
};

interface DelegateStatusData {
  fromYou: {
    budget: Budget
    collections: Collection[]
  }
  toYou?: {
    budget: Budget[]
    collections: Collection[]
  }
}

export const getDelegations = async (): Promise<DelegateStatusData> => {
  const res = await axiosInstance.get('delegate/status');
  return res.data;
};

export const useGetDelegations = () => {
  return useQuery({
    queryKey: ['delegations'],
    queryFn: () => getDelegations(),
  });
};

export const revokeDelegation = async (collectionId: number) => {
  await axiosInstance.post('delegate/revoke', { collectionId });
};

export const useRevokeDelegation = (collectionId: number) => {
  return useMutation({
    mutationFn: () => revokeDelegation(collectionId),
  });
};
