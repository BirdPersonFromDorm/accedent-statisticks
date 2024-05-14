import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getDTPChartData, getExtraStatData } from "../api/index";
import { Checkbox, Input, MenuProps } from "antd";
import useRegionData from "./useRegionData";
import useVictimsData from "./useVictimsData";
import useFactorData from "../../factors/hooks/useFactorData";
import useFactorDtpData from "./useFactorDtpData";

export default function useExtraStatData(): any{

  const [selectedAnalizFactorForExtraStat, setSelectedAnalizFactorForExtraStat] = useState<string>("");

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

  const { data: extraStatData, isLoading: isLoadingExtraStatData } = useQuery({
    queryKey: [
      'EXTRA_STAT_DATA',
      selectedAnalizFactorForExtraStat,
      dateStart,
      dateEnd
    ],
    queryFn: async() => await getExtraStatData(
      selectedAnalizFactorForExtraStat,
      dateStart,
      dateEnd
    ),
    retryOnMount: false
  });


  return {
    extraStatData,
    onChangeDate,
    isLoadingExtraStatData,
    setSelectedAnalizFactorForExtraStat,
  };
}
