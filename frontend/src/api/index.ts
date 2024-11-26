import { GET, GETNOBASE, apiClient } from "./api";
import Index from "./modules";

export { GETNOBASE };

interface UrlObj {
  [key: string | number]: string;
}
export const urlObj: UrlObj = {
  ...Index,
};

type Keys = string | number;
export const currentGET = (key: Keys, param?: any) => {
  return GET(urlObj[key], param || {});
};


export const testGET = (endpoint: string) => {
  return apiClient.get(`/${endpoint}`);
};
