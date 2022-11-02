import { Post } from "domain/Post/Post";
import { HTTP } from "infrastructure/http/http";
import { WP_API_ANLALYSIS, WP_API_POST } from "infrastructure/wordpress/config";

export class AnalysisRepository {
  private static instance: AnalysisRepository;
  private constructor() {};

  public static getInstance(): AnalysisRepository {
    if (!AnalysisRepository.instance) {
      AnalysisRepository.instance = new AnalysisRepository();
    }
    return AnalysisRepository.instance;
  }
  getCategories = async ({only_analysis}:{ only_analysis : 0 | 1} =  {only_analysis : 0}) => {
    const res = await HTTP.get(`${WP_API_ANLALYSIS}category?only_analysis=${only_analysis}`) 
    if(Array.isArray(res)){
      return res.map(term => {
        return {
          value: term.term_id,
          label: term.name
        }
      })
    }else{
      return {
        value: res.term_id,
        label: res.name
      }
    }
  }

  
  createArticle = async (categories: number[],wpToken:string , article_args:{title: string, excerpt?: string, created_by: any}):Promise<string | Post> => {
    const a_category = (await this.getCategories({only_analysis: 1})) as {label: string, value: any}
    
    const arg = {
      ...article_args,
      status: 'private',
      content: '<p>Contenido de la lección aquí....</p>',
      categories: [...categories, a_category.value]
    }
    const res = await HTTP.post(WP_API_POST, arg, { Authorization: `Bearer ${wpToken}` })
    if (res.data.id) {
      return new Post({ ...res.data, wpID: res.data.id });
    } else {
      return res.errCode || 'errors.internal';
    }
  }

  async getArticle(userDataToken:string, query:{
    post_status?: 'private' | 'publish',
    posts_per_page?: number,
    offset?: number,
    search?: string
  }){
    let params:string = '' 
    type query_type = 'post_status' | 'posts_per_page' | 'offset' | 'search';
    Object.keys(query).forEach((key )=>{

      if(query[key as query_type]){
        params += `${key}=${query[key as query_type]}`;
      } 
    })
    const res = await HTTP.get(`${WP_API_ANLALYSIS}articles?${params}`) 

  } 
}

export const AnalysisRepositoryInstance = AnalysisRepository.getInstance();