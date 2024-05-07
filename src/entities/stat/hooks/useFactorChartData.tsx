import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getDTPChartData, getFactorChartData } from "../api/index";
import { Checkbox, Input, MenuProps } from "antd";
import useRegionData from "./useRegionData";
import useVictimsData from "./useVictimsData";
import useFactorData from "../../factors/hooks/useFactorData";
import useFactorDtpData from "./useFactorDtpData";

export default function useFactorChartData(): any{

  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const onChangeDate = (dateStrings: any) => {
    if (!dateStrings) {
      setDateStart('')
      setDateEnd('')
    } else {
      setDateStart(dateStrings[0])
      setDateEnd(dateStrings[1])
    }
  }

  const {
    analizFactor,
    selectedStats: selectedAnalizFactor,
    setSelectedStats: setSelectedAnalizFactor,
  } = useFactorData()


  const { data: factorChartData, isLoading } = useQuery({
    queryKey: [
      'FACTOR_CHART_DATA',
      selectedAnalizFactor,
      dateStart,
      dateEnd
    ],
    queryFn: async() => await getFactorChartData(
      selectedAnalizFactor,
      dateStart,
      dateEnd
    ),
    retryOnMount: false
  });


  return {
    factorChartData,
    onChangeDate,
    isLoading,
    analizFactor,
    selectedAnalizFactor,
    setSelectedAnalizFactor
  };
}
