import { Course } from "domain/Course/Course"
import { PAGES } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import { WP_API_CATEGORY, WP_API_PAGES } from "../config"



export const createWpCourse = async (course:PAGES, wpToken: string) => {
  const response = await HTTP.post(WP_API_CATEGORY, {name: course.title}, {Authorization: `Bearer ${wpToken}`})
  if(response.data.id){
    const resPage = await HTTP.post(WP_API_PAGES, {...course, status:'private', categories: response.data.id}, {Authorization: `Bearer ${wpToken}`})
    if(resPage.data.id){
      return new Course(resPage.data)
    }else{
      return response.errCode;
    }
  }else{
    alert(response.errCode)
  }
}