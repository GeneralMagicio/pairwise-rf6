import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ISuccessResult } from '@worldcoin/idkit';
import { axiosInstance } from './axiosInstance';
export interface IUpdateFarcasterProps {
  message?: String
  signature?: `0x${string}`
  custody?: `0x${string}`
}
const updateFarcaster = async ({ message, signature, custody }: IUpdateFarcasterProps) => {
  return (await axiosInstance.post('/flow/connect/farcaster', {
    message,
    signature,
    address: custody,
  }));
};
interface IDelegateMetadata {
  username: string
  profileUrl: string
}
interface ICollection {
  collectionId: number
  metadata: IDelegateMetadata
}
export interface ISocialDelegateResponse {
  fromYou?: {
    budget: IDelegateMetadata | null
    collections: ICollection[]
  }
  toYou?: {
    budget: IDelegateMetadata[]
    collections: ICollection[]
  }
}

const updateWorldID = async (proof: ISuccessResult) => {
  await axiosInstance.post('/flow/connect/wid', {
    proof: proof,
  });
};

interface ISocialNetwork {
  userId: string
  metadata: Record<string, any>
  createdAt: string
  updatedAt: string
}
export interface IConnectionStatus {
  farcaster: ISocialNetwork | null
  worldId: ISocialNetwork | null
}
const getConnectionStatus = async () => {
  const { data } = await axiosInstance.get<IConnectionStatus>('/flow/connect/status');
  return data;
};
const getDelegationStatus = async () => {
  const { data } = await axiosInstance.get<ISocialDelegateResponse>('/flow/delegate/status');
  return data;
};

export const useFarcasterSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFarcaster,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['publicBadges'],
      });
      queryClient.refetchQueries({
        queryKey: ['connect-status'],
      });
      queryClient.refetchQueries({
        queryKey: ['fetch-delegates'],
      });
    },
  });
};

export const useWorldSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorldID,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['publicBadges'],
      });
      queryClient.refetchQueries({
        queryKey: ['connect-status'],
      });
    },
  });
};

export const useGetConnectionStatus = () => {
  return useQuery({
    queryKey: ['connect-status'],
    queryFn: () => getConnectionStatus(),
  });
};

export const useGetDelegationStatus = () => {
  return useQuery({
    queryKey: ['fetch-delegates'],
    queryFn: () => getDelegationStatus(),
  });
};
