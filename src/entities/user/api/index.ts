import { IResponseApi } from "../../../api/types/IRequestApi";
import { api } from "../../../api/ApiWithoutToken";

export const PreAuth = async (phone: any): Promise<IResponseApi<any>> => {
  return await api.post("/auth", {phone});
};

