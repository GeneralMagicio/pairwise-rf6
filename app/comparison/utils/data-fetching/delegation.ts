import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/app/utils/axiosInstance';

export const revokeDelegation = async (collectionId: number) => {
  await axiosInstance.post('flow/delegate/revoke', { collectionId });
};

export const useRevokeDelegation = (collectionId: number) => {
  return useMutation({
    mutationFn: () => revokeDelegation(collectionId),
  });
};
