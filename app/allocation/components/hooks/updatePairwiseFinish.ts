import { axiosInstance } from "@/app/utils/axiosInstance";
import { useMutation } from '@tanstack/react-query';

type ProjectVoteData = {
	data: {
		cid: number;
	};
};

export const updatePairwiseFinish = ({ data }: ProjectVoteData) => {
	return axiosInstance.post('flow/finish', data);
};

export const useUpdatePairwiseFinish = () => {
	// const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updatePairwiseFinish,
		// onSuccess:
	});
};
