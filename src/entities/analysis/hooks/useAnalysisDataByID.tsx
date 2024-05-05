import { useQuery } from "@tanstack/react-query";
import { getAnalysisById } from "../api/index";

export default function useAnalysisDataByID(id: string): {
  locationDataById: any | undefined;
  isLoading: boolean;
}{

  const { data: locationDataById, isLoading } = useQuery({
    queryKey: ['LOCATION_DATA_BY_ID', id],
    queryFn: async(id: any) => await getAnalysisById(id),
    retryOnMount: false
  });

  return {
    locationDataById,
    isLoading
  };
}
