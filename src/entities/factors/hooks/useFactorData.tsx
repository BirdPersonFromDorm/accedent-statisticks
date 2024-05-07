import { useQuery } from "@tanstack/react-query";
import { getFactorsData } from "../api/index";
import React, { useEffect, useState } from "react";

export default function useFactorData(): any{

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const { data: analizFactor, isLoading } = useQuery({
    queryKey: ['FACTORS_DATA', currentPage, limit],
    queryFn: async() => await getFactorsData(currentPage, limit),
    retryOnMount: false
  });

  const [selectedStats, setSelectedStats] = useState(null)

  return {
    analizFactor,
    currentPage,
    setCurrentPage,
    setLimit,
    isLoading,
    selectedStats,
    setSelectedStats,
  };
}
