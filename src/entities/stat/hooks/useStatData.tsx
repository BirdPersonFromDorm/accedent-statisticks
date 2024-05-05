import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getStatData } from "../api/index";
import { Checkbox, Input, MenuProps } from "antd";
import useRegionData from "./useRegionData";
import useVictimsData from "./useVictimsData";
import useFactorData from "../../factors/hooks/useFactorData";

export default function useStatData(): any{

  const {
    getRegionFilterItems,
    selectedStats: selectedStatsRegion,
  } = useRegionData()

  const {
    getVictimsFilterItems,
    selectedStats: selectedStatsVictim,
  } = useVictimsData()

  const {
    getFactorFilterItems,
    selectedStats: selectedStatsFactor,
  } = useFactorData()

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
    queryKey: ['STAT_DATA', selectedStatsRegion, selectedStatsVictim, selectedStatsFactor, dateStart, dateEnd],
    queryFn: async() => await getStatData(selectedStatsRegion, selectedStatsVictim, selectedStatsFactor, dateStart, dateEnd),
    retryOnMount: false
  });


  return {
    chertData,
    getFactorFilterItems,
    getVictimsFilterItems,
    getRegionFilterItems,
    onChangeDate,
    isLoading,
  };
}
