import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getFactorDTPData, getRegionData, getVictimsData } from "../api/index";
import { Checkbox, Input, MenuProps } from "antd";

export default function useFactorDtpData(): any{

  const { data: factorDtpData, isLoading } = useQuery({
    queryKey: ['FACTOR_DTP_DATA'],
    queryFn: async() => await getFactorDTPData(),
    retryOnMount: false
  });

  const [selectedStats, setSelectedStats] = useState([])
  const [searchStat, setSearchStat] = useState('')

  const getFactorDTPFilterItems = () => {
    if (!factorDtpData?.data) {
      return [];
    }

    let allItems: any[] = [];
    let selectedItems: any[] = [];

    factorDtpData?.data?.filter((item: any) => searchStat ? item?.title.toLowerCase().includes(searchStat.toLowerCase()) : item)
      ?.forEach((item: any) => {
        const isDuplicate = selectedStats.some((statItem: any) => statItem?.id?.toString() === item?.id?.toString());

        if (!isDuplicate) {
          allItems.push({
            label: (
              <div
                style={{ display: "flex", gap: "10px" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  style={{ width: '100%' }}
                  value={item.title}
                  checked={selectedStats.some((statItem: any) => statItem?.id?.toString() === item?.id?.toString())}
                  onChange={(e) => {
                    let newSelectedStat = [...selectedStats];
                    if (e.target.checked) {
                      newSelectedStat.push(item);
                    } else {
                      newSelectedStat = newSelectedStat.filter((el: any) => el?.id?.toString() !== item?.id?.toString());
                    }
                    setSelectedStats(newSelectedStat);
                  }}
                >
                  {item.title}
                </Checkbox>
              </div>
            ),
            key: `stat-${item.id}`,
          });
        }
      });

    selectedStats?.forEach((item: any) => {
      const isDuplicate = selectedStats.some((statItem: any) => statItem?.id?.toString() === item?.id?.toString());

      if (isDuplicate) {
        selectedItems.push({
          label: (
            <div
              style={{ display: "flex", gap: "10px" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Checkbox
                style={{ width: '100%' }}
                value={item.title}
                checked={selectedStats.some((statItem: any) => statItem?.id?.toString() === item?.id?.toString())}
                onChange={(e) => {
                  let newSelectedStat = [...selectedStats];
                  if (e.target.checked) {
                    newSelectedStat.push(item);
                  } else {
                    newSelectedStat = newSelectedStat.filter((el: any) => el?.id?.toString() !== item?.id?.toString());
                  }
                  setSelectedStats(newSelectedStat);
                }}
              >
                {item.title}
              </Checkbox>
            </div>
          ),
          key: `stat-${item.id}`,
        });
      }
    });

    const items: MenuProps["items"] = [
      {
        label: (
          <Input
            value={searchStat}
            onClick={(e) => e?.stopPropagation()}
            onChange={(e) => setSearchStat(e?.target?.value)}
            placeholder={"Поиск..."}
          />
        ),
        key: "stat-search",
      },
      ...selectedItems,
      ...allItems
    ];

    return items;
  };

  return {
    factorDtpData,
    isLoading,
    getFactorDTPFilterItems,
    selectedStats,
    setSelectedStats,
  };
}
