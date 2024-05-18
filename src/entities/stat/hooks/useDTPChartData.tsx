import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getDTPChartData, getExtraStatData } from "../api/index";
import { Checkbox, Input, MenuProps } from "antd";
import useRegionData from "./useRegionData";
import useVictimsData from "./useVictimsData";
import useFactorData from "../../factors/hooks/useFactorData";
import useFactorDtpData from "./useFactorDtpData";

export default function useDTPChartData(): any{

  const {
    getRegionFilterItems,
    selectedStats: selectedStatsRegion,
  } = useRegionData()

  const {
    victimsData,
    setSelectedStats: setSelectedStatsVictim,
    selectedStats: selectedStatsVictim,
  } = useVictimsData()

  const {
    getFactorDTPFilterItems,
    selectedStats: selectedStatsFactorDTP,
  } = useFactorDtpData()

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

  const { data: chertData, isLoading } = useQuery({
    queryKey: [
      'DTP_CHART_DATA',
      selectedStatsRegion,
      selectedStatsVictim,
      selectedStatsFactorDTP,
      dateStart,
      dateEnd
    ],
    queryFn: async() => await getDTPChartData(
      selectedStatsRegion,
      selectedStatsVictim,
      selectedStatsFactorDTP,
      dateStart,
      dateEnd
    ),
    retryOnMount: false
  });

  return {
    chertData,
    getRegionFilterItems,
    getFactorDTPFilterItems,
    victimsData,
    setSelectedStatsVictim,
    selectedStatsVictim,
    selectedStatsFactorDTP,
    selectedStatsRegion,
    onChangeDate,
    isLoading,
  };
}
