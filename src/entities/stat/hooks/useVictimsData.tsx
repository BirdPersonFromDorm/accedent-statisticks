import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getVictimsData } from "../api/index";
import { Checkbox, Input, MenuProps } from "antd";

export default function useVictimsData(): {
  victimsData: any | undefined;
  isLoading?: boolean;
  getVictimsFilterItems: any | undefined;
  selectedStats?: any;
  setSelectedStats?: any;
}{

  const { data: victimsData, isLoading } = useQuery({
    queryKey: ['VICTIMS_DATA'],
    queryFn: async() => await getVictimsData(),
    retryOnMount: false
  });

  const [selectedStats, setSelectedStats] = useState([])

  return {
    victimsData,
    isLoading,
    selectedStats,
    setSelectedStats,
  };
}
