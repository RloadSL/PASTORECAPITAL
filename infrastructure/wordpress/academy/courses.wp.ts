import { Course } from "domain/Course/Course"
import { PAGES } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import { WP_API_CATEGORY, WP_API_PAGES, WP_EDIT_POST } from "../config"



export const createWpCourse = async (course:PAGES, wpToken: string) => {
  const cat = await HTTP.post(WP_API_CATEGORY, {name: course.title}, {Authorization: `Bearer ${wpToken}`})
  if(cat.data?.id){
    const resPage = await HTTP.post(WP_API_PAGES, {...course, status:'private', categories: cat.data.id}, {Authorization: `Bearer ${wpToken}`})
    if(resPage.data.id){
      return new Course({...resPage.data, wpID: resPage.data.id});
    }else{
      return cat.errCode;
    }
  }else{
    alert(cat.errCode)
  }
}

export const editWpCourseLink = async (id: string, token:string) => {
  return `${WP_EDIT_POST}?post=45&action=edit&?token=${token}`;
}