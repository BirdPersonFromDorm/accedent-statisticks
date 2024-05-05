import { apiToken } from "../../../api/ApiWithToken";

export async function getAnalysisData(currentPage: number, limit: number){
  const response = await apiToken.get<any>(`/Analysis?page=${currentPage}&limit=${limit}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response?.data;
}

export async function addAnalysi(data: any){
  const response = await apiToken.post<any>(`/Analysis`, data);
  if (response?.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function deleteAnalysis(id: string){
  const response = await apiToken.delete<any>(`/Analysis/${id}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export async function getAnalysisById(id: any){
  const response = await apiToken.get<any>(`/Analysis/${id?.queryKey?.[1]}`);
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

export async function patchLocation(data: any){
  const response = await apiToken.patch<any>(
    `/Analysis/${data?.id}`,
    {
      ...data?.data
    }
  );
  if (response?.status !== 200) {
    throw new Error(response.data.message);
  }
  return response.data;
}

