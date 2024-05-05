import { apiToken } from "../../../api/ApiWithToken";
import dayjs from "dayjs";

export async function getStatData(
  selectedStatsRegion: any,
  selectedStatsVictim: any,
  selectedStatsFactor: any,
  dateStart: any,
  dateEnd: any
){

  let params = new URLSearchParams();

  if (selectedStatsRegion && selectedStatsRegion?.length !== 0) {
    params.append("region", selectedStatsRegion?.join(','));
  }
  if (selectedStatsVictim && selectedStatsVictim?.length !== 0) {
    params.append("victim", selectedStatsVictim?.join(','));
  }
  if (selectedStatsFactor && selectedStatsFactor?.length !== 0) {
    params.append("factors", selectedStatsFactor?.join(','));
  }

  if (dateStart && dateEnd) {
    params.append("updated_after", dayjs(dateStart).format('YYYY-MM-DD HH:mm:ss'));
    params.append("updated_before", dayjs(dateEnd).format('YYYY-MM-DD HH:mm:ss'));
  }

  const response = await apiToken.get<any>(`/stat`,{
    params,
  });

  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function getRegionData(){
  const response = await apiToken.get<any>(`/region`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}


export async function getVictimsData(){
  const response = await apiToken.get<any>(`/victims`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}
