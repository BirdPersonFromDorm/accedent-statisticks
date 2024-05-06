import { useQuery } from "@tanstack/react-query";
import { getFactorById } from "../api/index";

export default function useFactorDataByID(id: string): {
  brandDataById: any | undefined;
  isLoading: boolean;
}{

  const { data: brandDataById, isLoading } = useQuery({
    queryKey: ['FACTORS_DATA_BY_ID', id],
    queryFn: async(id: any) => await getFactorById(id),
    retryOnMount: false
  });

  return {
    brandDataById,
    isLoading
  };
}
