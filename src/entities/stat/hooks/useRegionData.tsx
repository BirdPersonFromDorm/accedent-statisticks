import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getRegionData, getVictimsData } from "../api/index";
import { Checkbox, Input, MenuProps } from "antd";

export default function useRegionData(): any{

  const { data: regionData, isLoading } = useQuery({
    queryKey: ['REGION_DATA'],
    queryFn: async() => await getVictimsData(),
    retryOnMount: false
  });

  const [selectedStats, setSelectedStats] = useState([])
  const [searchStat, setSearchStat] = useState('')

  const getRegionFilterItems = () => {
    if (!regionData) {
      return [];
    }

    let allItems: any[] = [];
    let selectedItems: any[] = [];

    regionData?.slice(0, 10)?.forEach((item: any) => {
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
    regionData,
    isLoading,
    getRegionFilterItems,
    selectedStats,
    setSelectedStats,
    searchStat,
    setSearchStat,
  };
}
