import { CATEGORY } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import { WP_API_CATEGORY, WP_API_TOKEN_AUTHORIZATION } from "./config";

export const createCategory = async (category:CATEGORY) => {
  const response = await HTTP.post(WP_API_CATEGORY, category)
  console.log(response);
  return response;
}

export const createToken = async (credentials:{name:string, password: string}) => {
  const response = await HTTP.post(WP_API_TOKEN_AUTHORIZATION, credentials)
  console.log(response);
  return response;
}
