import { Role } from "infrastructure/dto/users.dto";
import { CATEGORY } from "infrastructure/dto/wp.dto"
import { HTTP } from "infrastructure/http/http"
import { AUTHORS_API_URL, MEDIA_API_URL, POSTS_API_URL, WP_API_CATEGORY, WP_API_PAGES, WP_API_PAGES_LIST } from "./config";

export const createCategory = async (category:CATEGORY) => {
  const response = await HTTP.post(WP_API_CATEGORY, category)
  console.log(response);
  return response;
}

export const getAllPostsFromServer = async () => {
  //   get all posts from Server
  try {
    const res = await HTTP.get(POSTS_API_URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPagesFromServer = async (offset?:number,category?:string) => {
  //   get all posts from Server
  try {
    const res = await HTTP.get(WP_API_PAGES_LIST+`${offset ? '&offset='+offset : ''}${category ? '&category='+category : ''}`);
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

export const getAuthor = async (id:string) => {
  try {
    const {
      data: { name },
    } = await HTTP.get(`${AUTHORS_API_URL}/${id}`);
    return name;
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedImage = async (id:string) => {
  try {
    const res = await HTTP.get(`${MEDIA_API_URL}/${id}`);
    return res.data.guid.rendered;
  } catch (error) {
    console.log(error);
    return '';
  }
};