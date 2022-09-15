import { CATEGORY } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import { WP_API_CATEGORY } from "../config"



export const createWpCourse = async (name:string) => {
  const response = await HTTP.post(WP_API_CATEGORY, {name})
  console.log('Categoria', response);
}