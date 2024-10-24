import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ISuccessResult } from '@worldcoin/idkit';
import { toast } from 'react-toastify';
import { axiosInstance } from './axiosInstance';

import 'react-toastify/dist/ReactToastify.css';
export interface IUpdateFarcasterProps {
  message?: String
  signature?: `0x${string}`
  custody?: `0x${string}`
}
const updateFarcaster = async ({ message, signature, custody }: IUpdateFarcasterProps) => {
  try {
    const response = await axiosInstance.post('/flow/connect/farcaster', {
      message,
      signature,
      address: custody,
    });
    console.log(response);
    return response.data;
  }
  catch (error: any) {
    if (error.response) {
      throw error;
    }
    else {
      throw new Error('No response received from the server');
    }
  }
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
    onError: (error) => {
      console.error(error);
      console.log(error.message);
      toast.error('Error signing in with Farcaster: ' + error.message, {
        position: 'top-center',
        autoClose: 15000,
      });
      throw new Error(error.message);
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
