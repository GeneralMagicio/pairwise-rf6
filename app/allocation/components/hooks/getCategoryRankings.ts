import { axiosInstance } from "@/app/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IProjectsRankingResponse } from "../../../comparison/utils/data-fetching/ranking";
import { ICategory } from "@/app/comparison/utils/types";

interface ICategoryRankingResponse
  extends Omit<IProjectsRankingResponse, "ranking"> {
  ranking: ICategory[];
}

export const getCategoryRankings =
  async (): Promise<ICategoryRankingResponse> => {
    const res = await axiosInstance.get(`flow/ranking
	`);

    return res.data;
  };

export const useCategoryRankings = () => {
  return useQuery({
    queryKey: ["category-ranking"],
    queryFn: () => getCategoryRankings(),
  });
};
