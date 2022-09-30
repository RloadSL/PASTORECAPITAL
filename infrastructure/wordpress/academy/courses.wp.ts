import { Course } from "domain/Course/Course"
import { PAGES } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import { WP_API_CATEGORY, WP_API_PAGES, WP_EDIT_POST } from "../config"
import { createCategory, getCategories } from "../wp.utils"



export const createWpCourse = async (course:PAGES, wpToken: string) => {
  let primaryCat = await getCategoryAcademy('courses', wpToken)

  const cat = await HTTP.post(WP_API_CATEGORY, {name: course.title}, {Authorization: `Bearer ${wpToken}`})
  if(cat.data?.id){
    const pageArg = {
      ...course,
      status:'private',
      categories: [cat.data.id, course.level.id, primaryCat],
      template : 'category-courses.php'
    }
    const resPage = await HTTP.post(WP_API_PAGES, pageArg, {Authorization: `Bearer ${wpToken}`})
    if(resPage.data.id){
      return new Course({...resPage.data, wpID: resPage.data.id});
    }else{
      return cat.errCode;
    }
  }else{
    return cat.errCode;
  }
}

export const deleteWpCourse = async (courseId: number, wpToken: string) => {
  const deleted = await HTTP.delete(WP_API_PAGES+`/${courseId}?force=true`, {Authorization: `Bearer ${wpToken}`})
  
  return deleted.data;
}

const getCategoryAcademy = async (target:'courses' | 'tutorials', wpToken:string):Promise<number> => {
  const academyCat = await getCategories('academy-'+target);
  if(academyCat.length === 0){
    const cat = await HTTP.post(WP_API_CATEGORY, {name: 'Academy '+target, slug: 'academy-'+target}, {Authorization: `Bearer ${wpToken}`})
    return cat.data.id
  }else{
    return academyCat[0].id
  }
}

