import { Role } from "infrastructure/dto/users.dto";
import { CATEGORY } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import { AuthImplInstance } from "infrastructure/repositories/authentication.repository";
import { WP_API_CATEGORY } from "./config";

export const createCategory = async (category:CATEGORY) => {
  const response = await HTTP.post(WP_API_CATEGORY, category)
  console.log(response);
  return response;
}

