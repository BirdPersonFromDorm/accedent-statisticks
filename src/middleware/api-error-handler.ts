import { AxiosResponse } from "axios";
import { message } from "antd";

export const ApiErrorHandler = (response: AxiosResponse) => {
  if (response.data.success === false) {
    if (
      response.data.code === "clinic:schedule:error" ||
      response.data.code === "clinic:serviceList:error" ||
      response.data.code === "entityOrderStatus:false" ||
      response.data.code === "entityOrderUpdate:calculateOrder:false"
    ) {
      return response;
    }
    let errors = response.data.errors;
    let messageErrors: Array<string> = [];
    errors.forEach((element: string) => {
      messageErrors.push(element.split(":")[1]);
    });
    response.data.message =
      response.data.message +
      (messageErrors.length > 0 ? ": \n" + messageErrors.join("\n") : "");
    message.error(response.data.message)
    if (response.data.code === 401) {
      if (response.config.url === "/client/auth") {
        return response;
      }
      // ClearTokenFunction(true);
    }
    if (response.data.success === true && response.data.message.length > 0) {
      message.success(response.data.message)
    }
    return response;
  }
  return response;
};
