import { apiToken } from "../../../api/ApiWithToken";

export async function getFactorsData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/Factor?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addFactor(data: any){
  const response = await apiToken.post<any>(`/Factor`, data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteFactor(id: string){
  const response = await apiToken.delete<any>(`/Factor/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function getFactorById(id: any){
  const response = await apiToken.get<any>(`/Factor/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchFactor(data: any){
  const response = await apiToken.patch<any>(
    `/Factor/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

