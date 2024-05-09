import { apiToken } from "../../../api/ApiWithToken";

export async function getFactorsData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/analysis-factor?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addFactor(data: any){
  const response = await apiToken.post<any>(`/analysis-factor`, data);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteFactor(id: string){
  const response = await apiToken.delete<any>(`/analysis-factor/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function getFactorById(id: any){
  const response = await apiToken.get<any>(`/analysis-factor/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchFactor(data: any){
  const response = await apiToken.patch<any>(
    `/analysis-factor/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

