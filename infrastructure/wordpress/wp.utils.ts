import { Role } from "infrastructure/dto/users.dto";
import { CATEGORY } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import {  WP_API_CATEGORY, WP_API_PAGES, WP_API_PAGES_LIST, WP_API_POST, WP_API_TAGS } from "./config";

export const createCategory = async (category:CATEGORY) => {
  const response = await HTTP.post(WP_API_CATEGORY, category)
  return response;
}

export const getCategories = async (parentSlug?:string):Promise<Array<any>> => {
  const url = !parentSlug ? WP_API_CATEGORY : WP_API_CATEGORY+`?slug=${parentSlug}`
  const response = await HTTP.get(url)
  return response;
}

export const getAllPostsFromServer = async () => {
  //   get all posts from Server
  try {
    const res = await HTTP.get(WP_API_POST);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPagesFromServer = async (offset?:number, filters?: {search?: string, catLevel?: any, tags?:any}, wpToken?: string) => {
  try {
    const headers = wpToken && {Authorization: `Bearer ${wpToken}`};
    const url = WP_API_PAGES_LIST+`${offset ? '&offset='+offset : ''}${filters?.search ? '&search='+filters.search : ''}${filters?.tags ? '&tags='+filters.tags : ''}${filters?.catLevel ? '&categories='+filters.catLevel.id : ''}${headers ? '&status='+'private' : '&status=publish'}`;
    const res = await HTTP.get(url, headers);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const getPageFromServer = async (id:string) => {
  try {
    const res = await HTTP.get(`${WP_API_PAGES}/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletePageFromServer = async (id:string, wpToken:string) => {
  try {
    const headers = wpToken && {Authorization: `Bearer ${wpToken}`};
    const res = await HTTP.delete(`${WP_API_PAGES}/${id}`, {headers});
    return res;
  } catch (error) {
    console.log(error);
  }
};



export const getTagsFromServer = async (search:string) => {
  try {
    
    const res = await HTTP.get(`${WP_API_TAGS}?search=${search.substring(1)}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const getCategoryAcademy = async (target:'courses' | 'tutorials' | 'lessons', wpToken:string):Promise<number> => {
  const academyCat = await getCategories('academy-'+target);
  if(academyCat.length === 0){
    const cat = await HTTP.post(WP_API_CATEGORY, {name: 'Academy '+target, slug: 'academy-'+target}, {Authorization: `Bearer ${wpToken}`})
    return cat.data.id
  }else{
    return academyCat[0].id
  }
}