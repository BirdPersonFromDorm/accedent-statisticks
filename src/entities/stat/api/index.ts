import { apiToken } from "../../../api/ApiWithToken";
import dayjs from "dayjs";

export async function getStatData(
  selectedStatsRegion: any,
  selectedStatsVictim: any,
  selectedStatsFactor: any,
  selectedStatsFactorDTP: any,
  dateStart: any,
  dateEnd: any
){

  let params = new URLSearchParams();

  if (selectedStatsRegion && selectedStatsRegion?.length !== 0) {
    params.append("region_code", selectedStatsRegion?.map((item: any) => item?.id)?.join(','));
  }
  if (selectedStatsVictim && selectedStatsVictim?.length !== 0) {
    params.append("victim", selectedStatsVictim?.map((item: any) => item?.id)?.join(','));
  }
  if (selectedStatsFactor && selectedStatsFactor?.length !== 0) {
    params.append("factors", selectedStatsFactor?.map((item: any) => item?.id)?.join(','));
  }
  if (selectedStatsFactorDTP && selectedStatsFactorDTP?.length !== 0) {
    params.append("factors-dtp", selectedStatsFactorDTP?.map((item: any) => item?.id)?.join(','));
  }

  if (dateStart && dateEnd) {
    params.append("start_date", dayjs(dateStart).format('YYYY-MM-DD'));
    params.append("end_date", dayjs(dateEnd).format('YYYY-MM-DD'));
  }

  const response = await apiToken.get<any>(`/dtp-chart`,{
    params,
  });

  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function getRegionData(){
  const response = await apiToken.get<any>(`/regions`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}


export async function getFactorDTPData(){
  const response = await apiToken.get<any>(`/dtp-factor`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}


export async function getVictimsData(){
  const response = await apiToken.get<any>(`/injured-list`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}
