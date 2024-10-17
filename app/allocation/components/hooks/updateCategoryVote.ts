import { axiosInstance } from '@/app/utils/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CategoryVoteData = {
	data: {
		collection1Id: number;
		collection2Id: number;
		pickedId: number;
	};
};

export const updateCategoryVote = ({ data }: CategoryVoteData) => {
	return axiosInstance.post('/flow/collections/vote', data);
};

export const useUpdateCategoryVote = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCategoryVote,
		onSuccess: ({ data }) => {
			queryClient.refetchQueries({
				queryKey: ['category-pairs'],
			});
			queryClient.refetchQueries({
				queryKey: ['category', data.collection1Id],
			});
		},
	});
};
