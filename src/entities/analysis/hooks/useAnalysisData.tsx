import { useQuery } from "@tanstack/react-query";
import { getAnalysisData } from "../api/index";
import { useState } from "react";

export default function useAnalysisData(): {
  locationData: any | undefined;
  currentPage: number,
  setCurrentPage: (page: number) =>void,
  setLimit: (page: number) =>void,
  isLoading?: boolean;
} {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data: locationData, isLoading } = useQuery({
    queryKey: ['LOCATION_DATA', currentPage, limit],
    queryFn: async () => await getAnalysisData(currentPage, limit),
    retryOnMount: false
  });

  return {
    locationData,
    currentPage,
    setCurrentPage,
    setLimit,
    isLoading,
  };
}
