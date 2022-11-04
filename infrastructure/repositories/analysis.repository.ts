import { ErrorApp } from "domain/ErrorApp/ErrorApp";
import { Post } from "domain/Post/Post";
import { HTTP } from "infrastructure/http/http";
import { WP_API_ANLALYSIS, WP_API_CATEGORY, WP_API_POST } from "infrastructure/wordpress/config";

export interface ANALYSIS_QUERY {
  post_status?: 'private' | 'publish',
  posts_per_page?: number,
  offset?: number,
  /**
   * @description Buscador por string
   */
  search?: string,
  /**
   * @description Slug de la categoría
   */
  category_name?: string
}

export class AnalysisRepository {
  private static instance: AnalysisRepository;
  private constructor() { };

  public static getInstance(): AnalysisRepository {
    if (!AnalysisRepository.instance) {
      AnalysisRepository.instance = new AnalysisRepository();
    }
    return AnalysisRepository.instance;
  }

  setCategory = async (wpToken: string, category_args: { name: string, description?: string }, id?: number): Promise<any> => {
    const analysis_cat = await HTTP.get(`${WP_API_ANLALYSIS}category?only_analysis=1`);
    if (!analysis_cat[0].term_id) return alert('No existe la categoria de analysis en la API de wp')
    const arg = {
      ...category_args,
      parent: analysis_cat[0].term_id
    }
    const url = id ? WP_API_CATEGORY + `/${id}` : WP_API_CATEGORY
    const res = await HTTP.post(url, arg, HTTP.getHeaders(wpToken))

    return res.errCode ? new ErrorApp({ errorCode: 'api_wp@' + res.errCode, errorMessage: res.errCode }) : null;
  }

  deleteCategory = async (wpToken: string, id: number): Promise<any> => {
    const res = await HTTP.delete(`${WP_API_CATEGORY}/${id}?force=true`,HTTP.getHeaders(wpToken));
    return res.errCode ? new ErrorApp({ errorCode: 'api_wp@' + res.errCode, errorMessage: res.errCode }) : null;
  }

  getCategories = async ({ only_analysis }: { only_analysis: -1 | 0 | 1 } = { only_analysis: -1 }) => {
    const res = await HTTP.get(`${WP_API_ANLALYSIS}category?only_analysis=${only_analysis}`)
    if (Array.isArray(res)) {
      return res.map(term => {
        return {
          value: term.term_id,
          label: term.name,
          term: term
        }
      })
    } else {
      return {
        value: res.term_id,
        label: res.name,
        term: res
      }
    }
  }


  createArticle = async (categories: number[], wpToken: string, article_args: { title: string, excerpt?: string, created_by: any }): Promise<string | Post> => {
    const a_category = (await this.getCategories({ only_analysis: 1 })) as { label: string, value: any }[]

    const arg = {
      ...article_args,
      status: 'private',
      content: '<p>Contenido del artículo aquí....</p>',
      categories: [...categories, a_category[0].value]
    }
    const res = await HTTP.post(WP_API_POST, arg, { Authorization: `Bearer ${wpToken}` })
    if (res.data.id) {
      return new Post({ ...res.data, wpID: res.data.id });
    } else {
      return res.errCode || 'errors.internal';
    }
  }

  async getArticles(userDataToken?: string, wpToken?: string, query?: ANALYSIS_QUERY) {
    let params: string = userDataToken ? `user-data=${userDataToken}&` : ''
    type query_type = 'post_status' | 'posts_per_page' | 'offset' | 'search' | 'category_name';
    if (query) {
      Object.keys(query).forEach((key) => {
        if (query[key as query_type]) {
          params += `${key}=${query[key as query_type]}&`;
        }
      })
    }
    if (query?.post_status === 'private' && !wpToken) {
      return alert('Bad reques wpToken is needed to private post')
    }
    const res = await HTTP.get(`${WP_API_ANLALYSIS}articles?${params}`, HTTP.getHeaders(wpToken))
    if (res.success) {
      const posts = res.hits.map((item: any) => new Post(item));
      return posts
    } else {
      return [];
    }
  }
}

export const AnalysisRepositoryInstance = AnalysisRepository.getInstance();