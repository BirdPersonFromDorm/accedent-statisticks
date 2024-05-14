import { apiToken } from "../../../api/ApiWithToken";
import dayjs from "dayjs";

export async function getDTPChartData(
  selectedStatsRegion: any,
  selectedStatsVictim: any,
  selectedStatsFactorDTP: any,
  dateStart: any,
  dateEnd: any
){

  let params = new URLSearchParams();

  if (selectedStatsRegion && selectedStatsRegion?.length !== 0) {
    params.append("region_code", selectedStatsRegion?.map((item: any) => item?.id)?.join(','));
  }

  if (selectedStatsVictim) {
    params.append("victim", selectedStatsVictim);
  }

  if (selectedStatsFactorDTP && selectedStatsFactorDTP?.length !== 0) {
    params.append("factor_dtp_id", selectedStatsFactorDTP?.map((item: any) => item?.id)?.join(','));
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

export async function getExtraStatData(
  selectedStatsFactorDTP: any,
  dateStart: any,
  dateEnd: any
){

  let params = new URLSearchParams();

  if (selectedStatsFactorDTP) {
    params.append("analysis_factor_id", selectedStatsFactorDTP);
  }

  if (dateStart && dateEnd) {
    params.append("start_date", dayjs(dateStart).format('YYYY-MM-DD'));
    params.append("end_date", dayjs(dateEnd).format('YYYY-MM-DD'));
  }

  const response = await apiToken.get<any>(`/analysis-correlation/calc`,{
    params,
  });

  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function getFactorChartData(
  selectedFactorId: any,
  dateStart: any,
  dateEnd: any
){

  let params = new URLSearchParams();

  if (selectedFactorId) {
    params.append("analysis_factor_id", selectedFactorId);
  }

  if (dateStart && dateEnd) {
    params.append("start_date", dayjs(dateStart).format('YYYY-MM-DD'));
    params.append("end_date", dayjs(dateEnd).format('YYYY-MM-DD'));
  }

  const response = await apiToken.get<any>(`/factor-chart`,{
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
